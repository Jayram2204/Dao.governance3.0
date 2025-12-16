import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const ParticleField = (props) => {
  const ref = useRef();
  // Generate 8000 particles in a sphere - cosmic dust for galaxy effect
  const sphere = random.inSphere(new Float32Array(8000 * 3), { radius: 2.0 });
   
  useFrame((state, delta) => {
    // Slow, hypnotic rotation like cosmic drift
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
    
    // Add subtle pulsing like distant stars
    const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 0.9;
    ref.current.scale.setScalar(pulse);
  });
   
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

// Nebula-like particle field
const NebulaField = (props) => {
  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(3000 * 3), { radius: 1.2 });
   
  useFrame((state, delta) => {
    ref.current.rotation.x += delta / 25;
    ref.current.rotation.y += delta / 30;
  });
   
  return (
    <group rotation={[Math.PI / 3, 0, 0]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#4a3f7f"
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
};

const Background3D = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: '#0a0a14' }}>
      <Canvas camera={{ position: [0, 0, 1.5] }}>
        <color attach="background" args={['#0a0a14']} />
        <fog attach="fog" args={['#0a0a14', 2, 4.5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} color="#6b5b95" />
        <pointLight position={[2, 2, 3]} intensity={1} color="#8b7ebd" />
        <pointLight position={[-2, -2, 1]} intensity={0.4} color="#4a3f7f" />

        {/* Particles */}
        <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
          <ParticleField />
        </Float>

        {/* Nebula effect */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <NebulaField />
        </Float>

        {/* Stars */}
        <Stars radius={100} depth={50} count={10000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export default Background3D;
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Comet Component
const Comet = ({ position, radius, speed, delay = 0 }) => {
  const cometRef = useRef();
  const trailRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime * speed + delay;
    
    // Anticlockwise circular motion
    const x = Math.cos(-time) * radius;
    const z = Math.sin(-time) * radius;
    const y = Math.sin(time * 0.5) * 0.1; // Slight vertical oscillation
    
    if (cometRef.current) {
      cometRef.current.position.set(x, y, z);
    }
  });

  return (
    <Trail
      width={0.5}
      length={8}
      color="#ffffff"
      attenuation={(t) => t * t}
    >
      <mesh ref={cometRef}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Trail>
  );
};

// Ring of Comets
const CometRing = ({ radius, cometCount = 8, speed = 0.5 }) => {
  const comets = useMemo(() => {
    const temp = [];
    for (let i = 0; i < cometCount; i++) {
      temp.push({
        id: i,
        delay: (i / cometCount) * Math.PI * 2, // Evenly spaced around ring
      });
    }
    return temp;
  }, [cometCount]);

  return (
    <group>
      {comets.map((comet) => (
        <Comet
          key={comet.id}
          radius={radius}
          speed={speed}
          delay={comet.delay}
        />
      ))}
    </group>
  );
};

// Half Saturn Planet
const HalfSaturnPlanet = () => {
  const planetRef = useRef();
  
  // Create Saturn texture
  const saturnTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Saturn's golden bands
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, '#f4e4bc');
    gradient.addColorStop(0.3, '#e6d3a7');
    gradient.addColorStop(0.6, '#d4b896');
    gradient.addColorStop(1, '#c9a876');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);
    
    // Add atmospheric bands
    for (let i = 0; i < 15; i++) {
      const y = (i / 15) * 256;
      const opacity = 0.1 + Math.random() * 0.15;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fillRect(0, y, 512, 4 + Math.random() * 2);
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (planetRef.current) {
      // Very slow rotation
      planetRef.current.rotation.y += 0.003;
      // Gentle floating
      planetRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <mesh ref={planetRef} position={[0, 0, 0]}>
      {/* Use hemisphere geometry to show only half */}
      <sphereGeometry args={[1.2, 32, 16, 0, Math.PI]} />
      <meshStandardMaterial 
        map={saturnTexture}
        roughness={0.7}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Main Half Saturn Component
const HalfSaturn = () => {
  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group rotation={[0, 0, 0]}>
        {/* Half Saturn Planet */}
        <HalfSaturnPlanet />
        
        {/* Multiple Comet Rings */}
        <CometRing radius={2.0} cometCount={6} speed={0.3} />
        <CometRing radius={2.5} cometCount={8} speed={0.25} />
        <CometRing radius={3.0} cometCount={10} speed={0.2} />
        <CometRing radius={3.5} cometCount={4} speed={0.15} />
        
        {/* Ambient lighting for the planet */}
        <pointLight 
          position={[2, 2, 2]} 
          intensity={0.5} 
          color="#ffffff" 
          distance={10}
        />
      </group>
    </Float>
  );
};

export default HalfSaturn;
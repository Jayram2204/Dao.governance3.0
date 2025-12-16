import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Float, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Saturn Planet Component
const SaturnPlanet = () => {
  const planetRef = useRef();
  
  // Create Saturn's surface texture with procedural generation
  const saturnTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Create Saturn's banded appearance
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, '#f4e4bc');
    gradient.addColorStop(0.2, '#e6d3a7');
    gradient.addColorStop(0.4, '#d4b896');
    gradient.addColorStop(0.6, '#c9a876');
    gradient.addColorStop(0.8, '#b8956b');
    gradient.addColorStop(1, '#a68660');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);
    
    // Add atmospheric bands
    for (let i = 0; i < 20; i++) {
      const y = (i / 20) * 256;
      const opacity = 0.1 + Math.random() * 0.2;
      ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`;
      ctx.fillRect(0, y, 512, 8 + Math.random() * 4);
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (planetRef.current) {
      // Slow rotation
      planetRef.current.rotation.y += 0.002;
      // Subtle floating
      planetRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[1.2, 64, 32]} />
      <meshStandardMaterial 
        map={saturnTexture}
        roughness={0.8}
        metalness={0.1}
        emissive="#8b5cf6"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
};

// Saturn Rings Component
const SaturnRings = () => {
  const ringsRef = useRef();
  
  // Create ring texture
  const ringTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // Create ring pattern
    const gradient = ctx.createLinearGradient(0, 0, 512, 0);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0)');
    gradient.addColorStop(0.1, 'rgba(139, 92, 246, 0.8)');
    gradient.addColorStop(0.3, 'rgba(167, 139, 250, 0.6)');
    gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.9)');
    gradient.addColorStop(0.7, 'rgba(167, 139, 250, 0.4)');
    gradient.addColorStop(0.9, 'rgba(139, 92, 246, 0.7)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 32);
    
    // Add ring gaps and details
    for (let i = 0; i < 10; i++) {
      const x = (i / 10) * 512;
      const width = 2 + Math.random() * 4;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(x, 0, width, 32);
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (ringsRef.current) {
      // Rings rotate slightly slower than planet
      ringsRef.current.rotation.z += 0.001;
      // Subtle tilt animation
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 - 0.2;
    }
  });

  return (
    <group ref={ringsRef} rotation={[-0.2, 0, 0]}>
      {/* Multiple ring layers for depth */}
      <mesh>
        <ringGeometry args={[1.8, 3.2, 64]} />
        <meshBasicMaterial 
          map={ringTexture}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <ringGeometry args={[2.0, 2.8, 64]} />
        <meshBasicMaterial 
          color="#a78bfa"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <ringGeometry args={[3.3, 3.8, 64]} />
        <meshBasicMaterial 
          color="#8b5cf6"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Orbital Debris/Moons
const OrbitalDebris = () => {
  const debrisRef = useRef();
  
  const debris = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const radius = 4 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 0.5;
      
      temp.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ],
        scale: 0.02 + Math.random() * 0.03,
        speed: 0.5 + Math.random() * 0.5
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (debrisRef.current) {
      debrisRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={debrisRef}>
      {debris.map((item, i) => (
        <mesh key={i} position={item.position} scale={item.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial 
            color="#8b5cf6" 
            transparent 
            opacity={0.6}
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main Saturn Scene Component
const Saturn = () => {
  return (
    <group>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        {/* Saturn Planet */}
        <SaturnPlanet />
        
        {/* Saturn Rings */}
        <SaturnRings />
        
        {/* Orbital Debris */}
        <OrbitalDebris />
        
        {/* Atmospheric Sparkles */}
        <Sparkles 
          count={100}
          scale={8}
          size={2}
          speed={0.3}
          opacity={0.4}
          color="#8b5cf6"
        />
      </Float>
      
      {/* Environment for realistic lighting */}
      <Environment preset="night" />
      
      {/* Additional atmospheric lighting */}
      <pointLight 
        position={[5, 5, 5]} 
        intensity={1} 
        color="#8b5cf6" 
        distance={20}
        decay={2}
      />
      <pointLight 
        position={[-5, -5, -5]} 
        intensity={0.5} 
        color="#a78bfa" 
        distance={15}
        decay={2}
      />
    </group>
  );
};

export default Saturn;
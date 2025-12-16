import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Sphere, Box, Octahedron } from '@react-three/drei';
import * as THREE from 'three';
import './Hero3D.css';

// Floating Geometric Crystal
function FloatingCrystal() {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Rotation animation
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.z = time * 0.1;
    
    // Floating animation
    meshRef.current.position.y = Math.sin(time * 0.8) * 0.3;
    
    // Material animation
    if (materialRef.current) {
      materialRef.current.distort = 0.3 + Math.sin(time * 2) * 0.1;
      materialRef.current.speed = 1 + Math.sin(time) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Octahedron ref={meshRef} args={[1.2, 0]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#8B5CF6"
          transparent
          opacity={0.8}
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Octahedron>
    </Float>
  );
}

// Orbiting Particles
function OrbitingParticles() {
  const groupRef = useRef();
  const particleCount = 20;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.5 + Math.random() * 1;
      const height = (Math.random() - 0.5) * 2;
      
      temp.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ],
        scale: 0.05 + Math.random() * 0.1,
        color: i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#10B981" : "#8B5CF6"
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <Sphere key={i} args={[particle.scale, 8, 8]} position={particle.position}>
          <meshBasicMaterial color={particle.color} transparent opacity={0.8} />
        </Sphere>
      ))}
    </group>
  );
}

// Data Streams
function DataStreams() {
  const linesRef = useRef();
  
  const lineGeometry = useMemo(() => {
    const points = [];
    const streamCount = 8;
    
    for (let i = 0; i < streamCount; i++) {
      const angle = (i / streamCount) * Math.PI * 2;
      const radius = 3;
      
      // Create flowing lines from center outward
      for (let j = 0; j < 20; j++) {
        const t = j / 19;
        const currentRadius = radius * t;
        points.push(new THREE.Vector3(
          Math.cos(angle) * currentRadius,
          Math.sin(t * Math.PI * 2) * 0.5,
          Math.sin(angle) * currentRadius
        ));
      }
    }
    
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <line ref={linesRef} geometry={lineGeometry}>
      <lineBasicMaterial color="#06B6D4" transparent opacity={0.3} />
    </line>
  );
}

// Voting Ballot 3D
function VotingBallot() {
  const ballotRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    ballotRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    ballotRef.current.position.x = 3 + Math.sin(time * 0.3) * 0.5;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={ballotRef} position={[3, 0, -1]}>
        <Box args={[0.8, 1.2, 0.1]}>
          <meshStandardMaterial color="#1e293b" />
        </Box>
        <Box args={[0.6, 0.15, 0.11]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color="#10B981" />
        </Box>
        <Box args={[0.6, 0.15, 0.11]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#EF4444" />
        </Box>
      </group>
    </Float>
  );
}

// Treasury Coin Stack
function TreasuryCoins() {
  const coinsRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    coinsRef.current.rotation.y = time * 0.4;
    coinsRef.current.position.x = -3 + Math.cos(time * 0.4) * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <group ref={coinsRef} position={[-3, 0, -1]}>
        {[0, 0.15, 0.3, 0.45].map((y, i) => (
          <Sphere key={i} args={[0.3, 16, 16]} position={[0, y, 0]}>
            <meshStandardMaterial 
              color="#F59E0B" 
              metalness={0.8} 
              roughness={0.2}
            />
          </Sphere>
        ))}
      </group>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="hero-3d-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3B82F6" />
        <spotLight 
          position={[0, 10, 0]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.5}
          color="#10B981"
        />

        {/* 3D Elements */}
        <FloatingCrystal />
        <OrbitingParticles />
        <DataStreams />
        <VotingBallot />
        <TreasuryCoins />

        {/* 3D Text */}
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
          <Text
            position={[0, -2.5, 0]}
            fontSize={0.5}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            font="/fonts/space-grotesk-bold.woff"
          >
            DECENTRALIZED GOVERNANCE
          </Text>
        </Float>
      </Canvas>
    </div>
  );
}
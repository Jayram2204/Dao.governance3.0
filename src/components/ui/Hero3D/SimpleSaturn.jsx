import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Simplified Saturn Component
const SimpleSaturn = () => {
  const planetRef = useRef();
  const ringsRef = useRef();

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.005;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.002;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Saturn Planet */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial 
            color="#f4e4bc"
            roughness={0.8}
            metalness={0.1}
            emissive="#8b5cf6"
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Saturn Rings */}
        <group ref={ringsRef} rotation={[-0.3, 0, 0]}>
          <mesh>
            <ringGeometry args={[2.2, 3.5, 64]} />
            <meshBasicMaterial 
              color="#8b5cf6"
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[2.0, 2.1, 64]} />
            <meshBasicMaterial 
              color="#a78bfa"
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

export default SimpleSaturn;
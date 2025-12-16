import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import './Treasury3D.css';

// 3D Torus Segment for each asset
function TorusSegment({ 
  startAngle, 
  endAngle, 
  color, 
  asset, 
  isHovered, 
  onHover, 
  onUnhover,
  radius = 2,
  tube = 0.6 
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  const geometry = useMemo(() => {
    const geometry = new THREE.TorusGeometry(radius, tube, 16, 100, endAngle - startAngle);
    geometry.rotateZ(startAngle);
    return geometry;
  }, [startAngle, endAngle, radius, tube]);

  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = hovered || isHovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      if (hovered || isHovered) {
        meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 3) * 0.1;
      } else {
        meshRef.current.position.z = 0;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(asset);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHovered(false);
        onUnhover();
      }}
    >
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.3}
        transparent
        opacity={hovered || isHovered ? 0.9 : 0.8}
      />
    </mesh>
  );
}

// 3D Sphere Cluster Alternative
function SphereCluster({ assets, hoveredAsset, onHover, onUnhover }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const spheres = useMemo(() => {
    const total = assets.reduce((sum, asset) => sum + asset.value, 0);
    let currentAngle = 0;
    
    return assets.map((asset, index) => {
      const percentage = asset.value / total;
      const radius = 0.3 + percentage * 1.5; // Size based on value
      const angle = currentAngle + (percentage * Math.PI * 2);
      const distance = 2.5;
      
      const position = [
        Math.cos(angle) * distance,
        Math.sin(angle) * distance * 0.5,
        Math.sin(angle) * distance
      ];
      
      currentAngle += percentage * Math.PI * 2;
      
      return {
        ...asset,
        position,
        radius,
        angle,
        percentage
      };
    });
  }, [assets]);

  return (
    <group ref={groupRef}>
      {spheres.map((sphere, index) => (
        <Float key={index} speed={1 + index * 0.2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh
            position={sphere.position}
            onPointerEnter={(e) => {
              e.stopPropagation();
              onHover(sphere);
            }}
            onPointerLeave={(e) => {
              e.stopPropagation();
              onUnhover();
            }}
          >
            <sphereGeometry args={[sphere.radius, 32, 32]} />
            <meshStandardMaterial
              color={sphere.color}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={hoveredAsset?.name === sphere.name ? 1 : 0.8}
            />
            
            {/* Asset Label */}
            <Html position={[0, sphere.radius + 0.5, 0]} center>
              <div className="asset-label">
                <div className="asset-name">{sphere.symbol}</div>
                <div className="asset-percentage">{(sphere.percentage * 100).toFixed(1)}%</div>
              </div>
            </Html>
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Main 3D Torus Chart
function TorusChart({ assets, hoveredAsset, onHover, onUnhover }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  const segments = useMemo(() => {
    const total = assets.reduce((sum, asset) => sum + asset.value, 0);
    let currentAngle = 0;
    
    return assets.map((asset) => {
      const percentage = asset.value / total;
      const segmentAngle = percentage * Math.PI * 2;
      const segment = {
        ...asset,
        startAngle: currentAngle,
        endAngle: currentAngle + segmentAngle,
        percentage
      };
      currentAngle += segmentAngle;
      return segment;
    });
  }, [assets]);

  return (
    <group ref={groupRef}>
      {segments.map((segment, index) => (
        <TorusSegment
          key={index}
          startAngle={segment.startAngle}
          endAngle={segment.endAngle}
          color={segment.color}
          asset={segment}
          isHovered={hoveredAsset?.name === segment.name}
          onHover={onHover}
          onUnhover={onUnhover}
        />
      ))}
      
      {/* Center Text */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.3}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        font="/fonts/space-grotesk-bold.woff"
      >
        TREASURY
      </Text>
      
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.15}
        color="#8D96A0"
        anchorX="center"
        anchorY="middle"
      >
        Asset Allocation
      </Text>
    </group>
  );
}

// Floating Asset Info Panel
function AssetInfoPanel({ asset }) {
  if (!asset) return null;

  return (
    <Html position={[3, 1, 0]} center>
      <div className="asset-info-panel">
        <div className="asset-info-header">
          <div 
            className="asset-color-indicator" 
            style={{ backgroundColor: asset.color }}
          ></div>
          <h4>{asset.name}</h4>
        </div>
        <div className="asset-info-details">
          <div className="asset-info-row">
            <span>Value:</span>
            <span>${asset.value.toLocaleString()}</span>
          </div>
          <div className="asset-info-row">
            <span>Symbol:</span>
            <span>{asset.symbol}</span>
          </div>
          <div className="asset-info-row">
            <span>Percentage:</span>
            <span>{asset.percentage ? (asset.percentage * 100).toFixed(1) : '0'}%</span>
          </div>
        </div>
      </div>
    </Html>
  );
}

export default function Treasury3D({ assets, variant = 'torus' }) {
  const [hoveredAsset, setHoveredAsset] = useState(null);

  const handleHover = (asset) => {
    setHoveredAsset(asset);
  };

  const handleUnhover = () => {
    setHoveredAsset(null);
  };

  return (
    <div className="treasury-3d-container">
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

        {/* 3D Visualization */}
        {variant === 'torus' ? (
          <TorusChart
            assets={assets}
            hoveredAsset={hoveredAsset}
            onHover={handleHover}
            onUnhover={handleUnhover}
          />
        ) : (
          <SphereCluster
            assets={assets}
            hoveredAsset={hoveredAsset}
            onHover={handleHover}
            onUnhover={handleUnhover}
          />
        )}

        {/* Asset Info Panel */}
        <AssetInfoPanel asset={hoveredAsset} />
      </Canvas>

      {/* Legend */}
      <div className="treasury-legend">
        {assets.map((asset, index) => (
          <div 
            key={index} 
            className={`legend-item ${hoveredAsset?.name === asset.name ? 'active' : ''}`}
            onMouseEnter={() => handleHover(asset)}
            onMouseLeave={handleUnhover}
          >
            <div 
              className="legend-color" 
              style={{ backgroundColor: asset.color }}
            ></div>
            <span className="legend-name">{asset.symbol}</span>
            <span className="legend-value">${asset.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
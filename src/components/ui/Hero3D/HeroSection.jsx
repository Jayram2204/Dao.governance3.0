import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, MeshTransmissionMaterial, Float, Environment, Stars, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import './HeroSection.css';

// --- 3. MAIN HERO LAYOUT ---
const HeroSection = () => {
  return (
    <section className="hero-wrapper">
      <div className="hero-container">
        
        {/* LEFT ZONE: Content */}
        <div className="hero-content-left">
          <div className="status-badge">
            <span className="pulse-dot"></span> 
            <span>Live on Mainnet</span>
          </div>
          
          <h1 className="hero-title">
            Governance <br />
            <span className="text-gradient">Redefined.</span>
          </h1>
          
          <p className="hero-subtitle">
            The control center for decentralized decision making. 
            Delegate votes and manage the treasury directly from the dashboard.
          </p>

          <div className="user-stats-card glass-panel">
            <div className="stat-row">
              <div className="stat-item">
                <span className="label">Your Voting Power</span>
                <span className="value">Connect wallet to view</span>
              </div>
              <div className="stat-item right">
                <span className="label">Status</span>
                <span className="value">Connect wallet to view</span>
              </div>
            </div>
            <div className="action-row">
              <button className="btn-primary">Connect Wallet</button>
              <button className="btn-secondary">View Dashboard</button>
            </div>
          </div>
        </div>

        {/* RIGHT ZONE: The 3D Saturn Canvas */}
        <div className="hero-visual-right">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 1.5, 7], fov: 50 }}>
            {/* Enhanced Cinematic Lighting */}
            <directionalLight position={[15, 12, 8]} intensity={3.5} color="#ffffff" />
            <directionalLight position={[-12, 8, -10]} intensity={1.5} color="#a78bfa" />
            <spotLight position={[10, -10, 5]} intensity={2} color="#7c3aed" angle={0.5} penumbra={1} />
            <ambientLight intensity={0.5} color="#6b4fa8" />

            {/* Rich Starfield */}
            <Stars radius={80} depth={60} count={2000} factor={5} saturation={0} fade speed={0.8} />
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate 
              autoRotateSpeed={0.3}
              minPolarAngle={Math.PI * 0.35}
              maxPolarAngle={Math.PI * 0.65}
            />
          </Canvas>
        </div>
      </div>

      {/* BOTTOM STRIP: HUD */}
      <div className="hero-stats-strip glass-panel">
        <div className="hud-content">
          <div className="hud-item">
            <span className="hud-label">Treasury Balance</span>
            <span className="hud-value">Connect wallet to view</span>
          </div>
          <div className="hud-divider"></div>
          <div className="hud-item">
            <span className="hud-label">Active Proposals</span>
            <span className="hud-value">Connect wallet to view</span>
          </div>
          <div className="hud-divider"></div>
          <div className="hud-item">
            <span className="hud-label">Total Members</span>
            <span className="hud-value">Connect wallet to view</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import Background3D from '../../Background3D'; // Import the new background
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      {/* The 3D Void sits here, behind everything */}
      <Background3D />
        
      <Navbar />
      <div className="main-content">
        <main className="page-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export { Layout };

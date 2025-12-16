import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/layout/Navbar/Navbar';
import { Footer } from './components/layout/Footer/Footer';
import { NotificationSystem } from './components/ui/NotificationSystem/NotificationSystem';
import Background3D from './components/Background3D';
import { Home } from './pages/Home';
import { Voting } from './pages/Voting';
// import { AdvancedVoting } from './pages/AdvancedVoting';
import { Treasury } from './pages/Treasury';
import { Identity } from './pages/Identity';
import { Analytics } from './pages/Analytics';
import { Leaderboard } from './pages/Leaderboard';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Background3D />
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/voting" element={<Voting />} />
              <Route path="/advanced-voting" element={
                <div style={{color: 'white', padding: '2rem', textAlign: 'center'}}>
                  <h2 style={{marginBottom: '1rem'}}>🚀 Advanced Voting Features</h2>
                  <div style={{
                    background: 'rgba(139, 92, 246, 0.1)', 
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '12px',
                    padding: '2rem',
                    marginBottom: '2rem'
                  }}>
                    <h3 style={{color: '#8b5cf6', marginBottom: '1rem'}}>Coming Soon</h3>
                    <p style={{marginBottom: '1.5rem', color: '#a8a8b3'}}>
                      Advanced voting mechanisms including quadratic voting, conviction voting, and delegation strategies.
                    </p>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem'}}>
                      <div style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px'}}>
                        <h4>🔢 Quadratic Voting</h4>
                        <p style={{fontSize: '0.9rem', color: '#a8a8b3'}}>Vote with increasing cost per additional vote</p>
                      </div>
                      <div style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px'}}>
                        <h4>⏰ Conviction Voting</h4>
                        <p style={{fontSize: '0.9rem', color: '#a8a8b3'}}>Votes gain strength over time</p>
                      </div>
                      <div style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px'}}>
                        <h4>🔗 Delegation Chains</h4>
                        <p style={{fontSize: '0.9rem', color: '#a8a8b3'}}>Advanced delegation strategies</p>
                      </div>
                    </div>
                  </div>
                  <p style={{color: '#6b6b7b', fontSize: '0.9rem'}}>
                    These features are being developed to enhance DAO governance capabilities.
                  </p>
                </div>
              } />
              <Route path="/treasury" element={<Treasury />} />
              <Route path="/identity" element={<Identity />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
          <Footer />
          <NotificationSystem />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;


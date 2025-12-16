import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Simple test component
function TestHome() {
  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1>🎉 DAO Application is Working!</h1>
      <p>If you see this, the routing is fixed.</p>
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#1a1a24', borderRadius: '8px' }}>
        <h2>Test Navigation:</h2>
        <ul>
          <li><a href="/voting" style={{ color: '#8b5cf6' }}>Go to Voting</a></li>
          <li><a href="/treasury" style={{ color: '#8b5cf6' }}>Go to Treasury</a></li>
          <li><a href="/identity" style={{ color: '#8b5cf6' }}>Go to Identity</a></li>
        </ul>
      </div>
    </div>
  );
}

function TestPage({ title }) {
  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1>{title}</h1>
      <p>This page is working!</p>
      <a href="/" style={{ color: '#8b5cf6' }}>← Back to Home</a>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
        <Routes>
          <Route path="/" element={<TestHome />} />
          <Route path="/voting" element={<TestPage title="Voting Page" />} />
          <Route path="/treasury" element={<TestPage title="Treasury Page" />} />
          <Route path="/identity" element={<TestPage title="Identity Page" />} />
          <Route path="/analytics" element={<TestPage title="Analytics Page" />} />
          <Route path="/leaderboard" element={<TestPage title="Leaderboard Page" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

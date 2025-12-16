import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout/Layout';
import { Home } from './pages/Home';
import { Voting } from './pages/Voting';
import { Treasury } from './pages/Treasury';
import { Identity } from './pages/Identity';
import { Analytics } from './pages/Analytics';
import { Leaderboard } from './pages/Leaderboard';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/treasury" element={<Treasury />} />
          <Route path="/identity" element={<Identity />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

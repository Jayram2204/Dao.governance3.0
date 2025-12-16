// Temporary test file to check if React is working
import './App.css';

function AppTest() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0a0f', 
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#8b5cf6' }}>
        DAO 2.0 Dashboard
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#a8a8b3' }}>
        React is working! ✅
      </p>
      <div style={{ 
        padding: '1rem 2rem', 
        background: '#8b5cf6', 
        borderRadius: '12px',
        cursor: 'pointer'
      }}>
        Test Button
      </div>
    </div>
  );
}

export default AppTest;

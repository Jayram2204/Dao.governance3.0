import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          color: 'white', 
          background: '#0a0a0f',
          minHeight: '100vh'
        }}>
          <h1>🚨 Something went wrong</h1>
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            background: '#1a1a24', 
            borderRadius: '8px',
            fontFamily: 'monospace'
          }}>
            <p><strong>Error:</strong> {this.state.error?.message}</p>
            <p><strong>Stack:</strong></p>
            <pre style={{ fontSize: '0.8rem', overflow: 'auto' }}>
              {this.state.error?.stack}
            </pre>
          </div>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

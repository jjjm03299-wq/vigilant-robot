import React, { useState } from 'react';
import './App.css';

function App() {
  const [pin, setPin] = useState('----');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePin = async () => {
    setLoading(true);
    setError(null);
    try {
      // Relative path: targets the active domain hosting the app
      const response = await fetch('/api/generate');
      if (!response.ok) throw new Error('API unavailable');
      const data = await response.json();
      setPin(data.pin);
    } catch (err) {
      // Fallback for static environments like GitHub Pages
      const fallbackPin = Math.floor(1000 + Math.random() * 9000).toString();
      setPin(fallbackPin);
      setError('Running in static mode (Generated locally)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h2>4-Digit PIN Generator</h2>
      <div style={{ fontSize: '48px', margin: '20px', letterSpacing: '8px', fontWeight: 'bold' }}>
        {pin}
      </div>
      <button 
        onClick={generatePin} 
        disabled={loading}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        {loading ? 'Generating...' : 'Generate PIN'}
      </button>
      {error && <p style={{ color: 'orange', fontSize: '13px', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}

export default App;

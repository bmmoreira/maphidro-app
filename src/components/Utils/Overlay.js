import React from 'react';

export default function Overlay(props) {
  return (
    <div className="overlay">
      <div className="spinner"></div>
      {/* Optionally, you can add a loading message */}
      <p
        style={{
          marginLeft: '80px',
          marginBottom: '40px',
          fontWeight: '600',
          fontSize: '1.5rem',
          color: '#0f9bd9'
        }}>
        Loading MapHidro...
      </p>
    </div>
  );
}

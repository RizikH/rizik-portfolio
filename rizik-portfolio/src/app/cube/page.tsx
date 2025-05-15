'use client';

import React from 'react'
import MyScene from '@/components/cube/scene'

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <MyScene />
      <main>
        <h1 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
          Hello, this is a 3D Cube!
        </h1>
        <p style={{ color: 'white', textAlign: 'center' }}>
          This is a simple example of a 3D cube rendered using Three.js and React.
        </p>
      </main>
    </div>
  )
}

export default App

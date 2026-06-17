import { useState, useEffect } from 'react'
import GameScreen from './components/GameScreen'

function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <GameScreen />
    </div>
  )
}

export default App

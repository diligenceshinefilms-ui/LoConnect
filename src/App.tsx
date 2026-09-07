import React from 'react'
import TodoApp from './components/TodoApp'
import './index.css'

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>LoConnect</h1>
        <p>Welcome to LoConnect — an app connecting local communities.</p>
      </header>
      <main>
        <section>
          <p>Initial commit: Vite + React + TypeScript skeleton.</p>
        </section>

        <section style={{marginTop: 24}}>
          <h2>To‑Do</h2>
          <TodoApp />
        </section>
      </main>
    </div>
  )
}

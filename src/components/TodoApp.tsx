import React, { useEffect, useState, useRef } from 'react'
import '../index.css'
import './TodoApp.css'

type Todo = {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

const STORAGE_KEY = 'loconnect_todos_v1'

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setTodos(JSON.parse(raw))
    } catch (err) {
      console.error('Failed to load todos from localStorage', err)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch (err) {
      console.error('Failed to save todos to localStorage', err)
    }
  }, [todos])

  function addTodo() {
    const text = input.trim()
    if (!text) return
    const todo: Todo = { id: String(Date.now()) + Math.random().toString(36).slice(2), text, completed: false, createdAt: Date.now() }
    setTodos((s) => [todo, ...s])
    setInput('')
    inputRef.current?.focus()
  }

  function toggle(id: string) {
    setTodos((s) => s.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function remove(id: string) {
    setTodos((s) => s.filter(t => t.id !== id))
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') addTodo()
  }

  return (
    <div className="todo-app">
      <div className="todo-controls">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a to‑do and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          aria-label="New to-do"
        />
        <button className="icon-btn" onClick={addTodo} aria-label="Add to-do">Add</button>
      </div>

      <ul className="todo-list">
        {todos.length === 0 && <li className="small">No to-dos yet — add one above.</li>}
        {todos.map((t) => (
          <li key={t.id} className={`todo-item ${t.completed ? 'completed' : ''}`}>
            <input type="checkbox" checked={t.completed} onChange={() => toggle(t.id)} />
            <div className="text">{t.text}</div>
            <div className="small">{new Date(t.createdAt).toLocaleString()}</div>
            <button className="icon-btn" onClick={() => remove(t.id)} aria-label={`Delete ${t.text}`}>🗑️</button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <div style={{marginTop: 12}} className="small">
          {todos.filter(t => !t.completed).length} left — {todos.length} total
        </div>
      )}
    </div>
  )
}

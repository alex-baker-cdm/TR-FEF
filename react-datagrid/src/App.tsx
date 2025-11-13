import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>React DataGrid</h1>
        <p>Modern React-based data grid to replace jQuery DataTables</p>
      </header>
      
      <main className="app-main">
        <section className="info-section">
          <h2>Project Setup Complete</h2>
          <p>
            This project has been initialized with React, TypeScript, and Vite.
            TanStack Table v8 has been configured as the recommended table library.
          </p>
          
          <div className="counter-demo">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>Click the button to test React state management</p>
          </div>
        </section>

        <section className="features-section">
          <h2>Configured Features</h2>
          <ul>
            <li>✓ React 18 with TypeScript</li>
            <li>✓ Vite build tooling</li>
            <li>✓ TypeScript strict mode enabled</li>
            <li>✓ ESLint with TypeScript rules</li>
            <li>✓ Prettier code formatting</li>
            <li>✓ TanStack Table v8</li>
            <li>✓ TanStack Query for data fetching</li>
            <li>✓ TanStack Virtual for performance</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App

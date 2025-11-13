import { useState } from 'react'
import './App.css'
import { DataGrid, ColumnDefinition } from './components/DataGrid'

interface Task {
  id: number
  name: string
  status: string
  priority: string
  assignee: string
}

const initialData: Task[] = [
  {
    id: 1,
    name: 'Implement authentication',
    status: 'In Progress',
    priority: 'High',
    assignee: 'John Doe',
  },
  {
    id: 2,
    name: 'Design landing page',
    status: 'Completed',
    priority: 'Medium',
    assignee: 'Jane Smith',
  },
  {
    id: 3,
    name: 'Write API documentation',
    status: 'Not Started',
    priority: 'Low',
    assignee: 'Bob Johnson',
  },
  {
    id: 4,
    name: 'Fix bug in payment flow',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Alice Williams',
  },
  {
    id: 5,
    name: 'Optimize database queries',
    status: 'Not Started',
    priority: 'Medium',
    assignee: 'Charlie Brown',
  },
]

function App() {
  const [data, setData] = useState<Task[]>(initialData)
  const [eventLog, setEventLog] = useState<string[]>([])
  const [isEditable, setIsEditable] = useState(false)

  const columns: ColumnDefinition<Task>[] = [
    {
      id: 'id',
      header: 'ID',
      field: 'id',
      width: '80px',
      sortable: true,
    },
    {
      id: 'name',
      header: 'Task Name',
      field: 'name',
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      field: 'status',
      sortable: true,
      render: (value) => {
        const statusColors: Record<string, string> = {
          'In Progress': '#4a90e2',
          Completed: '#5cb85c',
          'Not Started': '#999',
        }
        return (
          <span
            style={{
              color: statusColors[value as string] || '#333',
              fontWeight: 500,
            }}
          >
            {value}
          </span>
        )
      },
    },
    {
      id: 'priority',
      header: 'Priority',
      field: 'priority',
      width: '120px',
      sortable: true,
    },
    {
      id: 'assignee',
      header: 'Assignee',
      field: 'assignee',
      sortable: true,
    },
  ]

  const addEvent = (event: string) => {
    setEventLog((prev) => [`${new Date().toLocaleTimeString()}: ${event}`, ...prev.slice(0, 9)])
  }

  const handleRowClick = (row: Task, index: number) => {
    addEvent(`Row clicked: ${row.name} (index: ${index})`)
  }

  const handleRowDoubleClick = (row: Task, index: number) => {
    addEvent(`Row double-clicked: ${row.name} (index: ${index})`)
  }

  const handleHeaderClick = (column: ColumnDefinition<Task>) => {
    addEvent(`Header clicked: ${column.header}`)
  }

  const handleDataChange = (newData: Task[]) => {
    setData(newData)
    addEvent('Data updated via inline editing')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>React DataGrid Component</h1>
        <p>AD-20: Core DataGrid React component with TypeScript interfaces</p>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <div className="demo-header">
            <h2>DataGrid Demo</h2>
            <label className="editable-toggle">
              <input
                type="checkbox"
                checked={isEditable}
                onChange={(e) => setIsEditable(e.target.checked)}
              />
              Enable Inline Editing
            </label>
          </div>

          <DataGrid
            data={data}
            columns={columns}
            isRowEditable={isEditable}
            onRowClick={handleRowClick}
            onRowDoubleClick={handleRowDoubleClick}
            onHeaderClick={handleHeaderClick}
            onDataChange={handleDataChange}
          />
        </section>

        <section className="event-log-section">
          <h2>Event Log</h2>
          <div className="event-log">
            {eventLog.length === 0 ? (
              <p className="no-events">No events yet. Interact with the table above.</p>
            ) : (
              <ul>
                {eventLog.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="features-section">
          <h2>Implemented Features</h2>
          <ul>
            <li>✓ TypeScript interfaces for all props and data structures</li>
            <li>✓ Declarative React component (no imperative DOM manipulation)</li>
            <li>✓ TanStack Table v8 integration</li>
            <li>✓ Dynamic column definitions with custom rendering</li>
            <li>✓ Row click and double-click event handlers</li>
            <li>✓ Header click event handlers</li>
            <li>✓ Inline row editing with data change callbacks</li>
            <li>✓ Column visibility and width configuration</li>
            <li>✓ Sortable columns support</li>
            <li>✓ CSS Modules for scoped styling</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App

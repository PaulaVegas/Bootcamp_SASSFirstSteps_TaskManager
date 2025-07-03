import React, { useEffect, useState }from 'react'
import TaskApp from './components/TaskApp'
import './App.css'

function App() {
 const [theme, setTheme] = useState('dark') 
  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark')
    document.body.classList.add(`theme-${theme}`)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="App">
      <header>
        <button className="button-primary" onClick={toggleTheme}>
           {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </header>
      <TaskApp />
    </div>
  )
}

export default App
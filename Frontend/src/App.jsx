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
        <label className="switch">
          <input
            type="checkbox"
            checked={theme === 'light'}
            onChange={toggleTheme}
          />
          <span className="slider">
            <span className='icon sun'>🌞</span>
            <span className='icon moon'>🌙</span>
          </span>
        </label>
      </header>
      <TaskApp />
    </div>
  )
}
export default App
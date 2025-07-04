import React, { useEffect, useState }from 'react'
import TaskApp from './components/TaskApp'
import './App.css'
import SunIcon from "./assets/icons/sun.png"
import MoonIcon from "./assets/icons/moon.png"

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
            <span className='icon sun'><img src={SunIcon} className="icon" alt="Sun Icon" /></span>
            <span className='icon moon'><img src={MoonIcon} className="icon" alt="Moon Icon" /></span>
          </span>
        </label>
      </header>
      <TaskApp />
    </div>
  )
}
export default App
import "../assets/styles/main.scss"
import { useEffect, useState } from "react"
import {
  getAllTasks,
  createTask,
  completeTask,
  deleteTask,
} from "../services/taskService"

export default function TaskApp() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [newTaskId, setNewTaskId] = useState(null);

  const loadTasks = async () => {
    const data = await getAllTasks()
    setTasks(data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleAddTask = async () => {
    if (!newTask.trim()) return
    const createdTask = await createTask(newTask)
    setNewTask("")
    await loadTasks()
    setNewTaskId(createdTask._id)
    setTimeout(() => {
      setNewTaskId(null)
    }, 600)
  }

  const handleComplete = async (id) => {
    const li = document.getElementById(id)
    if (!li) return;
    li.classList.add("completed-animate")
     const sparklesContainer = document.createElement("div")
  sparklesContainer.className = "sparkles-container"
  li.appendChild(sparklesContainer)

  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement("div")
    sparkle.className = "sparkle"
    sparkle.style.setProperty('--dx', `${(Math.random() - 0.5) * 40}px`)
    sparkle.style.setProperty('--dy', `${(Math.random() - 0.5) * 40}px`)
    sparklesContainer.appendChild(sparkle)
  }

  setTimeout(async () => {
    sparklesContainer.remove()
    await completeTask(id)
    loadTasks()
  }, 600)
}
const handleDelete = async (id) => {
  const li = document.getElementById(id)
  if (!li) {
    await deleteTask(id)
    loadTasks()
    return
  }

  li.classList.add("delete-animate")

  setTimeout(async () => {
    await deleteTask(id)
    loadTasks()
  }, 400)  
}

  return (
    <div className="my-container">
      <h1>Task Manager</h1>

      <div className="task-input">
        <input type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask()
            }
          }}
        />
        <button className="button-primary" onClick={handleAddTask}>Add</button>
      </div>

<section className="task-section">
      <h2>To-Do: {tasks.filter(task => !task.completed).length}</h2>
      <ul className="task-list">
        {tasks
          .filter(task => !task.completed)
          .map(task => (
            <li
                key={task._id}
                id={task._id}
                className={task._id === newTaskId ? "task-new" : ""}
              >
              <span>{task.title}</span>
              <button onClick={() => handleComplete(task._id)}> ✔️</button>
              <button onClick={() => handleDelete(task._id)}> 🗑️</button>
            </li>
          ))}
      </ul>
    </section>

    <section className="task-section">
      <h2>Done: {tasks.filter(task => task.completed).length}</h2>
      <ul className="task-list">
        {tasks
          .filter(task => task.completed)
          .map(task => (
            <li key={task._id} id={task._id}>
              <span style={{ textDecoration: "line-through" }}>
                {task.title}
              </span>
              <button onClick={() => handleDelete(task._id)}> 🗑️</button>
            </li>
          ))}
      </ul>
    </section>
  </div>
  )
}
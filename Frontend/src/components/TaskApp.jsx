import "../styles/TaskApp.scss"
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

  const loadTasks = async () => {
    const data = await getAllTasks()
    setTasks(data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleAddTask = async () => {
    if (!newTask.trim()) return
    await createTask(newTask)
    setNewTask("")
    loadTasks()
  }

  const handleComplete = async (id) => {
    await completeTask(id)
    loadTasks()
  }

  const handleDelete = async (id) => {
    await deleteTask(id)
    loadTasks()
  }

  return (
    <div className="task-app">
      <h1>Mis Tareas</h1>

      <div>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button onClick={handleAddTask}>Añadir</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.title}
            </span>
            <button onClick={() => handleComplete(task._id)}>✔️</button>
            <button onClick={() => handleDelete(task._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

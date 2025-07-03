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
    const li = document.getElementById(id)
    if (!li) return;
    li.classList.add("completed-animate")
    setTimeout(async () => {
      await completeTask(id)
      loadTasks()
    }, 300) 
  }

  const handleDelete = async (id) => {
    await deleteTask(id)
    loadTasks()
  }

  return (
    <div className="my-container">
      <h1>To Do</h1>

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

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} id={task._id}>
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.title}
            </span>
            <button onClick={() => handleComplete(task._id)}> ✔️</button>
            <button onClick={() => handleDelete(task._id)}> 🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

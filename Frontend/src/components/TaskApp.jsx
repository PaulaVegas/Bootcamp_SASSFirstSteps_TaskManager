import "../assets/styles/main.scss"
import { useEffect, useState } from "react"
import {
  getAllTasks,
  createTask,
  completeTask,
  deleteTask,
  uncompleteTask
} from "../services/taskService"
import CheckIcon from "../assets/icons/check.png"
import DeleteIcon from "../assets/icons/bin.png"
import UncompleteIcon from "../assets/icons/back.png"
import AddIcon from "../assets/icons/add.png"


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

const handleUncomplete = async (id) => {
  const li = document.getElementById(id)
  if (li) {
    li.classList.add("task-uncompleted")
  }
  await uncompleteTask(id)
  setTimeout(() => {
    loadTasks()
  }, 400)
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
        <button className="button-primary" onClick={handleAddTask}> <img src={AddIcon} className="icon" /> </button>
      </div>

<section className="task-section">
      <h2>To Do - {tasks.filter(task => !task.completed).length}</h2>
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
              <button onClick={() => handleComplete(task._id)}>  <img src={CheckIcon} alt="Complete" className="icon" /></button>
              <button onClick={() => handleDelete(task._id)}> <img src={DeleteIcon} alt="Delete" className="icon" /></button>
            </li>
          ))}
      </ul>
    </section>

    <section className="task-section">
      <h2>Done - {tasks.filter(task => task.completed).length}</h2>
      <ul className="task-list completed">
        {tasks
          .filter(task => task.completed)
          .map(task => (
            <li key={task._id} id={task._id}>
              <span className="task-title completed">
                {task.title}
              </span>
              <button onClick={() => handleUncomplete(task._id)}> <img src={UncompleteIcon} alt="Uncomplete" className="icon" /></button>
              <button onClick={() => handleDelete(task._id)}> <img src={DeleteIcon} alt="Delete" className="icon" /></button>
            </li>
          ))}
      </ul>
    </section>
  </div>
  )
}
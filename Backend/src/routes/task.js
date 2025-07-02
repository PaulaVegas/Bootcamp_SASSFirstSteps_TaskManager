const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

router.get('/all', TaskController.allTasks)
router.post('/', TaskController.createTask)
router.get('/:id', TaskController.getTaskById)
router.patch('/complete/:id', TaskController.markAsCompleted)
router.patch('/:id', TaskController.taskUpdate)
router.delete('/:id', TaskController.deleteTask)

module.exports = router

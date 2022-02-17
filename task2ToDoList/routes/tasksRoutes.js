const router = require('express').Router()
const tasksController = require('../controller/tasksController')

router.get('', tasksController.showAllTasks)

router.get('/add', tasksController.addTask)
router.post('/add', tasksController.addTaskPost)

router.get('/edit/:title', tasksController.editTask)
router.post('/edit/:title', tasksController.editTaskPost)

module.exports = router
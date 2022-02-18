const router = require('express').Router()
const tasksController = require('../controller/tasksController')

router.get('', tasksController.showAllTasks)

router.get('/add', tasksController.addTask)
router.post('/add', tasksController.addTaskPost)

router.get('/edit/:title', tasksController.editTask)
router.post('/edit/:title', tasksController.editTaskPost)

router.post('/delete/:title', tasksController.deleteTask)

router.post('/deleteAll', tasksController.deleteAll)

router.get('/show/:title', tasksController.showTask)

module.exports = router
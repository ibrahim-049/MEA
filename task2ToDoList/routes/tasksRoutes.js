const router = require('express').Router()
const tasksController = require('../controller/tasksController')

router.get('', tasksController.showAllTasks)

module.exports = router
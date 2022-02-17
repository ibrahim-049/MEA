const express = require('express')
const bankController = require('../controller/bankController')

const router = express.Router()

router.get('', bankController.showAll)
router.get('/addCustomer', bankController.addCustomer)


module.exports = router
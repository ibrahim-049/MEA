const express =  require('express')
const router = express.Router()
const customerController = require('../controller/customerController')

router.get('', customerController.showAll)

router.get('/addCustomer', customerController.addCustomer)

router.post('/test', customerController.addCustomerPost)

module.exports = router
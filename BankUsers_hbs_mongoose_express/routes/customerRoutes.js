const express =  require('express')
const router = express.Router()
const customerController = require('../controller/customerController')

router.get('', customerController.showAll)

router.get('/addCustomer', customerController.addCustomer)

router.post('/addCustomer', customerController.addCustomerPost)

router.get('/editCustomer/:id', customerController.editCustomer)
router.post('/editCustomer/:id', customerController.editCustomerPost)

router.post('/deleteCustomer/:id', customerController.deleteCustomer)

router.post('/deleteAll', customerController.deleteAll)

router.get('/show/:id', customerController.showSingle)

router.get('/addTransaction/:id', customerController.addTransaction)
router.post('/addTransaction/:id', customerController.addTransactionPost)

router.post('/deleteTransaction/:idT', customerController.deleteTransaction)

router.post('/deleteAllTransactions/:idT', customerController.deleteAllTransaction)

module.exports = router
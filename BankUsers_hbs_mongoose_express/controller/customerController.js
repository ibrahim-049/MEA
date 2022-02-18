
const customerModel = require('../models/customer')

const showAll = async(req, res) => {
    try{
        const customers = await customerModel.find()
        let isEmpty = customers? true:false
        res.render('home', {
            pageTitle:"Home",
            customers,
            isEmpty
        })
    }
    catch(e){
        res.send(e.message)
    }

}
const addCustomer = (req, res) => {
    res.render('addCustomer', {
        pageTitle:"Add Customer"
    })
}
const addCustomerPost = async (req, res) => {
    try{
        const customer = new customerModel()
        await customer.save()
        res.redirect('/')
    }
    catch(e){
        res.render('addCustomer', {
            pageTitle:"Add Customer",
            msg:e.message,
            customer:req.body
        })
    }
}
module.exports = {
    showAll,
    addCustomer,
    addCustomerPost
}
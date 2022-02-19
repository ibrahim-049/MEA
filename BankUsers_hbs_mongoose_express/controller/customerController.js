
const customerModel = require('../models/customer')

const showAll = async(req, res) => {
    try{
        const customers = await customerModel.find()
        let isEmpty = customers.length? true:false
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
        if(!req.body.balance) req.body.balance = undefined
        const customer = new customerModel(req.body)
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

const editCustomer = async (req,res) => {
    try{
        const customer = await customerModel.findById(req.params.id)

        res.render('editCustomer', {pageTitle:"Edit Customer", customer})
    }
    catch(e){
        res.send(e.message)
    }
}
const editCustomerPost = async(req,res) => {
    try{
        await customerModel.findByIdAndUpdate(req.params.id, req.body, {
            runValidators:true
        })
        res.redirect('/')
    }
    catch(e){
        res.render('editCustomer', {
            pageTitle:"Edit Customer",
            msg: e.message,
            customer:req.body
        })
    }

}

const deleteCustomer = async(req,res) => {
    try{
        await customerModel.findByIdAndDelete(req.params.id)
        res.redirect('/')
    }
    catch(e){
        console.log(e.message)
        res.redirect('/')
    }
}
const deleteAll = async(req,res) => {
    try{
        await customerModel.deleteMany()
        res.redirect('/')
    }
    catch(e){
        console.log(e.message)
        res.redirect('/')
    }
}
const showSingle = async (req, res) => {
    try{
        const customer = await customerModel.findById(req.params.id)
        const hasTransactions = customer.transactions.length? true:false
        res.render('showSingleCustomer', {
            pageTitle: `Customer ${customer.name}`,
            customer,
            hasTransactions
        })
    }
    catch(e){
        res.send(e.message)
    }
}
const addTransaction = (req, res) => {
    res.render('addTransaction',{
        pageTitle:"Add Transaction"
    })
}
const addTransactionPost = async (req, res) => {
    try{
        let customer = await customerModel.findById(req.params.id)
        customer.transactions.push(req.body)
        // await customer.save()
        // if(customer.transactions.type === "withdraw"){
        //     if(parseInt(customer.balance) < parseInt(customer.transactions.amount))
        //     {
        //         return res.render('addTransaction',
        //         {
        //             pageTitle:"Add Transaction",
        //             msg:"Not enough balance to withdraw this amount. Please enter another amount",
        //             transactions:req.body
        //         })
        //     }
        //     else{
        //         customer.balance -= parseInt(customer.transactions.amount)
        //     }
        // }
        // else{
        //     customer.balance += parseInt(customer.transactions.amount)
        // }

        if(req.body.type === "withdraw"){
            if( customer.balance < req.body.amount)
            {
                
                return res.render('addTransaction',
                {
                    pageTitle:"Add Transaction",
                    msg:"Not enough balance to withdraw this amount. Please enter another amount",
                    transactions:req.body
                })
            }
            else{
                customer.balance -= req.body.amount
            }
        }
        else{
            customer.balance += req.body.amount
        }
        
        await customer.save()
        res.redirect(`/show/${customer._id}`)
    }
    catch(e)
    {
        res.render('addTransaction',
        {
            pageTitle:"Add Transaction",
            msg:e.message,
            transactions:req.body
        })
    }
}

const deleteTransaction = async(req, res) => {
    const customer = await customerModel.findOne({"transactions._id":req.params.idT})
    customer.transactions = customer.transactions.filter(trans => trans._id != req.params.idT)
    await customer.save()
    res.redirect(`/show/${customer._id}`)
}
const deleteAllTransaction = async(req, res) => {
    const customer = await customerModel.findOne({'transactions:_id':req.params.idT})
    customer.transactions = []
    await customer.save()
    res.redirect(`/show/${customer._id}`)
}
module.exports = {
    showAll,
    addCustomer,
    addCustomerPost,
    editCustomer,
    editCustomerPost,
    deleteCustomer,
    deleteAll,
    showSingle,
    addTransaction,
    addTransactionPost,
    deleteTransaction,
    deleteAllTransaction
}
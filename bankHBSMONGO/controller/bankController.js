const dbcon = require('../models/dbCon')

const showAll = (req, res) => {
   dbcon((err, client, db)=> {
        if(err) return console.log(err)
        db.collection('bank').find().toArray( (error, result)=> {
            if(error) return console.log(error)
            res.render('home', {
                pageTitle:"HOME",
                result,
                isEmpty: result.length? true: false
            })
            client.close()
        })
   })
}
const addCustomer = (req,res) => {
    res.render('add')
}

const addCustomerPost = (req, res) => {
    dbcon( (err, client, db) => {
        if(err) return console.log(err)
        db.collection('bank').insertOne()
    })
}



module.exports = { 
    showAll,
    addCustomer,
    addCustomerPost  

}
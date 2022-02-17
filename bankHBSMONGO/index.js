const app = require('./src/app')
require('dotenv').config()
console.log(process.env.PORT)
app.listen(5000 , () => {
    console.log("WE ARE ON 5000")
})
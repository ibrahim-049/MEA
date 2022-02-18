const app = require('./src/app')
require('dotenv').config()
const PORT = process.env.PORT
app.listen(PORT, () => console.log('we are on 5000') )
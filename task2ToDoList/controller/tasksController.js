const dealWithJsonData = require('./helper/dealWithJsonData')
const path = require('path')

const showAllTasks = (req, res) => {
    const allTasks = dealWithJsonData.readJSONData('./models/data.json')
    res.render('home', {
        pageTitle:"Home",
        allTasks
    })
}

module.exports = {
    showAllTasks,

}
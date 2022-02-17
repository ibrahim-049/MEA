const dealWithJsonData = require('./helper/dealWithJsonData')
const path = require('path')



const showAllTasks = (req, res) => {
    const allTasks = dealWithJsonData.readJSONData('./models/data.json')
    const isEmpty = allTasks.length === 0 ? false: true
    res.render('home', {
        pageTitle:"Home",
        allTasks,
        isEmpty
    })
}
const addTask = (req, res) => {
    res.render('addTask', {
        pageTitle: "Add Task"
    })
}
const addTaskPost = (req, res)=> {
    const allTasks = dealWithJsonData.readJSONData('./models/data.json')
    const flag = allTasks.find( (task) => task.title === req.body.title )
    if(!flag)
    {
        allTasks.push({
        title: req.body.title,
        content: req.body.content
    })
    dealWithJsonData.writeJSONData('./models/data.json', allTasks)

    res.redirect('/')
    }
    else{
        res.render('addTask', {
            pageTitle: 'Add Task',
            titleFlag:"Task title already exists. Please enter another title"
        })
    }
    
}
const editTask = (req, res) => {
    const allTasks = dealWithJsonData.readJSONData('./models/data.json')
    const task = allTasks.find( t => t.title === req.params.title )
    res.render('edit',
    {
        pageTitle:"Edit Task",
        task
    })
}
const editTaskPost = (req, res) => {
    const allTasks = dealWithJsonData.readJSONData('./models/data.json')
    const taskIndex = allTasks.findIndex( t => t.title === req.params.title)
    if(!(req.body.title === req.params.title))
    {
        const flag = allTasks.find( t => t.title === req.body.title )

        if(flag)
        {
            res.render('edit',
            {
                pageTitle: 'Edit Task',
                titleFlag: "Task title already exists. Please enter another title",
                task: allTasks[taskIndex]
            })
        }
        else{
            allTasks[taskIndex].title = req.body.title
            allTasks[taskIndex].content = req.body.content
            dealWithJsonData.writeJSONData('./models/data.json', allTasks)
            res.redirect('/')
        }
    }
    else{
        res.redirect('/')
    }
    
}

module.exports = {
    showAllTasks,
    addTask,
    addTaskPost,
    editTask,
    editTaskPost

}
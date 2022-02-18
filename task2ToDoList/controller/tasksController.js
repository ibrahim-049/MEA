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
            titleFlag:"Task title already exists. Please enter another title",  
            task: req.body
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
const deleteTask = (req, res) => {
    const allTasks = dealWithJsonData.readJSONData('./models/data.json')
    const taskIndex = allTasks.findIndex(task => task.title === req.params.title)
    allTasks.splice(taskIndex, 1)
    dealWithJsonData.writeJSONData('./models/data.json', allTasks)
    res.redirect('/')
} 

const deleteAll = (req,res) => {
    dealWithJsonData.writeJSONData('./models/data.json', [])
    res.redirect('/')
}

const showTask = (req, res) => {
    const allTasks = dealWithJsonData.readJSONData('./models/data.json')
    const task = allTasks.find(task => task.title === req.params.title)

    res.render('showTask', {
        pageTitle: `Task ${task.title}`,
        task
    })
}
module.exports = {
    showAllTasks,
    addTask,
    addTaskPost,
    editTask,
    editTaskPost,
    deleteTask,
    deleteAll,
    showTask

}
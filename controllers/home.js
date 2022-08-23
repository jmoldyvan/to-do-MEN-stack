const TodoTask = require('../models/todotask')

module.exports = {
    getIndex :async (req,res) => {
        try {
            const tasks = await TodoTask.find()
                res.render("index.ejs", {
                    todoTasks: tasks
                })
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    },
    createTask: async (req,res) => {
        const todoTask = new TodoTask({
            title: req.body.title,
            content: req.body.content
        })
        try{
            await todoTask.save()
            console.log(todoTask);
            res.redirect('/')
        }
        catch(error) {
            res.status(500).send({message: error.message});
            res.redirect('/')
        }
    }
}
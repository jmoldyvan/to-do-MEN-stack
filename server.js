const express = require("express")
const app = express()
const PORT = 8000
const mongoose = require("mongoose")
require("dotenv").config()
const TodoTask = require('./models/todotask')


app.set("view engine","ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser:true},
    () => {console.log('CONNECTED TO DB');})

    app.get('/', async (req,res) => {
        try {
            TodoTask.find({}, (err,tasks) => {
                res.render("index.ejs", {
                    todoTasks: tasks
                })
            })
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    })
    // app.get("/", async (req, res) => {
    //     try {
    //         TodoTask.find({}, (err, tasks) => {
    //             res.render("index.ejs", { todoTasks: tasks });
    //         });
    //     } catch (err) {
    //         if (err) return res.status(500).send(err);
    //     }
    // });

    app.post('/', async (req,res) => {
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
    })
    

    app
        .route('/edit/:id')
        .get((req,res) => {
            const id = req.params.id
            TodoTask.find({}, (err,tasks) => {
                res.render('edit.ejs', {
                    todoTasks:tasks, idTask : id})
            })
        })
        .post((req,res) => {
            const id = req.params.id
            TodoTask.findByIdAndUpdate(
                id,
                {title: req.body.title,
                content: req.body.content},
                err => {if (err) return res.status(500).send(err)}
            )
        })


    app
        .route("/remove/:id")
        .get((req,res) => {
            const id = req.params.id
            TodoTask.findByIdAndRemove(id, err => {
                if (err) return res.status(500).send(err)
                res.redirect('/')
            }) 
        })


app.listen(PORT, () => console.log("YOU HAVE PORTED"))
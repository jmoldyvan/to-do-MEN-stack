const express = require("express")
const app = express()
const PORT = 8000
const mongoose = require("mongoose")
require("dotenv").config({path: './config/.env'})
const TodoTask = require('./models/todotask')
const homeRoutes = require('./routes/home')
const editRoutes = require('./routes/edit')
const connectDB =  require('./config/database')

connectDB()

app.set("view engine","ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

// Routes
app.use('/', homeRoutes)
app.use('/edit', editRoutes)


app.listen(PORT, () => console.log("YOU HAVE PORTED"))
const mongoose = require('mongoose')
const todoTaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    date:{
        type: String,
        default: Date.now
    }
})
module.exports = mongoose.model('TodoTask', todoTaskSchema, 'to-do-app-coll')
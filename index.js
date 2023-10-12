const express = require('express')
const mongoose = require('mongoose')
const todoModel = require('./models/todo_model')
const todoRouter = require('./routes/todoroute')
const bodyParser = require('body-parser')
const CONFIG = require('./config/config')
const ConnectToDb = require('./db/mongoDb')


const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// connect to mongoDb
ConnectToDb()

app.use('/todos', todoRouter)

// home route
app.get('/', async(req, res)=>{

    const todos = await todoModel.find()
    return res.status(200).json({
        status: true,
        message: todos
    })
})


// create a server
app.listen(CONFIG.PORT, ()=>{
    console.log("listening to port: http://localhost:"+CONFIG.PORT)
})
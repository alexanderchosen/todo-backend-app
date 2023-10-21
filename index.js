const express = require('express')
const mongoose = require('mongoose')
const todoModel = require('./models/todo_model')
const todoRouter = require('./routes/todoroute')
const authorRoute = require('./routes/authorRoute')
const bodyParser = require('body-parser')
const CONFIG = require('./config/config')
const ConnectToDb = require('./db/mongoDb')


const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// connect to mongoDb
ConnectToDb()

app.use('/todos/v1/', todoRouter)
app.use('authors/v1/', authorRoute)

// home route
app.get('/', async(req, res)=>{
    return res.status(200).json({
        status: true,
        message: "WELOCME TO MY TODO APP"
    })
})

// error handler MW
app.use((error, req, res, next)=>{
    console.log(error)
    const errorStatus = error.status || 500

    res.status(errorStatus).json({
        status: false,
        message: "An error occured"
    })

    next()
})


// create a server
app.listen(CONFIG.PORT, ()=>{
    console.log("listening to port: http://localhost:"+CONFIG.PORT)
})
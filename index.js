const express = require('express')
const mongoose = require('mongoose')
const todoModel = require('./models/todo_model')
const todoRouter = require('./routes/todoroute')

// define port
const PORT = 3000

const app = express()

app.use(express.json())

app.use('/todos', todoRouter)

// home route
app.get('/', async(req, res)=>{

    const todos = await todoModel.find()
    return res.status(200).json({
        status: true,
        message: todos
    })
})


// create a mongoose connection
mongoose.connect("mongodb+srv://alexander:Lalacious234@cluster0.ln9yann.mongodb.net/")

mongoose.connection.on("connected", ()=>{
    console.log("Connected to MongoDB successfully")
})

mongoose.connection.on("error", (err)=>{
    console.log("An error occured")
})

// create a server
app.listen(PORT, ()=>{
    console.log("listening to port: http://localhost:"+PORT)
})
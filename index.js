const express = require('express')
const mongoose = require('mongoose')
const todoRouter = require('./routes/todoroute')

// define port
const PORT = 3000

const app = express()


// home route
app.get('/', (req, res)=>{
    return res.json({
        status: 200,
        message: true
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
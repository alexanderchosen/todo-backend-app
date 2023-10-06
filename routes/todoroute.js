const express = require('express');
const mongoose = require('mongoose');
const todoModel = require('../models/todo_model');
const moment = require('moment');

const todoRouter =express.Router()

// create a todo route to post todos
todoRouter.post('/new', async(req, res)=>{
    const body = req.body
    const todo = await todoModel.create({
        title: body.title,
        shortDescription: body.shortDescription,
        content: body.content,
        created_at: moment().toDate(),
        category: body.category
    })
    return res.status(200).json({
        status: true,
        message: todo
    })
    // todo.save()

})


// get by id params
todoRouter.get('/:id', async(req, res)=>{
    const id = req.params.id

    const todo = await todoModel.findById(id)

    if(!todo){
        return res.status(404).json({
            status: false,
            message: null
        })
    }

        return res.status(200).json({
            status: true,
            message: todo
        })
})



module.exports = todoRouter
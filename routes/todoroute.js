const express = require('express');
const mongoose = require('mongoose');
const todoModel = require('../models/todo_model');
const moment = require('moment');

const todoRouter =express.Router()

// create a todo route to post todos

todoRouter.post('/new', async(req, res)=>{
    const body = req.body
    const todo = await todoModel.create({
        id: body.id,
        title: body.title,
        shortDescription: body.shortDescription,
        content: body.content,
        created_at: moment().toDate(),
        category: body.category
    })


    // todo.save()

})


module.exports = todoRouter
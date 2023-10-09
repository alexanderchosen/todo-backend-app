const express = require('express');
const mongoose = require('mongoose');
const todoModel = require('../models/todo_model');
const moment = require('moment');

const todoRouter =express.Router()

function shortDescription(content){

    // take the content and split it into sentences using split and regex
    const sentences = content.split(/[.?!]/)

    // check if each sentence is empty and trim each sentence
    const validSentence = sentences.filter(sentence => sentence.trim() !== '')
    .map(sentence => sentence.trim())

    console.log(validSentence)

    // check if sentence is more than 0
    if(validSentence.length > 0){
        return validSentence[0]
    }
    else{
        return content
    }

}


// create a todo route to post todos
todoRouter.post('/new', async(req, res)=>{
    const body = req.body
    const content = req.body.content

    const todo = await todoModel.create({
        title: body.title,
        shortDescription: shortDescription(content),
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


// update todo by id
// todoRouter.patch('/update/:id', async(req, res)=>{
//     const {id} = req.params.id
//     const {title, shortDescription, content, category} = req.body

//     shortDescription = await shortDescription(content)

//     const updateTodo = await todoModel.findByIdAndUpdate(id, [
//         {"title": title}, {"shortDescription": shortDescription }, {"content": content}, {"category": category}
//     ], function(err, res){
//         if(err){
//            return res.send(err)
//         }
//         else{
//            return res.send(res)
//         }
//     })


    // updateTodo.title = title
    // updateTodo.content = content
    // shortDescription = shortDescription(updateTodo.content)
    // updateTodo.category = category

    // await updateTodo.save()

    // return res.status(200).json({
    //     status: true,
    //     message: updateTodo
    // })
    // })







module.exports = todoRouter
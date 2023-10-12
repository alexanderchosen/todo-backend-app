const express = require('express');
const mongoose = require('mongoose');
const todoModel = require('../models/todo_model');
const moment = require('moment');
const {todoValidatorMW} = require('../validators/todo.validator')

const todoRouter =express.Router()

function shortDescriptions(content){

    // take the content and split it into sentences using split and regex
    const sentences = content.split(/[.,?!]/)

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
todoRouter.post('/add', todoValidatorMW, async(req, res)=>{
    const body = req.body
    const content = req.body.content

    const todo = await todoModel.create({
        title: body.title,
        shortDescription: shortDescriptions(content),
        content: body.content,
        created_at: moment().toDate(),
        category: body.category
    })
    return res.status(200).json({
        status: true,
        message: todo
    })


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
todoRouter.patch('/update/:id', async(req, res)=>{
    const {id} = req.params
    const updatedData = req.body

    // check if id is correct, then if currentTodo model is correct , then check if update made is empty

    try{

        if(!id){
            return res.status(404).json({
                status: false,
                message: err,
                error: `Incorrect ID: ${id}`
            })
        }
        const currentTodo = await todoModel.findById(id)

        if(!currentTodo){
            return res.status(404).json({
                status: false,
                message: "Todo not found!"
            })
        }


        if(Object.keys(updatedData).length === 0){
            return res.status(403).json({
                status: false,
                message: currentTodo,
                info:'No update made!!'

            })
        }

        const updatedTodo = await todoModel.findByIdAndUpdate(id, {$set: updatedData}, {new: true})

        const content = updatedTodo.content

        const calculatedShortDescription = await shortDescriptions(content)

        updatedTodo.shortDescription = calculatedShortDescription

        await updatedTodo.save()

        return res.status(200).json({
            status: true,
            message: updatedTodo
        })
    }
    catch (err){
        console.error(`Error log: ${err}`)
        return res.status(500).json({
            status: false,
            message: `${err}`,
            info: "Internal Server Error"
        })
    }
})


// delete todo by ID
todoRouter.delete('/del/:id', async (req, res)=>{
    const id = req.params.id

    const deletedTodo = await todoModel.findByIdAndDelete(id)

    try{
        if (!id){
            return res.status(404).json({
                status: false,
                message: 'Incorrect ID'
            })
        }
        return res.status(200).json({
            status: true,
            message: deletedTodo
        })
    }
    catch(error){
        console.error(`${error}`)
        return res.status(500).json({
            status: false,
            message: error
        })
    }

    })






module.exports = todoRouter
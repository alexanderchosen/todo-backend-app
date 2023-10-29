const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const moment = require('moment')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const AuthorSchema = new Schema({
    id: ObjectId,
    firstname:String,
    lastname: String,
    username: String,
    password: String,
    gender: {
        type:String,
        enum: ['male', 'female']
    },
    bio: String,
    dob: Date,
    country: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdatedAt: {
        type: Date,
        default: Date.now
    }
})

AuthorSchema.plugin(passportLocalMongoose)

const Author = mongoose.model('Authors', AuthorSchema)

module.exports = Author
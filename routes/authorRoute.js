const express = require('express')
const authorModel = require('../models/author_model')
const moment = require('moment')
const {addAuthorValidatorMW,updateAuthorValidatorMW} = require('../validators/author.validator')
const authorController = require('../controller/author.controller')

const authorRoute = express.Router()


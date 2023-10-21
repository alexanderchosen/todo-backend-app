const Joi = require('joi')

const addAuthorValidator = Joi.object({

    firstname: Joi.string()
                .min(1)
                .trim()
                .required(),
    lastname: Joi.string()
                .min(1)
                .trim()
                .required(),
    username: Joi.string()
                .min(3)
                .max(10)
                .required(),
    gender: Joi.string()
                .required(),
    bio: Joi.string()
            .min(10)
            .max(250)
            .trim()
            .optional(),
    dob: Joi.date()
         .greater('1-1-1900')
         .less('1-1-2022')
         .optional(),
    country: Joi.string()
            .trim()
            .optional(),
    createdAt: Joi.date()
                .required()

})


const updateAuthorValidator = Joi.object({

    username: Joi.string()
            .min(3)
            .max(10)
            .optional(),
    bio: Joi.string()
            .min(10)
            .max(250)
            .trim()
            .optional(),
    dob: Joi.date()
         .greater('1-1-1900')
         .less('1-1-2022')
         .optional(),
    country: Joi.string()
            .trim()
            .optional(),
    lastUpdatedAt: Joi.date()
                .required()

})


const addAuthorValidatorMW = async function(req, res, next){
    const addAuthorPayload = req.body

    try{
        await addAuthorValidator.validateAsync(addAuthorPayload)
        next()
    }
    catch(err){
        return res.status(500).json({
            status: false,
            message: err.details[0].message
        })
    }
}

const updateAuthorValidatorMW = async function(req, res, next){
    const updateAuthorPayload = req.body

    try{
        await updateAuthorValidator.validateAsync(updateAuthorPayload)
        next()
    }
    catch(err){
        return res.status(500).json({
            status: false,
            message: err.details[0].message
        })
    }
}


module.exports ={
    addAuthorValidatorMW,
    updateAuthorValidatorMW
}
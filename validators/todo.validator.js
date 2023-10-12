const Joi  = require ('joi')

const todoValidator = Joi.object({

    title: Joi.string()
            .min(5)
            .max(50)
            .trim()
            .required(),

    shortDescription: Joi.string()
                        .min(10)
                        .max(255)
                        .trim(),

    content: Joi.string()
                .min(250)
                .required(),

    created_at: Joi.date()
                    .default(Date.now),

    category: Joi.string()
                .required()
})

async function todoValidatorMW  (req, res, next){
    const todoPayLoad = req.body

    try{
        await todoValidator.validateAsync(todoPayLoad)
        next()
    }
    catch(error){
        console.log(error)
        return res.status(406).json({
            status: false,
            message: "An Error Occured",
            info: error.details[0].message
        })
    }
}

module.exports = {
    todoValidatorMW
}
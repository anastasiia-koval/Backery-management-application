const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "The field is required";
                break;
            case "string.min":
                err.message = `Minimum ${err.local.limit} characters`;
                break;
            case "string.max":
                err.message = `Maximum ${err.local.limit} characters`;
                break;
            case "date.min":
                err.message = "You can not choose date from past";    
                break;
            case "number.min":
                err.message = `Minimum ${err.local.limit} number`;
                break;
            case "date.base":
                err.message = "Date is required";
                break;
            case "number.base":
                err.message = "The field is required";
                break;            
            default:
                break;
        }
    });
    return errors;
}

const todayDate = new Date();

module.exports.orderSchema = Joi.object({
    orderingDate: Joi.date().required().min(todayDate).error(errMessages),
    address: Joi.string().required().error(errMessages),
    apartament: Joi.number().required().min(0).error(errMessages),
    clientName: Joi.string().required().error(errMessages),
    phoneNumber: Joi.optional().allow(null),
    floor: Joi.optional(),
    clientSurname: Joi.string().required().error(errMessages),
    deliveryTime: Joi.string().error(errMessages),
    busketName: Joi.optional(),
    busket: Joi.optional().allow(null)
})

module.exports.dishSchema = Joi.object({
    name: Joi.string().required().error(errMessages),
    image: Joi.string().required(),
    price: Joi.number().required().min(0).error(errMessages),
    description: Joi.string().min(0).max(100).error(errMessages),
    quantity: Joi.number().min(0).error(errMessages)
})


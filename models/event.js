const mongoose = require('mongoose');
const Joi = require('joi');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength:4,
        maxlength: 255
    },
  
    venue:{
        type:String,
        minlength : 3,
        maxlength: 255,
        required: true
    },
    eventDate:{
        type:Date,
        required: true
    },
    price:{
        type:String,
        minlength : 3,
        maxlength: 255,
        required: true
    },
    numberOfTickets:{
        type:Number,
        min: 0,
        max: 1025,
        required: true
    }
    // category:{
    //     type: Array,
    //     enum:['Premium Regular']
    // }
})

const Event = mongoose.model('Event', eventSchema)

function validateEvent(event){
    const schema = {
        name: Joi.string().required(),
        venue: Joi.string().required(),
        eventDate: Joi.date().required(),
        price: Joi.string().required(),
        numberOfTickets: Joi.number().required(),
       // category: Joi.required()
    }
    return Joi.validate(event, schema)
}

exports.Event = Event;
exports.validate = validateEvent;
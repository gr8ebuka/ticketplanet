const mongoose = require('mongoose');
const Joi = require('joi');

const cinemaSchema = new mongoose.Schema({
    location: {
        type: String,
        required:true,
        minlength:4,
        maxlength: 255
    },
  
    name:{
        type:String,
        minlength : 3,
        maxlength: 255,
        required: true
    }
 })

const Cinema = mongoose.model('Cinema', cinemaSchema)

function validateCinema(cinema){
    const schema = {
        location: Joi.string().required(),
        name: Joi.string().required(),
    }
    return Joi.validate(cinema, schema)
}

exports.Cinema = Cinema;
exports.validate = validateCinema;
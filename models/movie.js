const mongoose = require('mongoose');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    shortFilmTitle: {
        type: String,
        required:true,
        minlength:4,
        maxlength: 255
    },
    filmTitle: {
        type: String,
        required:true,
        minlength:4,
        maxlength: 255
    },
    comingSoon: {
        type: String,
        required:true,
        minlength:4,
        maxlength: 255
    },
    cinemaId: {
        type: Number,
        required:true,
        min:0,
        max: 255
    },
    code: {
        type: Number,
        required:true,
        min:0     
    }, 
    certificate: {
        type: String,
        required:true,
        min:0,
        max: 255
    },
    is3D:{
        type: String,
        default: false,
        required: true
         },
    img_Title: {
        type: String,
        required:true,
        minlength:4,
        maxlength: 255
        },
      
    rentrak: {
        type: String,
        required:true,
        minlength:4,
        maxlength: 255
    },  
youtube: {
        type: String,
        required:true,
        minlength:4,
        maxlength: 255
        },      
    
    releaseDate:{
        type:Date,
        required: true
        },
    runningTime: {
        type: String,
        required:true,
    },
    synopsis: {
        type: String,
        required:true,
        minlength:4,
        maxlength: 255
    },
    certificateDesc:{
        type:String,
        minlength : 3,
        maxlength: 255,
        required: true
    },
    img_ls:{
        type:String,
        minlength : 3,
        maxlength: 255,
        required: true
    },
    digital:{
        type:String,
        minlength : 3,
        maxlength: 255,
        required: true
    }, 
     genre:{
        type:String,
        minlength : 3,
        maxlength: 255,
        required: true
    },
    genreCode:{
        type:String,
        minlength : 3,
        maxlength: 255,
        required: true
    },
    startDate:{
        type:Date,
        required: true
    },
    IMDBCode:{
        type:String,
        minlength : 3,
        maxlength: 255,
        required: true
    },
    price:{
        type:String,
        minlength : 3,
        maxlength: 255,
        required: true
    },
  
})

const Movie = mongoose.model('Movie', movieSchema)

function validateMovie(movie){
    const schema = {
    shortFilmTitle: Joi.string().required(),
    filmTitle: Joi.string().required(),
    comingSoon: Joi.string().required(),
    cinemaId: Joi.number().required(),
    code: Joi.number().required(),
    certificate: Joi.string().required(),
    is3D: Joi.string().required(),
    img_Title: Joi.string().required(),
    rentrak: Joi.string().required(),
    youtube: Joi.string().required(),
    releaseDate: Joi.date().required(),
    runningTime: Joi.string().required(),
    synopsis: Joi.string().required(),
    certificateDesc: Joi.string().required(),
    img_ls: Joi.string().required(),
    digital: Joi.string().required(),
    genre: Joi.string().required(),
    price: Joi.string().required(),
    genreCode: Joi.string().required(),
    startDate: Joi.string().required(),
    img_app: Joi.string().required(),
    IMDBCode: Joi.string().required()
    }
    return Joi.validate(movie, schema)
}

exports.Movie = Movie;
exports.validate = validateMovie;
const mongoose = require('mongoose');
const Joi = require('joi');

const bookingSchema =  new mongoose.Schema({
    movie: {
        type: new mongoose.Schema({
            // title: {
            //     type: String,
            //     required:true,
            //     minlength:4,
            //     maxlength: 255
            // },
            // genre:{
            //     type:String,
            //     minlength : 3,
            //     maxlength: 255,
            //     required: true
            // },
            // releaseDate:{
            //     type:Date,
            //     required: true
            // },
            // price:{
            //     type:String,
            //     minlength : 3,
            //     maxlength: 255,
            //     required: true
            // },
            // is3D:{
            //     type: Boolean,
            //     default: false,
            //     required: true
            //      }
            
        })
    },
    numOfTickets:{
        type:Number,
        min: 0,
        max: 1025,
        required: true
    },
    cinema:{ 
        type: new mongoose.Schema({
            // location: {
            //     type: String,
            //     required:true,
            //     minlength:4,
            //     maxlength: 255
            // },
          
            // name:{
            //     type:String,
            //     minlength : 3,
            //     maxlength: 255,
            //     required: true
            // }
         })
    },
    user: {
        type : new mongoose.Schema({
            // firstName:{
            //     type:String,
            //     minlength:3,
            //     maxlength:255,
            //     required: true
            // },
            // lastName:{
            //     type:String,
            //     minlength:3,
            //     maxlength:255,
            //     required: true
            // },
            // email:{
            //     type:String,
            //     unique: true,
            //     required: true
            // },
            // password:{
            //     type: String,
            //     minlength:5                
            // }
        })
    }
})

const Booking = mongoose.model('Booking', bookingSchema)

function validateBooking(booking){
    const schema = {
        cinemaID: Joi.objectId().required(),
        userID: Joi.objectId().required(),
        numOfTickets: Joi.number().required(),
        movieID: Joi.objectId().required()
    }
    return Joi.validate(booking, schema)
}

exports.bookingSchema = bookingSchema;
exports.Booking = Booking;
exports.validate = validateBooking;
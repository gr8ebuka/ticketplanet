const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        maxlength: 255,
        minlength:2,
        required: true
    },
    lastName:{
        type: String,
        maxlength: 255,
        minlength:2,
        required: true
    }, 
    phone:{
        type: String,
        maxlength: 255,
        minlength:2,
        required: true
    },
    password:{
        type: String,
        maxlength: 255,
        minlength:6,
        required: true
    },
    email:{
        type: String,
        maxlength: 255,
        minlength:2,
        required: true
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id }, config.get('jwtPrivateKey'))
    return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user){
    const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phone: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required().email()
    }
    return Joi.validate(user, schema)
}
exports.User = User
exports.validate = validateUser
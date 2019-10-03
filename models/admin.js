const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const adminSchema = new mongoose.Schema({
    firstName:{
        type:String,
        minlength:3,
        maxlength:255,
        required: true
    },
    lastName:{
        type:String,
        minlength:3,
        maxlength:255,
        required: true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        minlength:5,
        required: true
    }
})

adminSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id }, config.get('jwtPrivateKey'))
    return token
}

const Admin = mongoose.model('Admin', adminSchema)

function validateAdmin(admin){
    const schema = {
        firstName: Joi.string().required().min(3),
        lastName: Joi.string().required().min(3),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().required().min(5)
    }
    return Joi.validate(admin, schema)
}

exports.Admin = Admin;
exports.validate = validateAdmin;
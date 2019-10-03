const express = require('express')
const Joi = require('joi')
const  bcrypt = require('bcrypt')
const _ = require('lodash')
const {Admin} = require('../models/admin')
const router = express.Router()

router.post('/', async(req, res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let admin = await Admin.findOne({email: req.body.email})
    if(!admin) return res.status(400).send('You entered wrong email or password')

    const validPassword = await bcrypt.compare(req.body.password, admin.password)
    if(!validPassword) return res.status(400).send('You entered wrong email or password')
    const token = admin.generateAuthToken()
    res.send (token)

})
function validate(req){
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }
    return Joi.validate(req, schema)
}

module.exports = router
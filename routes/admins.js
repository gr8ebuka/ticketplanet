const express = require('express')
const  bcrypt = require('bcrypt')
const _ = require('lodash')
const {validate, Admin} =  require('../models/admin')
const router = express.Router()

router.post('/', async(req, res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    let admin = await Admin.findOne({email: req.body.email})
    if(admin) return res.status(400).send('Email is already registered')


    admin = await new Admin(_.pick(req.body, ['firstName','lastName','email','password']))
    
    const salt = await bcrypt.genSalt(5);
    admin.password = await bcrypt.hash(admin.password, salt)
    admin.save()
    const token = admin.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(admin, ['firstName', 'lastName', 'email']))
})
module.exports = router
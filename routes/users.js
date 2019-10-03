const express = require('express')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const router = express.Router()
const {validate, User} = require('../models/user')

router.post('/', async(req, res)=>{
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('Email already registered')
  
    user = await new User(_.pick(req.body, ['firstName', 'lastName', 'phone', 'email','password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    const token = user.generateAuthToken()
    user.save()
    res.header('x-auth-header', token).send(_.pick(user, ['firstName', 'lastName', 'email','phone']))
})

module.exports = router

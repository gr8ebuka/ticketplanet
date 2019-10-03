const express = require('express');
const config = require('config')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const app = express();
const mongoose = require('mongoose');
const movies = require('./routes/movies')
const events = require('./routes/events')
const cinemas = require('./routes/cinemas')
const admins = require('./routes/admins')
const bookings = require('./routes/bookings')
const authAdmins = require('./routes/adminsLoggin')
const users = require('./routes/users')
const userLog = require('./routes/userLog')

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined ')
    process.exit(1)
}




mongoose.connect('mongodb://localhost/ticketplanet', {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
    .then(()=> console.log('Connected to mongoDB'))
    .catch(err => console.error('Error connecting to mongodb...'))
app.use(express.json())
app.use('/api/userLog', userLog)
app.use('/api/users', users)
app.use('/api/authAdmins', authAdmins)
app.use('/api/bookings', bookings)
app.use('/api/admins', admins)
app.use('/api/cinemas', cinemas)
app.use('/api/events', events)
app.use('/api/movies', movies)


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`))
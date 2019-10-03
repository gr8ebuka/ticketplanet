const express = require ('express')
const _ = require('lodash')
//const objectid = require('objectid')
const router = express.Router()
const { Cinema } = require('../models/cinema')
const { User} = require('../models/user')
const {Movie} = require('../models/movie')
const {validate, Booking} = require('../models/booking')
const {bookingSchema} = require('../models/booking')
const {sendMail} = require('../utils/sendMail')



router.get('/', async(req, res)=>{
    const bookings = await Booking.find().sort('title')
    res.send(bookings)
})


router.post('/',   async(req, res) =>{
    const {error} = validate(req.body)  
    if(error) return res.status(400).send(error.details[0].message)

    const movie = await Movie.findById(req.body.movieID)    
    if(!movie) return res.status(400).send(' Invalid movie ID')
    
    const user = await User.findById(req.body.userID)   
     if(!user) return res.status(400).send(' Invalid user ID')

    const cinema = await Cinema.findById(req.body.cinemaID)    
    if(!cinema) return res.status(400).send(' Invalid cinema ID')

     let booking = await new Booking({
        
        movie: {
            _id: movie._id,
            filmTitle: movie.filmTitle,
            runningTime:movie.runningTime
              },
         numOfTickets:req.body.numOfTickets,
         
        user: {
            _id: user._id,
            email:user.email
               },
         
        cinema: {
            _id: cinema._id,
            name:cinema.name,
            location:cinema.location
        
         }
     })
  
      booking.save()
   
    res.send(booking)
    sendMail(user.email, 'Movie Ticket', `Your ticket has been booked ref ${booking._id}. Movie: ${movie.filmTitle} Cinema Name: ${cinema.name}, Location: ${cinema.location},  number of tickets ${booking.numOfTickets }.. Thanks for your patronage!!` )
})

module.exports = router;

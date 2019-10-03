const express = require ('express')
const _ = require('lodash')
const objectid = require('objectid')
const router = express.Router()
const {validate, Event} = require('../models/event')



router.get('/', async(req, res)=>{
    const events = await Event.find().sort('title')
    res.send(events)
})

router.get('/:id', async(req, res)=>{
    try{
    const event = await Event.findById(req.params.id)
    if(!objectid.isValid(Event._id) && !event) return res.status(400).send('Invalid event Id.')    
    res.send(event)
    }
    catch(ex){
        console.log('Provide a valid event id')
    }
})


router.post('/',   async(req, res) =>{
    const {error} = validate(req.body)  
    if(error) return res.status(400).send(error.details[0].message)

     let event = await new Event({
         name: req.body.name,
         venue: req.body.venue,
         eventDate: req.body.eventDate,
         price: req.body.price,
         numberOfTickets:req.body.numberOfTickets
     })
  
      event.save()   
    res.send(event)
})

router.put('/:id', async(req, res)=>{

    const {error} = validate(req.body)  
    if(error) return res.status(400).send(error.details[0].message)
    const event = await Event.findByIdAndUpdate ( req.params.id, {
        name: req.body.name,
        venue: req.body.venue,
        eventDate: req.body.releaseDate,
        price: req.body.price,
        numberOfTickets:req.body.numberOfTickets
    }, {new: true})
    if(!event) return res.status(400).send('Invalid event Id.')

    res.send(event)
})

router.delete('/:id', async(req,res)=>{
    const event = await Event.findByIdAndDelete(req.params.id)
    if(!event) return res.status(400).send('Invalid event Id.')
    res.send(event)
})

module.exports = router;
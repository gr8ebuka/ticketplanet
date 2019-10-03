const express = require ('express')
const _ = require('lodash')
const objectid = require('objectid')
const router = express.Router()
const {validate, Cinema} = require('../models/cinema')



router.get('/', async(req, res)=>{
    const cinemas = await Cinema.find().sort('title')
    res.send(cinemas)
})

router.get('/:id', async(req, res)=>{
    try{
    const cinema = await Cinema.findById(req.params.id)
    if(!objectid.isValid(Cinema._id) && !cinema) return res.status(400).send('Invalid cinema Id.')    
    res.send(cinema)
    }
    catch(ex){
        console.log('Provide a valid cinema id')
    }
})


router.post('/',   async(req, res) =>{
    const {error} = validate(req.body)  
    if(error) return res.status(400).send(error.details[0].message)

     let cinema = await new Cinema(_.pick(req.body, ['name', 'location']))
  
      cinema.save()   
    res.send(cinema)
})

// router.put('/:id', async(req, res)=>{

//     const {error} = validate(req.body)  
//     if(error) return res.status(400).send(error.details[0].message)
//     const cinema = await Cinema.findByIdAndUpdate ( req.params.id, {
//         name: req.body.name,
//         location: req.body.location,
//          }, {new: true})
//     if(!cinema) return res.status(400).send('Invalid cinema Id.')

//     res.send(cinema)
// })

router.delete('/:id', async(req,res)=>{
    const cinema = await Cinema.findByIdAndDelete(req.params.id)
    if(!cinema) return res.status(400).send('Invalid cinema Id.')
    res.send(cinema)
})

module.exports = router;
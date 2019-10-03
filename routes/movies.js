const express = require ('express')
const _ = require('lodash')
const objectid = require('objectid')
const router = express.Router()
const {validate, Movie} = require('../models/movie')
const auth = require('../middleware/auth')



router.get('/', async(req, res)=>{
    const movies = await Movie.find()
    res.send(movies)
})

router.get('/:id', async(req, res)=>{
    try{
    const movie = await Movie.findById(req.params.id)
    if(!objectid.isValid(Movie._id) && !movie) return res.status(400).send('Invalid movie Id.')    
    res.send(movie)
    }
    catch(ex){
        console.log('Provide a valid movie id')
    }
})


router.post('/',  auth,  async(req, res) =>{
    const {error} = validate(req.body)  
    if(error) return res.status(400).send(error.details[0].message)

     let movie = await new Movie(_.pick(req.body,
         ['shortFilmTitle','filmTitle', 'comingSoon','cinemaId','code',
         'certificate','is3D','img_Title','rentrak','youtube','releaseDate',
         'runningTime','synopsis','certificateDesc','img_ls','digital','genre',
         'genreCode','startDate','img_app','IMDBCode', "price"
]))
  
      movie.save()
      res.send(movie)
})

router.put('/:id', auth, async(req, res)=>{

    const {error} = validate(req.body)  
    if(error) return res.status(400).send(error.details[0].message)
    const movie = await Movie.findOneAndUpdate ( req.params.id, _.pick(req.body,
        ['shortFilmTitle','filmTitle', 'comingSoon','cinemaId','code',
        'certificate','is3D','img_Title','rentrak','youtube','releaseDate',
        'runningTime','synopsis','certificateDesc','img_ls','digital','genre',
        'genreCode','startDate','img_app','IMDBCode', "price"
        ]), {new: true}
)

    if(!movie) return res.status(400).send('Invalid movie Id.')

    res.send(movie)
})

router.delete('/:id', auth,  async(req,res)=>{
    const movie = await Movie.findByIdAndDelete(req.params.id)
    if(!movie) return res.status(400).send('Invalid movie Id.')
    res.send(movie)
})

module.exports = router;
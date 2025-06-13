const Favorites = require('../models/Favorites');

const express = require('express');
const router = express.Router();
const getuser = require('../middleware/getuser');

const authorized = require('../middleware/authorization');
const JWT_SECRET = 'Abeerisanokaycoder'; 
 




// Route 1: add movie: POST "api/favorites/addFav"
router.post('/addFav', getuser, async (req, res)=>
{ 
    const {movieId, title, poster_path} = req.body;

    try 
    {
        const exists = await Favorites.findOne({ user: req.user.id, movieId });
        if (exists) 
        {
            return res.status(400).json({ message: 'Already in Favorites' });
        }

        const current_movie = new Favorites({
            user: req.user.id,
            movieId: movieId,
            title: title,
            poster_path: poster_path,
        });

        await current_movie.save();
        res.json({ message: 'Movie added to Favorites' });
    } 
    catch(err) 
    {
        return res.status(500).json('internal server error');
    }
})





// Route 2: remove movie: DELETE "api/favorites/removeFav"
router.delete('/removeFav', getuser, async (req, res)=>
{
    try
    {
        await Favorites.findOneAndDelete({
            user: req.user.id,
            movieId: req.body.movieId
        })
        res.json({message: "removed"})
    }
    catch(err)
    {
        return res.status(500).send("internal server error")
    }
})





// Route 3: get all watch later movies: GET "api/favorites/getAllFavs"
router.get('/getAllFavs', getuser, async (req, res)=>
{
    try
    {
        const all_fav = await Favorites.find({user: req.user.id});
        res.json(all_fav)
    } 
    catch(err)
    {
        return res.status(500).send("internal server error")
    }
})

module.exports = router;
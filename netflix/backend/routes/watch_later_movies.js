const Watch_later = require('../models/Watch_later');

const express = require('express');
const router = express.Router();
const getuser = require('../middleware/getuser');

const authorized = require('../middleware/authorization');
const JWT_SECRET = 'Abeerisanokaycoder'; 
 

// Route 1: add movie: POST "api/watch_later_movies/add"
router.post('/add', getuser, authorized, async (req, res)=>
{ 
    const {movie_id, title, poster_path} = req.body;

    try 
    {
        const exists = await Watch_later.findOne({ user: req.user.id, movie_id });
        if (exists) 
        {
        return res.status(400).json({ message: 'Already in watch later list' });
        }

        const current_movie = new Watch_later({
        user: req.user.id,
        movie_id,
        title,
        poster_path,
        });

        await current_movie.save();
        res.json({ message: 'Movie added to watch later list' });
    } 
    catch(err) 
    {
        return res.status(500).json('internal server error');
    }
})





// Route 2: remove movie: DELETE "api/watch_later_movies/remove"
router.delete('/remove', getuser, authorized, async (req, res)=>
{
    try
    {
        await Watch_later.findOneAndDelete({
            user: req.user.id,
            movie_id: req.body.movie_id
        })
        res.json({message: "removed"})
    }
    catch(err)
    {
        return res.status(500).send("internal server error")
    }
})





// Route 3: get all watch later movies: GET "api/watch_later_movies/get_all_movies"
router.get('/get_all_movies', getuser, authorized, async (req, res)=>
{
    try
    {
        const all_WL = await Watch_later.find({user: req.user.id});
        res.json(all_WL)
    } 
    catch(err)
    {
        return res.status(500).send("internal server error")
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();
const axios = require('axios');

const TMDB_API_KEY = '0fa1a3197338d149f3204cff20154131'; 



// Example: Get Trending Movies
router.get('/trending', async (req, res) => {
  const page = req.query.page || 1;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}&page=${page}`
    );
    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

module.exports = router;

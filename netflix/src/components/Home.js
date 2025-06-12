import React from 'react';
import Movies from './Movies';

export default function Home({setProgress}) {
  const handleAddToWatchLater = async (movie) => {
    try 
    {
      const res = await fetch('http://localhost:5000/api/watch_later_movies/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          movieId: movie.movieId || movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to add to watch later');
      alert('Added to Watch Later');
    } 
    catch (err) 
    {
      alert(err.message);
    }
  };

  const handleAddToFavorites = async (movie) => {
    try 
    {
      const res = await fetch('http://localhost:5000/api/favorites/addFav', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          movieId: movie.movieId || movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to add to favorites');
      alert('Added to Favorites');
    } 
    catch (err) 
    {
      alert(err.message);
    }
  };
  
  return (
    <div>
      <Movies setProgress={setProgress} onAddToWatchLater={handleAddToWatchLater} onAddToFavorites={handleAddToFavorites}/>
    </div>
  );
}

import React from 'react';
import Movies from './Movies';

export default function Home(props) {
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
      if (!result) 
      {
        props.showAlert("failed to add to watch later", "danger")
      }
      else
      {
        props.showAlert("added to watch later", "success");
      }
    } 
    catch (err) 
    {
      props.showAlert("error", "danger")
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
      if (!result) 
      {
        props.showAlert("failed to add to favorites", "danger")
      }
      else
      {
        props.showAlert("added to favorites", "success");
      }
    } 
    catch (err) 
    {
      props.showAlert("error", "danger");
    }
  };


  const handleRemoveFromWatchLater = async (movie) =>{
    try
    {
      const res = await fetch("http://localhost:5000/api/watch_later_movies/remove", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }, 
        body: JSON.stringify ({
          movieId: movie.movieId || movie.id
        })
      })

      const res_json = await res.json()
      if (!res_json)
      {
        props.showAlert("failed to remove from watch later", "danger");
      }
      else
      {
        props.showAlert("Removed from watch later playlist successfully", "success");
      }
    }
    catch (err)
    {
      props.showAlert("error", "danger")
    }
  }


  const handleRemoveFromFavorites = async (movie) =>{
    try
    {
      const res = await fetch("http://localhost:5000/api/favorites/removeFav", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify ({
          movieId: movie.movieId || movie.id
        })
      })
      const res_json = await res.json();
      if (!res_json)
      {
        props.showAlert("failed to remove from favorites", "danger");
      }
      else
      {
        props.showAlert("removed from favorites successfully", "success")
      }
    }
    catch (err)
    {
      props.showAlert("error", "danger")
    }
  }
  
  return (
    <div>
      <Movies setProgress={props.setProgress} onAddToWatchLater={handleAddToWatchLater} onAddToFavorites={handleAddToFavorites} onRemoveFromWatchLater={handleRemoveFromWatchLater} onRemoveFromFavorites={handleRemoveFromFavorites}/>
    </div>
  );
}

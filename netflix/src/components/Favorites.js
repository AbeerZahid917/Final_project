import React, { useEffect, useState } from 'react'






export default function Favorites(props) {
    const [allMovieDeets, setAllMovieDeets] = useState([]);

    useEffect (() => {
        const fetchFavs = async () =>{
            try 
            {
                const res = await fetch('http://localhost:5000/api/favorites/getAllFavs', {
                    method: 'GET',
                    headers: {
                        'auth-token': localStorage.getItem('token'),
                    },
                });

                const res_json = await res.json();
                const apiKey = '0fa1a3197338d149f3204cff20154131'; // Replace with your TMDB API key
                const movie_deets = await Promise.all(
                    res_json.map(async (movie) => {
                        const tmdbRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=${apiKey}`);
                        const tmdbData = await tmdbRes.json();
                        return { ...movie, ...tmdbData };
                    })
                );
                setAllMovieDeets(movie_deets)
            }
            catch (err) 
            {
                console.error("couldnt fetch favorites")
            }
        };
        fetchFavs();
    }, [])

     
    
    return (
        <div className="container my-3">
            <h1 className="text-center text-light" style={{ marginTop: '50px' }}>
                Favorites Playlist
            </h1>

            {allMovieDeets.length === 0? 
                (<p className='container text-center text-light my-5'>No Movies In Your Favorites Playlist</p>) :
                (
                    <div className="container my-3">
                        <div className="row">

                            {allMovieDeets.map((movie) => (
                            <div className="col-md-4 my-3" key={movie._id}>
                                <div className="card" style={{ width: '18rem' }}>
                                    <img
                                        src={movie.poster_path? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: 'https://cdn.mos.cms.futurecdn.net/xGFuXb9XeSQNBT7sEwehek.jpg'}
                                        className="card-img-top"
                                        alt={movie.title}
                                    />
                                        
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>

                                            <p className="card-text">
                                            {movie.overview
                                                ? movie.overview.slice(0, 100) + '...'
                                                : 'No description available.'}
                                            </p>
                                    </div>

                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item" 
                                            style={{ cursor: 'pointer' }} 
                                            onClick={async () => {
                                                const success = await props.onRemoveFromFavorites(movie);
                                                if (success) {
                                                    setAllMovieDeets(prev => prev.filter(m => (m.movieId || m.id) !== (movie.movieId || movie.id)));
                                                }
                                            }}>
                                            Remove from favorites
                                        </li>
                                    </ul>
                                    
                                    <a  href={`https://www.themoviedb.org/movie/${movie.id}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="container card-link my-1"
                                    >
                                        View on TMDB
                                    </a>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>    
            )}
        </div>
    )
}

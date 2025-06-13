import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Moviecard from './Moviecard';




const Movies = (props) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [watchLaterIds, setWatchLaterIds] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);



    const fetchMovies = async (pageNumber = 1) => {
        setLoading(true);
        props.setProgress(10);

        const url = `http://localhost:5000/api/movies/trending?page=${pageNumber}`;
        const response = await fetch(url);
        const moviesData = await response.json();

        if (pageNumber === 1) 
        {
            setMovies(moviesData);
        } 
        else 
        {
            setMovies(prev => prev.concat(moviesData));
        }

        setTotalResults(1000); 
        setLoading(false);
        props.setProgress(100);
    };

    const fetchWatchLater = async () => {
        const res = await fetch('http://localhost:5000/api/watch_later_movies/get_all_movies', {
            headers: { 'auth-token': localStorage.getItem('token') }
        });
        const data = await res.json();
        setWatchLaterIds(data.map(movie => movie.movieId));
    };

    const fetchFavorites = async () => {
        const res = await fetch('http://localhost:5000/api/favorites/getAllFavs', {
            headers: { 'auth-token': localStorage.getItem('token') }
        });
        const data = await res.json();
        setFavoriteIds(data.map(movie => movie.movieId));
    };

    useEffect(() => {
        fetchMovies(1);
        fetchWatchLater();
        fetchFavorites();
    }, []);

    const fetchMoreData = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage);
    };

    const handleFavoriteChange = async () => {
        await fetchFavorites();
    };

    const handleWatchLaterChange = async () => {
        await fetchWatchLater();
    };

    

    return (
        <div className="container my-3">
            <h1 className="text-center text-light" style={{ marginTop: '50px' }}>
                Popular Movies
            </h1>

            <InfiniteScroll
                dataLength={movies.length}
                next={fetchMoreData}
                hasMore={movies.length < totalResults}
                loader={<h4 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Loading...</h4>}
            >
                <div className="container">
                    <div className="row">
                        {movies.map((movie) => (
                            <div className="col-md-4" key={movie.id}>
                                <Moviecard
                                    title={movie.title}
                                    description={movie.overview}
                                    imageurl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    movie={movie}

                                    onAddToWatchLater={async (movie) => {
                                        await props.onAddToWatchLater(movie);
                                        handleWatchLaterChange(); 
                                    }}
                                    onRemoveFromWatchLater={async (movie) => {
                                        await props.onRemoveFromWatchLater(movie);
                                        handleWatchLaterChange(); 
                                    }}

                                    onAddToFavorites={async (movie) => {
                                        await props.onAddToFavorites(movie);
                                        handleFavoriteChange(); 
                                    }}
                                    onRemoveFromFavorites={async (movie) => {
                                        await props.onRemoveFromFavorites(movie);
                                        handleFavoriteChange(); 
                                    }}

                                    isInWatchLater={watchLaterIds.includes(movie.id?.toString() || movie.movieId)}
                                    isInFavorites={favoriteIds.includes(movie.id?.toString() || movie.movieId)}


                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )
}

Movies.defaultProps = {
    country: 'us',
    pageSize: 9,
};

Movies.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired,
};

export default Movies;

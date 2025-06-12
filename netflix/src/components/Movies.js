import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Moviecard from './Moviecard';




const Movies = (props) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    const fetchMovies = async (pageNumber = 1) => {
      setLoading(true);
      props.setProgress(10);

      const url = `http://localhost:5000/api/movies/trending?page=${pageNumber}`;
      const response = await fetch(url);
      const moviesData = await response.json();

      if (pageNumber === 1) {
          setMovies(moviesData);
      } else {
          setMovies(prev => prev.concat(moviesData));
      }

      setTotalResults(1000); 
      setLoading(false);
      props.setProgress(100);
    };


    useEffect(() => {
      fetchMovies(1);
    }, []);

    const fetchMoreData = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage);
    };
    

    return (
        <div className="container my-3">
            <h1 className="text-center text-light" style={{ marginTop: '50px' }}>
                Popular Movies
            </h1>

                <div className="container">
                    <div className="row">
                        {movies.map((movie) => (
                            <div className="col-md-4" key={movie.id}>
                                <Moviecard
                                    title={movie.title}
                                    description={movie.overview}
                                    imageurl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    movie={movie}
                                    onAddToWatchLater={props.onAddToWatchLater}
                                    onAddToFavorites={props.onAddToFavorites}
                                />
                            </div>
                        ))}
                    </div>
                </div>
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

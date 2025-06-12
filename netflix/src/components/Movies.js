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

      setTotalResults(1000); // TMDB doesn't return total count for trending; you can set a dummy value or adjust logic
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
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
};

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

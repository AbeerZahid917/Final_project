
export default function Moviecard(props) {
  const {
    title, description, imageurl, movie,
    onAddToWatchLater, onAddToFavorites,
    onRemoveFromWatchLater, onRemoveFromFavorites,
    isInWatchLater, isInFavorites
  } = props;

  return (
    <div className='my-3'>
      <div className="card" style={{ width: '18rem' }}>

        <img src={!imageurl? 'https://cdn.mos.cms.futurecdn.net/xGFuXb9XeSQNBT7sEwehek.jpg': `https://image.tmdb.org/t/p/w500${imageurl}`} className="card-img-top" alt={title}/>
        
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description ? description.slice(0, 100) + '...' : 'No description available.'}</p>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item" 
            style={{ cursor: 'pointer' }} 
            onClick={() => isInWatchLater? 
              onRemoveFromWatchLater(movie): 
              onAddToWatchLater(movie)}>
                {isInWatchLater? 'remove from watch later': 'add to watch later'}
          </li>

          <li className="list-group-item" 
            style={{ cursor: 'pointer' }} 
            onClick={() => isInFavorites?
              onRemoveFromFavorites(movie):
              onAddToFavorites(movie)}>
                {isInFavorites? 'remove from favorites': 'add to favorites'}
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
  );
}

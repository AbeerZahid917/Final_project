import React from 'react';



export default function Moviecard(props) {
  let { title, description, imageurl } = props;

  return (
    <div className='my-3'>
      <div className="card" style={{ width: '18rem' }}>
        <img src={!imageurl? 'https://cdn.mos.cms.futurecdn.net/xGFuXb9XeSQNBT7sEwehek.jpg': `https://image.tmdb.org/t/p/w500${imageurl}`} className="card-img-top" alt={title}/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description ? description.slice(0, 100) + '...' : 'No description available.'}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Save to Watch later</li>
          <li className="list-group-item">Add to favorites</li>
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">More Info</a>
          <a href="#" className="card-link">IMDb</a>
        </div>
      </div>
    </div>
  );
}

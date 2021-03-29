import React from 'react';
import { Link } from 'react-router-dom';
import './card.css'

const base_url = "https://image.tmdb.org/t/p/original/";

const Card = ({movie, isLargeRow, handleClick}) => {
    return ( 
        <div className='card'>
            <img   
                onClick={() => handleClick(movie)}
                className={`card__poster ${isLargeRow && "card__posterLarge"}`}
                src={`${base_url}${movie.poster_path}`} 
                alt={movie.original_name} />
                <Link to={`/about/${movie.id}`}>
                    <div className="card__poster__more">
                        <i className="fas fa-info-circle"></i>
                        <div>Rating: {movie.vote_average}</div>
                    </div>    
                </Link>
        </div>
     );
}
 
export default Card;
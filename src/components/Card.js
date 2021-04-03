import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './card.css'
import { MovieContext } from './MovieContext';

const base_url = "https://image.tmdb.org/t/p/original/";

const Card = ({movie, isLargeRow, handleClick, isTvShow, isFavorite}) => {
    const canClick = handleClick ? true: false;

    const [ myList, setMyList, handleAddUniqueToMyList] = useContext(MovieContext);
    
    const handleRemoveFromMyList = () => {
        setMyList(prevValue => prevValue.filter(el => el.id !== movie.id));
    }

    return ( 
        <div className='card'>
            <img   
                onClick={canClick ? () => handleClick(movie) : undefined}
                className={`card__poster ${isLargeRow ? "card__posterLarge" : ''}`}
                src={`${base_url}${movie.poster_path}`} 
                alt={movie.original_name} />
                    <div className="card__poster__more">
                        <Link to={`/about/${isTvShow ? 'tv' : 'movie'}/${movie.id}`}>
                            <i className="fas fa-info-circle"></i>
                        </Link>
                        <div>
                            {
                                isFavorite
                                ?
                                <i onClick={handleRemoveFromMyList} className="fas fa-trash"></i>
                                :
                                <i onClick={() => handleAddUniqueToMyList(movie)} className="fas fa-heart"></i>
                            }
                        </div>
                    </div>    
        </div>
     );
}
 
export default Card;
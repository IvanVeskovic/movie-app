import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './header.scss';
import { MovieContext } from './MovieContext';

const Header = ({movieParam, isTvShow}) => {
    const [movie, setMovie] = useState([]);
    const [,,handleAddUniqueToMyList] = useContext(MovieContext);

    useEffect(() => {
        setMovie(movieParam);
    }, [movieParam])
    
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    return ( 
        <header className="header"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path})`,
                backgroundPosition: 'center center'
            }}
        >
            {
             movie
             &&   
            <div className="header__contents">

                <h1 className='header__title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="header__buttons">
                    <Link to={`/about/${isTvShow ? 'tv' : 'movie'}/${movie.id}`}>
                        <button className="header__button">More</button>
                    </Link>
                    <button className="header__button" onClick={() => handleAddUniqueToMyList(movie)}>My List</button>
                </div>
                <p className="header__description">
                    {truncate(movie?.overview, 150)}
                </p>

                <div className="header__rating">
                    {movie.vote_average}
                </div>
            </div>}
            <div className="header--fadeBottom"></div>

        </header>
     ); 
}

export default Header;
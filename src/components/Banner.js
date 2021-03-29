import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './banner.css';

const Banner = ({movieParam}) => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        setMovie(movieParam);
    }, [movieParam])


    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    return ( 
        <header className="banner"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path})`,
                backgroundPosition: 'center center'
            }}
        >
            <div className="banner__contents">

                <h1 className='banner__title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner_buttons">
                    <Link to={`/about/${movie.id}`}>
                        <button className="banner__button">More</button>
                    </Link>
                    <button className="banner__button">My List</button>
                </div>
                <p className="banner__description">
                    {truncate(movie?.overview, 150)}
                </p>
            </div>
            <div className="banner--fadeBottom"></div>

        </header>
     ); 
}

export default Banner;
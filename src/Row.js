import React, { useState, useEffect } from 'react';
import axios from './axios';

import './row.css';

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({title, fetchUrl, isLargeRow}) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {   
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])

    console.log(movies);
    return ( 
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    movies.map(movie => (
                        <img 
                        key={movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}  `}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.original_name} />
                    ))
                }
            </div>
            {/* Container > posters */}
        </div>
     );
}
 
export default Row;
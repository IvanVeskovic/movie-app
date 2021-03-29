import React, { useState, useEffect } from 'react';
import axios from './axios';

import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

import './row.css';
import Card from './Card';

const Row = ({title, fetchUrl}) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {   
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])

    const opts = {
        height: '390px',
        width: '100%',
        playerVars: {
            autplay: 1
        },
    };

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || " ")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch(err => console.log(err, movie.title))
        }
    }

    
    
    return ( 
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    movies.map(movie => (
                            // <div className="row__poster-holder" key={movie.id}>
                            //     <img 
                                
                            //     onClick={() => handleClick(movie)}
                            //     className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            //     src={`${base_url}${movie.poster_path}`} 
                            //     alt={movie.original_name} />
                            //     <Link to={`/about/${movie.id}`}>
                            //         <div className="row__poster__more">
                            //             <i className="fas fa-info-circle"></i>
                            //             <div>Rating: {movie.vote_average}</div>
                            //         </div>    
                            //     </Link>
                            // </div>

                            <Card movie={movie} key={movie.id} handleClick={handleClick} trailerUrl={trailerUrl} setTrailerUrl={setTrailerUrl} isLargeRow />
                    ))
                }
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
     );
}
 
export default Row;
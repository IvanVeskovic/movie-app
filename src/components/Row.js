import React, { useState, useEffect, useContext } from 'react';
import axios from './axios';

import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

import './row.css';
import Card from './Card';

import { MovieContext } from './MovieContext';

const Row = ({title, fetchUrl, isLargeRow, isTvShow, isFavorite}) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    const [myList, setMyList] = useContext(MovieContext);

    useEffect(() => {
        if(isFavorite && myList.length > 0){
            setMovies(myList);
        }
    }, [movies, myList])

    useEffect(() => {   
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

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
    };

    return ( 
        <div className='row'>
            <h2 className={isFavorite ? 'row__heading--main' : ''} >{title}</h2>
            <div className="row__posters">
                {   
                    movies
                    &&
                    movies.map(movie => (
                        <Card movie={movie} key={movie.id} handleClick={handleClick} trailerUrl={trailerUrl} setTrailerUrl={setTrailerUrl} isLargeRow={isLargeRow} isTvShow={isTvShow} isFavorite={isFavorite} />
                    ))
                }
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
     );
}
 
export default Row;
import React, { useState, useEffect, useContext } from 'react';
import axios from './axios';

import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

import './row.scss';
import Card from './Card';

import Axios from 'axios';

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
        let source = Axios.CancelToken.source();
        
        const fetchData = async () => {
            try {
                const request = await axios.get(fetchUrl, {cancelToken: source.token});
                setMovies(request.data.results);
            } catch (err) {
                if(Axios.isCancel(err)){
                    console.log('caught cancel row');
                }else {
                    throw err;
                }
            }
        }
        fetchData();

        return () => {
            source.cancel();
        }
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
            movieTrailer(movie?.original_name || movie?.title || movie?.name || " ")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch(err => console.log(err))
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
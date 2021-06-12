import React, { useState, useEffect, useContext } from 'react';
import axios from './axios';
import './row.scss';
import Card from './Card';

import Axios from 'axios';

import { MovieContext } from './MovieContext';
import Video from './Video';

const Row = ({title, fetchUrl, isLargeRow, isTvShow, isFavorite}) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    const {myList, api_key} = useContext(MovieContext);

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
    
    const handleClick = async (movie) => {
        if(trailerUrl) {
            setTrailerUrl('');
        } else {
            const request = await axios.get(`https://api.themoviedb.org/3/${isTvShow ? 'tv' : 'movie'}/${movie.id}/videos?api_key=${api_key}&language=en-US`);
            const trailerYouTube = request.data.results.find(trailer => trailer.site === 'YouTube');
            if(trailerYouTube) {
                setTrailerUrl(trailerYouTube.key)
            }
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
            {trailerUrl && <Video trailerUrl={trailerUrl} setTrailerUrl={setTrailerUrl} />}
        </div>
     );
}
 
export default Row;
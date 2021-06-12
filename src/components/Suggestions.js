import React, { useState, useEffect, useContext } from 'react';
import axios from './axios';
import Card from './Card';
import './suggestions.scss'

import { MovieContext } from './MovieContext';


const Suggestions = ({id, type}) => {
    const [movies, setMovies] = useState([]);
    const {api_key} = useContext(MovieContext);


    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`/${type}/${id}/recommendations?api_key=${api_key}&language=en-US&page=1`);

            setMovies(request.data.results.slice(0, 5));
        }
        fetchData();
    }, [id])

    return ( 
        <div className='suggestions'>
            {   movies
                &&
                <div className="suggestions__box">
                {
                    movies.map(movie => (
                        <Card movie={movie} key={movie.id} />
                    ))
                }
            </div>}
                
        </div>
     );
}
 
export default Suggestions;
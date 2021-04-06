import React, { useState, useEffect } from 'react';
import axios from './axios';
import Card from './Card';
import './suggestions.scss'


const Suggestions = ({id, type}) => {
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            // temporary problem to fetch similar movies
            const request = await axios.get(`/${type}/${id}/recommendations?api_key=6adf23324df69a693d26feff956cd872&language=en-US&page=1`);

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
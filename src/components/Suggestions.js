import React, { useState, useEffect } from 'react';
import axios from './axios';
import Card from './Card';
import './suggestions.css'


const Suggestions = ({id}) => {
    const [movies, setMovies] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=6adf23324df69a693d26feff956cd872&language=en-US&page=1`);

            setMovies(request.data.results.slice(0, 5));
        }
        fetchData();
    }, [id])

    return ( 
        <div className='suggestions'>
            <div className="suggestions__box">
                {
                    movies.map(movie => (
                        <Card movie={movie} key={movie.id} />
                    ))
                }
            </div>
                
        </div>
     );
}
 
export default Suggestions;
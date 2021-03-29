import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from '../components/axios';
import Banner from "../components/Banner";

import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

import './about.css'
import Suggestions from "../components/Suggestions";

const About = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState([]);
    const [cast, setCast] = useState([]);
    const [show, setShow] = useState(10);

    const [trailerUrl, setTrailerUrl] = useState('')

    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        const fetchData = async () => {
            const req = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=6adf23324df69a693d26feff956cd872&language=en-US`);
            setMovie(req.data);
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const req = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=6adf23324df69a693d26feff956cd872&language=en-US`);
            setCast(req.data.cast);
        }
        fetchData();
    }, [id]);

    const handleShow = (e) => {
        setShow(show + 10);
    }

    const opts = {
        height: '390px',
        width: '100%',
        playerVars: {
            autplay: 1
        },
    };

    const handleLoad = (movie) => {
        movieTrailer(movie?.title || movie?.name || movie?.original_name || " ")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch(err => console.log(err, movie.title));
    }

    return ( 
        <div className='about' onLoad={() => handleLoad(movie)}>
            <Banner movieParam={movie} />

            <h2 className='about__heading'>Trailer</h2>
            <YouTube videoId={trailerUrl} opts={opts} />


            <h2 className="about__heading">
                Casts
            </h2>
            <div className="cast">
                {
                    cast.filter((el,indx) => indx < show)
                        .map(cast => (
                        <div className="cast__box" key={cast.id}>
                            <div className="cast__wraper">
                                <img className='cast__img' src={base_url + cast?.profile_path} alt=""/>
                                <div className="cast__name">{cast.original_name}</div>
                            </div>
                            <div className="cast_character">{cast.character}</div>
                        </div>
                    ))
                }
                <button className='cast__btn' onClick={handleShow}>Show More</button>
            </div>

            <h2 className="about__heading">Suggestions</h2>
            <Suggestions id={movie.id} />
        </div>
     );
}
 
export default About;
import React, { useState, useEffect } from 'react';
import request from '../components/request';
import axios from '../components/axios';
import Banner from '../components/Banner';
import Row from '../components/Row';

const TvShows = () => {
    const [tvShow, setTvShow] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                const req = await axios.get(request.fetchTvCrime);
                setTvShow(req.data.results[Math.floor(Math.random() * req.data.results.length -1)]);
            }
            fetchData();
        }, [])
        
    return ( 
        <div className='tv'>
            <Banner movieParam={tvShow} isTvShow />
            
            <Row title="NETFLIX ORIGINALS" fetchUrl={request.fetchNetflixOriginalsTv} isLargeRow isTvShow/>
            <Row title="Top Rated" fetchUrl={request.fetchTvTopRated} isTvShow/>
            <Row title="Action" fetchUrl={request.fetchTvAction} isTvShow />
            <Row title="Comedy" fetchUrl={request.fetchTvComedy} isTvShow />
            <Row title="Crime" fetchUrl={request.fetchTvCrime} isTvShow />
            <Row title="Drama" fetchUrl={request.fetchTvDrama} isTvShow />
            <Row title="Documentaries" fetchUrl={request.fetchTvDocumentaries} isTvShow />
            <Row title="Animation" fetchUrl={request.fetchTvAniamtion} isTvShow />
            <Row title="SciFu and Fantasy" fetchUrl={request.fetchSciFi} isTvShow />
        </div>
     );
}
 
export default TvShows;
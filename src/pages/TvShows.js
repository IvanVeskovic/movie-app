import React, { useState, useEffect, useContext } from 'react';
import request from '../components/request';
import axios from '../components/axios';
import Header from '../components/Header';
import Row from '../components/Row';
import { MovieContext } from '../components/MovieContext';
import Axios from 'axios';

const TvShows = () => {
    const [tvShow, setTvShow] = useState([]);
    const [myList] = useContext(MovieContext);

        useEffect(() => {
            let source = Axios.CancelToken.source();

            const fetchData = async () => {
                try{
                    const req = await axios.get(request.fetchTvCrime, {cancelToken: source.token});
                    setTvShow(req.data.results[Math.floor(Math.random() * req.data.results.length -1)]);
                } catch (err) {
                    if(Axios.isCancel(err)){
                        console.log('Caught cancel TvShows');
                    } else {
                        throw err;
                    }
                }
            }
            fetchData();

            return () => {
                source.cancel();
            }
        }, [])
        
    return ( 
        <div className='tv'>
            <Header movieParam={tvShow} isTvShow />
            
            {myList[0] && <Row title="My List" isFavorite isLargeRow />}
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
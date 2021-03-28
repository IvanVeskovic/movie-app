import Banner from "../components/Banner";
import Row from "../components/Row";
import request from '../components/request';

import axios from '../components/axios';
import { useState, useEffect } from "react";

const Home = () => {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const req = await axios.get(request.fetchNetflixOriginals);
            setMovie(req.data.results[Math.floor(Math.random() * req.data.results.length -1)]);
            return request;
        }
        fetchData();
    }, [])


    return ( 
        <div className="home">
            <Banner movieParam={movie} />
            
            <Row title="NETFLIX ORIGINALS" fetchUrl={request.fetchNetflixOriginals} isLargeRow />
            <Row title="Trending Now" fetchUrl={request.fetchTrending} />
            <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
            <Row title="Documentaries" fetchUrl={request.fetchDocumentaries} />
        </div>
     );
}
 
export default Home;
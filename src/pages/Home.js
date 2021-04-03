import Header from "../components/Header";
import Row from "../components/Row";
import request from '../components/request';

import axios from '../components/axios';
import { useState, useEffect, useContext } from "react";
import { MovieContext } from "../components/MovieContext";

const Home = () => {
    const [movie, setMovie] = useState([]);
    const [myList] = useContext(MovieContext);

    useEffect(() => {
        const fetchData = async () => {
            const req = await axios.get(request.fetchNetflixOriginalsMovie);
            setMovie(req.data.results[Math.floor(Math.random() * req.data.results.length -1)]);
            return request;
        }
        fetchData();
    }, [])


    return ( 
        <div className="home">
            <Header movieParam={movie}/>
            
            {myList[0] && <Row title="My List" isFavorite isLargeRow />}
            <Row title="NETFLIX ORIGINALS" fetchUrl={request.fetchNetflixOriginalsMovie} isLargeRow />
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
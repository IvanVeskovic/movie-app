import React, { useEffect, useState } from 'react';
import Logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import axios from './axios';

import './nav.css';
import Search from './Search';

const Nav = () => {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        window.addEventListener("scroll", ()=> {
            if(window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
    },[])

    useEffect(() => {
        const fetchData = async () => {
            if(search !== ''){
                const req = await axios.get(`/search/movie?api_key=6adf23324df69a693d26feff956cd872&language=en-US&query=${search}`)

                setResults(req.data.results.slice(0, 10));
            }
        }
        fetchData();
    }, [search])

    const handleClearResults = () => {
        setResults([]);
    }

    return ( 
        <nav className={`nav ${show && 'nav__black'}`}>
            <Link to='/'>
                <img src={Logo} alt="Netflix Logo" className='nav__logo' />
            </Link>

            <Search search={search} setSearch={setSearch} results={results} handleClearResults={handleClearResults} />
            {   search
                &&
                <div className="nav__results">
                {
                    results.map(movie => (
                        <Link to={`/about/${movie.id}` }  key={movie.id} >
                            <div className='nav__results__item' onClick={handleClearResults}>
                                <img src={base_url + `${movie?.backdrop_path || movie?.poster_path}`} alt="img" className='nav__results__img' />
                                <span className="nav__results__title">{movie.title}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>}
        </nav>
     );
}
 
export default Nav;
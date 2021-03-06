import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from './axios';

import './nav.scss';
import Search from './Search';

import Axios from 'axios';

import { MovieContext } from './MovieContext';

const Nav = () => {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [toggle, setToggle] = useState(false);

    const {api_key} = useContext(MovieContext);

    
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
        const source = Axios.CancelToken.source();
        const fetchData = async () => {
            try {
                if(search !== ''){
                    const req = await axios.get(`/search/${toggle ? 'tv' : 'movie'}?api_key=${api_key}&language=en-US&query=${search}`, {cancelToken: source.token})
                    setResults(req.data.results.slice(0, 10));
                }
            } catch (err) {
                if(Axios.isCancel(err)) {
                    console.log('canceled nav');
                } else {
                    throw err;
                }
            }
        }
        fetchData();

        return () => {
            source.cancel();
        }
    }, [search])

    const handleClearResults = () => {
        setResults([]);
        setSearch('');
    }

    return ( 
        <nav className={`nav ${show && 'nav--black'}`}>
            <Link to='/'>
                <span className='nav__logo'>M&T</span>
            </Link>

            <div className="nav__pages">
                <div className="nav__link">
                    <Link to='/'>
                        Movies
                    </Link>
                </div>
                <div className="nav__link">
                    <Link to='/tv' >
                        TV Shows
                    </Link>
                </div>
            </div>

            <Search search={search} setSearch={setSearch} results={results} handleClearResults={handleClearResults} toggle={toggle} setToggle={setToggle} />
            {   search
                &&
                <div className="nav__results">
                {
                    results.map(movie => (
                        <Link to={`/about/${toggle ? 'tv' : 'movie'}/${movie.id}` }  key={movie.id} >
                            <div className='nav__results__item' onClick={handleClearResults}>
                                <img src={base_url + `${movie?.backdrop_path || movie?.poster_path}`} alt="img" className='nav__results__img' />
                                <span className="nav__results__title">{toggle ? movie.name : movie.title}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>}
        </nav>
     );
}
 
export default Nav;
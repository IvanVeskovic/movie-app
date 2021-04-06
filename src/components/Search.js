import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import './search.scss';

const Search = ({search, setSearch, results, handleClearResults}) => {
    const [isActive, setIsActive] = useState(false);
    const [toggle, setToggle] = useState(false);

    const history = useHistory();

    const handleChange = (e) => {
        setSearch(e.target.value);
        if(e.target.value){
            setIsActive(true);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(search !== ''){
            handleClearResults();
            history.push(`/about/movie/${results[0].id}`);
        }
        setSearch('');
        setIsActive(false);
    }

    return ( 
        <form onSubmit={handleSubmit} 
             
        >
            <button type="button" className='search__btn' onClick={!isActive ? () => setIsActive(true) : handleSubmit} 
            onMouseEnter={() => setIsActive(true)} 
            >
            <i className="fas fa-search"></i>
            </button>
            <input 
            type="text" 
            name="search" 
            placeholder="Search For A Movie.." 
            value={search}
            className={`search ${isActive ? 'search__active' : ''}`} 
            onChange={handleChange} 
            onSubmit={handleSubmit}
            autoComplete='off'
            onMouseEnter={() => setIsActive(true)} 
            onMouseLeave={() => setIsActive(false)}     />
            <div className="toggle">
                Movie
                <span className='toggle__outer' onClick={() => setToggle(!toggle)}>
                    <span className={`toggle__inner ${toggle && 'toggle__inner--active'}`}></span>
                </span>
                Tv
            </div>
        </form>
    )
}
 
export default Search;
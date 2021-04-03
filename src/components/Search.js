import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import './search.css';

const Search = ({search, setSearch, results, handleClearResults}) => {
    const [isActive, setIsActive] = useState(false);

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
        onMouseEnter={() => setIsActive(true)} 
        onMouseLeave={() => setIsActive(false)}        
        >
            <button type="submit" className='search__btn' onClick={() => setIsActive(!isActive)}>
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
            autoComplete='off'  />
        </form>
    )
}
 
export default Search;
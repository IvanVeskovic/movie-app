import React from 'react';
import {useHistory} from 'react-router-dom';
import './search.css';

const Search = ({search, setSearch, results, handleClearResults}) => {

    const history = useHistory();

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(search !== ''){
            handleClearResults();
            history.push(`/about/${results[0].id}`);
        }

    }

    return ( 
        <form onSubmit={handleSubmit}>
            <button type="submit" className='search__btn'>
            <i className="fas fa-search"></i>
            </button>
            <input onChange={handleChange} type="text" name="search" placeholder="Search For A Movie.." value={search} className={`search ${!search || 'search--focus'}`} onSubmit={handleSubmit} autoComplete='off' />
        </form>
    )
}
 
export default Search;
import React, { useState, createContext, useEffect } from 'react';

export const MovieContext = createContext();


export const MovieProvider = (props) => {
    const [myList, setMyList] = useState([]);

    const api_key = process.env.REACT_APP_TMDB_API_KEY;

    const handleAddUniqueToMyList = (movie, isTvShow) => {
        if(!myList.some(el => el.id === movie.id)){
            setMyList([...myList, {...movie, type: `${isTvShow ? 'tv' : 
        'movie'}`}])
        }
    }

    // Run once hen app start
    useEffect(() => {
        getLocalList();
    }, []);
    // Use Effect
    useEffect(() => {
        saveLocalList();
    }, [myList])

    // Save to Local
    const saveLocalList = () => {
        localStorage.setItem('myList', JSON.stringify(myList));
    }
    const getLocalList = () => {
    if(localStorage.getItem('myList') === null){
        localStorage.setItem('myList', JSON.stringify([]))
    } else {
        let myListLocal = JSON.parse(localStorage.getItem('myList'));
        setMyList(myListLocal);
    }
    }


    return(
        <MovieContext.Provider value={{myList, setMyList, handleAddUniqueToMyList, api_key}}>
            {props.children}
        </MovieContext.Provider>
    );
}
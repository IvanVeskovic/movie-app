import React, { useState, createContext } from 'react';

export const MovieContext = createContext();


export const MovieProvider = (props) => {
    const [myList, setMyList] = useState([]);

    const handleAddUniqueToMyList = (movie) => {
        if(!myList.some(el => el.id === movie.id)){
            setMyList([...myList, movie])
        }
    }


    return(
        <MovieContext.Provider value={[myList, setMyList, handleAddUniqueToMyList]}>
            {props.children}
        </MovieContext.Provider>
    );
}
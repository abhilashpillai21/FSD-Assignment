import React, { Fragment, useState, useEffect, useContext } from 'react';
import Header from '../header/Header';
import ComingSoon from './comingsoon/ComingSoon';
import { GlobalStateReducer } from '../../../src/common/reducers';
import { GlobalStateContext } from '../../../src/common/reducers';

export default function Home(props) {

    const loginContext = useContext(GlobalStateContext);
    
    useEffect(() => {
        
        fetch(props.baseUrl + 'movies?status=PUBLISHED').
            then(rawResults => rawResults.json()).
            then(results=>{
                loginContext.dispatch({type:"UNRELEASED_MOVIES", payload: results.movies});
            }).
            catch(error => console.log(error));
    }
        , [])

    return (
       
        //unreleasedMoviesList? 
       <Fragment>
            <Header {...props} />
            <ComingSoon {...props}/>
        </Fragment>//:""
    );
}

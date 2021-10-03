import React, { Fragment, useState, useEffect, useContext } from 'react';
import Header from '../../common/header/Header';
import Details from '../details/Details';
import ComingSoon from './comingsoon/ComingSoon';
import { GlobalStateReducer } from '../../../src/common/reducers';
import { GlobalStateContext } from '../../../src/common/reducers';
import './Home.css'
import ReleasedMovies from './releasedmovies/releasedmovies';
import Filter from './filter/Filter';


export default function Home(props) {
    const[response, setResponse] = useState({});

    const loginContext = useContext(GlobalStateContext);

    useEffect(() => {

        fetch(props.baseUrl + 'movies?status=RELEASED').
            then(rawResults => rawResults.json()).
            then(results => {
                loginContext.dispatch({ type: "RELEASED_MOVIES", payload: results.movies });
                setResponse(results);
                props.history.push({pathname:"/", state: results});
            }).
            catch(error => console.log(error));
        
            
        fetch(props.baseUrl + 'movies?status=PUBLISHED').
            then(rawResults => rawResults.json()).
            then(results => {
                loginContext.dispatch({ type: "UNRELEASED_MOVIES", payload: results.movies });
            }).
            catch(error => console.log(error));
    }
        , [])

    return (

        <Fragment>
            <Header {...props} />
            <ComingSoon {...props} />
            <div className="container">
                <div className="column-1 box">
                    <ReleasedMovies {...props} />
                </div>
                <div className="column-2 box">
                    <Filter {...props}/>
                </div>
            </div>
        </Fragment>
    );
}

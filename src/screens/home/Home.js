import { containerClasses } from '@mui/material';
import React, { Fragment, useState, useEffect } from 'react';
import Header from '../header/Header';
import ComingSoon from './comingsoon/ComingSoon';

export default function Home(props) {

    const [unreleasedMoviesList, setUnreleasedMoviesList] = useState([]);

    useEffect(() => {

        fetch(props.baseUrl + 'movies?status=PUBLISHED').
            then(rawResults => rawResults.json()).
            then(results => (props.history.push({
                pathname: '/',
                state: {
                    unreleasedMovies: results.movies,
                    loginStatus: false,
                    isMovieSelected: false,
                    "access-token": null
                }
            }))).
            catch(error => console.log(error));
    }
        , [])

    return (

        <Fragment>
            <Header {...props} />
            <ComingSoon unreleasedMoviesList={unreleasedMoviesList} {...props} />
        </Fragment>
    );
}
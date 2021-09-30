import React, { Fragment, useContext, useEffect, useState } from "react";

import { GlobalStateContext } from "../../../common/reducers";
import { ImageList, ImageListItem } from "@mui/material";
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { Link } from "react-router-dom";

export default function ReleasedMovies(props) {
    
    const loginContext = useContext(GlobalStateContext);
    const[response, setResponse] = useState({});

    useEffect(()=>{
        loginContext.dispatch({ type: "IS_MOVIE_SELECTED", payload: false });
    }, [])

    const OnSelectHandler = (event) => {
        loginContext.dispatch({ type: "MOVIE_SELECTED", payload: event.target.id });
        
        fetch(props.baseUrl + `movies/${event.target.id}`).
        then(rawResults => rawResults.json()).
        then(results => {
            props.history.push({pathname:"/details", state: results});
        }).catch(error => console.log(error));
    }
    {console.log("-->", loginContext.state.releasedMovies)}
    return (
        <Fragment>
            <ImageList variant='standard' cols={4} gap={10} >
                {   
                    loginContext.state.releasedMovies.map(movie => {
                        return (
                            <ImageListItem className="movie-img" sx={{ height: 350 }} key={movie.id}>
                                <img className="movie-img" 
                                    id={movie.id} src={movie.poster_url} onClick={OnSelectHandler} />
                                <ImageListItemBar
                                    title={movie.title}
                                    subtitle={`Release Date:${movie.release_date}`}
                                />
                            </ImageListItem>
                        )
                    })
                }
            </ImageList>
        </Fragment >
    );
}


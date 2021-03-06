import React, { Fragment, useContext, useEffect, useState } from "react";
import "./ComingSoon.css";
import Grid from "@material-ui/core/Grid";
import { GlobalStateContext } from "../../../common/reducers";
import { ImageList, ImageListItem } from "@mui/material";
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function ComingSoon(props) {

    const loginContext = useContext(GlobalStateContext);

    return (
        <Fragment>
            <div className="upcomingmovies-header">Upcoming Movies!</div>

            <ImageList variant='standard' cols={9} gap={10} >
                {
                    loginContext.state.unreleasedMovies.map(movie => {
                        return (
                            <ImageListItem sx={{ width: 300, height: 250 }} key={movie.id} >
                                <img src={movie.poster_url} />
                                <ImageListItemBar
                                    title={movie.title}
                                />
                            </ImageListItem>
                        )
                    })
                }
            </ImageList>
        </Fragment>
    );
}


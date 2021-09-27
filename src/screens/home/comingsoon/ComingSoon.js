import React, { Fragment, useEffect, useState } from "react";
import "./ComingSoon.css";
import Grid from "@material-ui/core/Grid";
import { ImageList, ImageListItem } from "@mui/material";

export default function ComingSoon(props) {


    return (
        <Fragment>
            {console.log("-=-=", props.location.state.unreleasedMovies)}
            <div className="upcomingmovies-header">Upcoming Movies!</div>
            <ImageList variant='standard' cols={10} gap={10} >
                {
                    props.location.state.unreleasedMovies.map(movie => {
                        return (<ImageListItem sx={{ width: 300, height: 250 }} item key={movie.id} onClick={()=>alert("Hi")}>
                            <img src={movie.poster_url} />
                        </ImageListItem>)
                    })
                }
            </ImageList>

        </Fragment>
    );
}


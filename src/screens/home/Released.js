import { Grid, ImageList, ImageListItem, imageListItemClasses } from "@mui/material";
import React from 'react';
import './Released.css';
import ReleasedMoviesList from "./ReleasedMovieList";

export default function Released() {

    return (
        <Grid container sx={{ width: "100%" }}>
            <Grid item sx={{ width: "76%", m: 2 }}>
                <ReleasedMoviesList/>
            </Grid>
            <Grid item sx={{ width: "24%", m: 2 }}>

            </Grid>
        </Grid>
    );
}


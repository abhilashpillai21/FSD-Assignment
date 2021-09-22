import React, { Fragment, useEffect, useState } from "react";
import "./Upcoming.css";
import Grid from "@material-ui/core/Grid";
import { ImageList, ImageListItem } from "@mui/material";
import { movieList } from "../../common/helper/fetchMovies";

const movieCount = 7;

export default function Home() {
    const[movieThumbnails, setMovieThumbnails] = useState([]);
    
    useEffect(()=>{
        movieList(movieCount);
    },[]);

    async function movieList(movieCount){
        const rawResults = await fetch(`http://localhost:8085/api/v1/movies?page=1&limit=${movieCount}`);
        const results = await rawResults.json();
        let thumbnails = [];
        
        try{
            if(rawResults.ok){
                results.movies.forEach(item=>{
                    thumbnails = [...thumbnails, item.poster_url];
                });        
            }
            else{
                
            }
        }
        catch(exception){
            alert(exception);
        }
        setMovieThumbnails(thumbnails);
    }

    return (
        <Fragment>
            <div className="home-header">Upcoming Movies!</div>
           
            {/* <Grid
                    id="movie-grid"
                    container spacing={8}
                    alignItems="center"
                    justifycontent="center"
                    direction="row"
                    wrap='nowrap'
                    spacing={30}
                >
                    {
                        movieThumbnails.map(element=>{
                           return <Grid item key={element}>
                               <img src={element}/>
                            </Grid>   
                        })
                    }    
                </Grid>   */}

                <ImageList variant='standard' cols={10}  gap={10} >
                {
                        movieThumbnails.map(element=>{
                           return (<ImageListItem sx={{width:300, height:250}} item key={element}>
                               <img src={element}/>
                            </ImageListItem> )  
                        })
                    }    
                </ImageList>
 



        </Fragment>
    );
}



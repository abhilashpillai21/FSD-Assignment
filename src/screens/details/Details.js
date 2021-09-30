import { useEffect, useContext } from "react";
import React from 'react';
import { GlobalStateContext } from "../../common/reducers";
import {Link} from 'react-router-dom';
import { Typography } from "@mui/material";
import './Details.css';
import TrailerVideo from "./trailervideo/TrailerVideo";
import Header from "../../common/header/Header";
import { Fragment } from "react";

export default function Details(props) {
    const loginContext = useContext(GlobalStateContext);
    
    const response = props.location.state;

    useEffect(()=>{
      loginContext.dispatch({type:"IS_MOVIE_SELECTED", payload: true});
    },[]);
    
    return (
      <Fragment>
        <Header {...props}/>
                <div className="container">
            <div className="left-container box">
                <Link to="/">
                    <Typography className="link-text" paragraph>&lt;Back to Home</Typography>
                </Link>
                <img src={response.poster_url} alt={response.title}/>
            </div>
            <div className="middle-container box">
              

               <Typography className="movie-title" variant='h2'>{response.title}</Typography>
               <Typography className="movie-genre"><strong>Genre:</strong> {response.genres.toString()}</Typography>
               <Typography className="movie-duration"><strong>Duration:</strong> {response.duration}</Typography>
               <Typography className="release-date"><strong>Release Date:</strong> {new Date(new Date(...(response.release_date.split("-")))).toDateString()}</Typography>
               <Typography className="critics-rating"><strong>Rating:</strong> {response.rating}</Typography>
               <Typography sx={{marginTop : "16px"}} className="movie-plot">(<a href={response.wiki_url}>Wiki Link</a>) {response.storyline}</Typography>
               <Typography className="movie-trailer">
                   <Typography sx={{marginTop : "16px"}} className="trailer-video-text"><strong>Trailer:</strong></Typography>
                    <TrailerVideo className="trailer-video" videoId={response.trailer_url.split('v=')[1]}/>
               </Typography>


            </div>
            <div className="right-container box">
                <h2>Column 2</h2>
                <p>Placeholder for findmovies form</p>
            </div>
        </div>
      </Fragment>

    );
}

//test data
const response1 = {
    "id": "00ae33e8-a235-11e8-9077-720006ceb890",
    "title": "The Revenant",
    "storyline": "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.",
    "genres": [
      "Drama",
      "Action",
      "Adventure"
    ],
    "duration": 156,
    "poster_url": "https://upload.wikimedia.org/wikipedia/en/b/b6/The_Revenant_2015_film_poster.jpg",
    "trailer_url": "https://www.youtube.com/watch?v=LoebZZ8K5N0",
    "wiki_url": "https://en.wikipedia.org/wiki/The_Revenant_(2015_film)",
    "release_date": "2015-12-16",
    "censor_board_rating": "UA",
    "rating": 8,
    "status": "RELEASED",
    "artists": [
      {
        "id": "24614e76-a238-11e8-9077-720006ceb890",
        "first_name": "Leonardo",
        "last_name": "DiCaprio",
        "role_type": "ACTOR",
        "profile_description": "Leonardo Wilhelm DiCaprio is an American actor and film producer. DiCaprio began his career by appearing in television commercials in the late 1980s. He next had recurring roles in various television series, such as the soap opera Santa Barbara and the sitcom Growing Pains. DiCaprios portrayals of Howard Hughes in The Aviator (2004) and Hugh Glass in The Revenant won him the Golden Globe Award for Best Actor – Motion Picture Drama. His performance as Jordan Belfort in The Wolf of Wall Street won him the Golden Globe award for Best Actor – Motion Picture Musical or Comedy. He also won the Academy Award for Best Actor and BAFTA Award for his performance in The Revenant. DiCaprio is the founder of his own production company, Appian Way Productions.",
        "profile_url": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Leonardo_DiCaprio_visited_Goddard_Saturday_to_discuss_Earth_science_with_Piers_Sellers_%2826105091624%29_cropped.jpg",
        "wiki_url": "https://en.wikipedia.org/wiki/Leonardo_DiCaprio"
      },
      {
        "id": "2461973c-a238-11e8-9077-720006ceb890",
        "first_name": "Tom",
        "last_name": "Hardy",
        "role_type": "ACTOR",
        "profile_description": "Edward Thomas Hardy is an English actor, producer, and former model. Hardy made his debut in the Ridley Scott film Black Hawk Down, and has since had notable roles in films such as Star Trek: Nemesis, RocknRolla, Bronson, Warrior, Tinker Tailor Soldier Spy, Lawless, Locke, The Drop, and The Revenant, for which he received a nomination for the Academy Award for Best Supporting Actor. In 2015, Hardy portrayed Mad Max Rockatansky in Mad Max: Fury Road and both Kray twins in Legend. He has also appeared in three Christopher Nolan films: Inception, as Bane in The Dark Knight Rises, and Dunkirk",
        "profile_url": "https://upload.wikimedia.org/wikipedia/commons/3/30/Tom_Hardy_Locke_Premiere.jpg",
        "wiki_url": "https://en.wikipedia.org/wiki/Tom_Hardy"
      }
    ]
  }
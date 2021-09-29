import { createContext } from 'react';

const globalState = {
    accesstoken: null,
    isMovieSelected:false,
    MovieSelected:"",
    loginStatus:false,
    unreleasedMovies: [],
    releasedMovies:[],
    shouldDisplayModal: false
}

export const GlobalStateReducer = (state=globalState, action)=>{
    switch(action.type){
        case "ACCESS_TOKEN":
            return({...state, accesstoken : action.payload});
        case "IS_MOVIE_SELECTED":
            return({...state, isMovieSelected : action.payload});
        case "MOVIE_SELECTED":
                return({...state, MovieSelected : action.payload});    
        case "LOGIN_STATUS":
            return({...state, loginStatus : action.payload});
        case "UNRELEASED_MOVIES":        
            return({...state, unreleasedMovies : action.payload});
        case "RELEASED_MOVIES":        
            return({...state, releasedMovies : action.payload});    
        case "DISPLAY_LOGIN_MODAL":
                return({...state, shouldDisplayModal: action.payload});    
        case "RESET":
            return state;    
        default:
            return state;  
    }
}

export const GlobalStateContext = createContext();

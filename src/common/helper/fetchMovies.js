

// import React from "react";
// import { createStore } from "redux";

// const initialState = {
//     body: []
// };

// async function movieList(movieCount){
//     const countParameter = movieCount? '&limit='+movieCount:""
//     const rawResults = await fetch(`http://localhost:8085/api/v1/movies?page=1`+ countParameter);
//     const results = await rawResults.json();
//     let thumbnails = [];
    
//     try{
//         if(rawResults.ok){
     
//         }   
//         else{
//             throw new Error();
//         }
//     }
//     catch(exception){
//         alert(exception);
//     }
    
// }



// export const RequestReducer = (state = initialState, action)=>{

//     switch(action.type){
//         case "GET_USER":
//             return state;
//         case "GET_MOVIES":

//             return state;
//         case "RESET":    
//             return initialState;
//         default:  
//             return state;
//     }
// }

// export default createStore(RequestReducer);


import React, { useReducer } from "react";
import Home from "../screens/home/Home";
//import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";
import { GlobalStateContext, GlobalStateReducer } from '../../src/common/reducers';

const Controller = () => {

    const baseUrl = "/api/v1/";

    const initialState = {
        accesstoken: null,
        isMovieSelected: false,
        MovieSelected: false,
        loginStatus: false,
        unreleasedMovies: [],
        releasedMovies: [],
        shouldDisplayModal: false
    };

    const [state, dispatch] = useReducer(GlobalStateReducer, initialState);

    return (

        <Router>
            <div className="main-container">
                <GlobalStateContext.Provider value={{ state: state, dispatch: dispatch }}>
                    <Route
                        exact
                        path="/"
                        render={(props) => <Home {...props} baseUrl={baseUrl} />}
                    />
                    <Route
                        path="/bookshow/:id"
                        render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
                    />
                </GlobalStateContext.Provider>

                {/* 
                    <Route
                        exact
                        path="/"
                        render={(props) => <Home {...props} baseUrl={baseUrl} />}
                    />
 

                    <Route
                        path="/confirm/:id"
                        render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
                    /> */}
            </div>
        </Router>

    );
};



export default Controller;
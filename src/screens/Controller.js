import React, { useReducer } from "react";
import Home from "../screens/home/Home";
//import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import BookShow from "../screens/bookshow/BookShow";
//import Confirmation from "../screens/confirmation/Confirmation";
import { ModalDisplayContext,  LoginStatusReducer} from "../common/reducers";

const Controller = () => {
    
    const baseUrl = "/api/v1/";

    const initialState = false;

    const [state, dispatch] = useReducer(LoginStatusReducer, initialState);

    return (
        
            <Router>
                <div className="main-container">
                 <ModalDisplayContext.Provider value={{ state: state, dispatch: dispatch }}>
                    <Route
                        exact
                        path="/"
                        render={(props) => <Home {...props} baseUrl={baseUrl} />}
                    />
                    </ModalDisplayContext.Provider>
                    {/* 
                    <Route
                        exact
                        path="/"
                        render={(props) => <Home {...props} baseUrl={baseUrl} />}
                    />
                    <Route
                        path="/movie/:id"
                        render={(props) => <Details {...props} baseUrl={baseUrl} />}
                    />
                    <Route
                        path="/bookshow/:id"
                        render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
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
import { createContext } from 'react';

export const LoginStatusReducer = (state={
    isLoggedIn: false
}, action)=>{
    switch(action.type){
        case "DISPLAY_LOGIN_MODAL":
            return({...state, shouldDisplay: action.payload});
        default:
            return state;
    }
};

export const ModalDisplayContext = createContext();

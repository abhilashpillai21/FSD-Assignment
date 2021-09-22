import './Login.css';
import '../../common/css/button.css'
import { DisplayModalContext } from '../../common/helper/context';
import React, { useState, useReducer, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { Button, Input, InputLabel, FormHelperText } from '@mui/material';
import { Box } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormControl from '@mui/material/FormControl';
import Grid from "@material-ui/core/Grid";
import validator from 'validator';
import { errorFlagReducer } from '../../common/helper/login-reducers';


//Error state maintained so that the sign in dialog doesnt not close when either the email or password is blank or incorrect format
//The dialog should only close when either the user clicks outside the modal or when both the email and password are submitted in correct format

const initialState = {
    emailflag: false,
    passwordflag: false,
    email: "",
    password: "",
    errorFlag: false,
};


// export const errorFlagReducer = (state, action) => {
//     switch (action.type) {
//         case "PasswordFlagReset":
//             return {...state, passwordflag: action.payload}
//         case "EmailFlagReset":
//             return {...state, emailflag: action.payload}
//         case "Password":
//             return {...state, password: action.payload}
//         case "Email":
//             return {...state, email: action.payload}  
//         case "ErrorTogglerReset":
//             return {...state, errorFlag: action.payload}   
//         case "Reset":
//             return initialState;
//         default:
//             return state;    
//     }
// }


export default function Login() {

    const { displayModal, setDisplayModal } = useContext(DisplayModalContext);
    const [tabIndex, setTabIndex] = useState(0);
    const [state, dispatch] = useReducer(errorFlagReducer, initialState);

    const HandleTabClick = (event, value) => setTabIndex(value);
    const closeModalHandler = () => {
        setDisplayModal(false);
    }
    const credentialsInputHandler = (event) => {
        dispatch({ type: event.target.name, payload: event.target.value });
    }

    useEffect(
        () => {
            console.log("useeffect", state.errorFlag);
        }

        , [state]);

    const handleSubmit = (event) => {
        if (!validateandReset())
            return;

    };


    function validateandReset() {
        const isValid = validate(state);

        if (isValid) {
            const { email, password } = state;
            dispatch({ type: "Reset" });
        }

        setDisplayModal(!isValid);
        dispatch({ type: "ErrorTogglerReset", payload: !(isValid) });

        return isValid;
    }

    const validate = (state) => {
        let newemail = state.email || "";
        let eflag = validator.isEmail(newemail);
        dispatch({ type: "EmailFlagReset", payload: eflag });

        const pflag = state.password ? true : false;
        dispatch({ type: "PasswordFlagReset", payload: pflag })

        return eflag && pflag;
    }


    //When first tab is clicked, log in tab appears

    const loginTabPanel =
        <TabPanel value={tabIndex} index={0}>
            <form className="sign-in-form" autoComplete="off" >
                <Grid container alignItems="center" justify="center" direction="column">
                    <br />
                    <Grid item>
                        <FormControl>
                            <InputLabel htmlFor="email">Username*</InputLabel>
                            <Input
                                id="email"
                                name="Email"
                                type="email"
                                value={state.email}
                                required
                                error={state.errorFlag}
                                onChange={credentialsInputHandler}

                            />
                            <FormHelperText id="email"> {state.errorFlag ? "Enter valid email id and password" : ""}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <br />
                    <Grid item>
                        <FormControl>
                            <InputLabel htmlFor="password">Password*</InputLabel>
                            <Input
                                id="password"
                                name="Password"
                                type="password"
                                value={state.password}
                                required
                                error={state.errorFlag}
                                onChange={credentialsInputHandler}

                            />
                            <FormHelperText id="password"> {state.errorFlag ? "Enter valid email id and password" : ""}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <br /><br />
                    <Grid item>
                        <Button variant="contained" color="primary" type="button" className="login-button" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </TabPanel>;

    //When first tab is clicked, register tab appears
    const registerTabPanel =
        <TabPanel value={tabIndex} index={1}>

        </TabPanel>

    //dialog box structure that will be contained in the modal
    const loginDialogBox =
        <Box>
            <Tabs value={tabIndex} onChange={HandleTabClick}>
                <Tab label="Login" />
                <Tab label="Register" />
            </Tabs>
            {loginTabPanel}
            {registerTabPanel}
        </Box>



    return (


        <Modal isOpen={displayModal} onRequestClose={closeModalHandler}
            shouldCloseOnOverlayClick={true} ariaHideApp={false} className="login-dialog">
            {displayModal && loginDialogBox}
        </Modal>
    );
}

function TabPanel(props) {
    const { index, value, children } = props;
    return (
        <div>
            {index === value && children}
        </div>
    );
}



                                 


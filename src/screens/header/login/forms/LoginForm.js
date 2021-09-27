

import Grid from "@material-ui/core/Grid";
import React, { useEffect, useContext, useState } from 'react';
import { Button, Input, InputLabel, FormHelperText, FormControl } from '@material-ui/core';
import { ModalDisplayContext } from "../../../../common/reducers";

export default function LoginForm(props){

    const loginContext = useContext(ModalDisplayContext);
    const[loginError, setLoginError] = useState(false);
    const[userCredentials, setUserCredentails] = useState({
        email:"",
        password:""
    })
    
    const handleSubmit= async ()=>{
  
        const authString = window.btoa(`${userCredentials.email}:${userCredentials.password}`);
        const rawResponse = await fetch(props.baseUrl+"auth/login", {
            method: "POST",            
            headers:{
                Accept:"application/json", 
                "Content-Type" : "application/json;charset=UTF-8",
                authorization: `Basic ${authString}`
            }
        });
        
        if(!rawResponse.ok){
            setLoginError(true);
        }
        else{
            setLoginError(false);
        }
        const accesstoken = rawResponse.headers.get("access-token");
    
        props.history.push({
            pathname: '/',
            state: {
                loginStatus : rawResponse.ok,
                "access-token": accesstoken
            }
        })
    }

    useEffect(()=>{
        console.log(props.location.state);
        if(props.location.state.loginStatus){
            loginContext.dispatch({type:"DISPLAY_LOGIN_MODAL", payload: false});
        }
        else{
            loginContext.dispatch({type:"DISPLAY_LOGIN_MODAL", payload: true});
        }

    },[props.location.state.loginStatus]);

    const handleInputChange=(event)=>{
        setUserCredentails(
            {
                ...userCredentials, [event.target.name] : event.target.value
            }
        )
    }

    return(
        <form className="sign-in-form" autoComplete="off" >
            <Grid container alignItems="center" justify="center" direction="column">
       
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="email">Username*</InputLabel>
                        <Input required name="email" type="email" onChange={handleInputChange}/>
                        <FormHelperText error={loginError}>{loginError&&"required"}</FormHelperText>
                    </FormControl>
                </Grid>
            
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="password">Password*</InputLabel>
                        <Input required name="password" type="password" onChange={handleInputChange}/>
                    </FormControl>
                    <FormHelperText  error={loginError} >{loginError&&"required"}</FormHelperText>
                </Grid>
            
                <Grid item>
                    <Button variant="contained" color="primary" type="button" className="login-button" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}



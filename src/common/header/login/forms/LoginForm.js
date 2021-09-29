import Grid from "@material-ui/core/Grid";
import React, { useEffect, useContext, useState } from 'react';
import { Button, Input, InputLabel, FormHelperText, FormControl } from '@material-ui/core';
import { GlobalStateContext } from "../../../../common/reducers";

export default function LoginForm(props){

    const loginContext = useContext(GlobalStateContext);
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
    
        loginContext.dispatch({type:"LOGIN_STATUS", payload: rawResponse.ok});
        loginContext.dispatch({type:"ACCESS_TOKEN", payload: accesstoken});

        // props.history.push('/');
    }

    useEffect(()=>{
        if(loginContext.state.loginStatus){
            loginContext.dispatch({type:"DISPLAY_LOGIN_MODAL", payload: false});
        }
        else{
            loginContext.dispatch({type:"DISPLAY_LOGIN_MODAL", payload: true});
        }

    },[loginContext.state.loginStatus]);

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



import validator from "validator";
import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from 'react';
import { Button, Input, InputLabel, FormHelperText, FormControl, Typography } from '@material-ui/core';
import { chainPropTypes } from "@mui/utils";

const initialState = {
    "email_address": "",
    "first_name": "",
    "last_name": "",
    "mobile_number": "",
    "password": ""
}

export default function RegisterForm(props) {
    const [registrationStatus, setRegistrationStatus] = useState("");
    const [requestBody, setRequestBody] = useState(initialState);
    const [isError, setIsError] = useState(false);


    const handleSubmit = () => {
        
        let errorFlag = false;
        Object.keys(requestBody).forEach(key => {
            if (!requestBody[key]) {
                errorFlag=true;
                console.log("blank Values");
            }
            else if (key === "email_address") {
                if (!validator.isEmail(requestBody[key])) {
                    errorFlag=true;
                    console.log("invalid email");
                } 
            }  
            else if (key ===  "mobile_number")  {
                const re = /^[0-9\b]+$/;
                if(requestBody[key] === '' || re.test(requestBody[key])){
                    console.log("invalid mobile no");
                    errorFlag=true;
                }
            }
        });
        
        // const rawResponse = await fetch(props.baseUrl+"signup", {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json;charset=UTF-8",
        //     },
        //     body: JSON.stringify(requestBody)
        // });
        if(!errorFlag){
            console.log(errorFlag, "++++++++");
            fetch(props.baseUrl + "signup", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(requestBody)
            }).then(rawResponse => {
                const message = rawResponse.ok ? "Registration Successful. Please Login!" : "Invalid entries or existing user.";
                console.log(rawResponse, message);
                setRegistrationStatus(message);
                setRequestBody(initialState);
            })
        }
        else{
            const message = "Check for valid data";
            setRegistrationStatus(message);
        }
        setIsError(errorFlag);
    }

    const handleInputChange = (event) => {
        setRequestBody({
            ...requestBody,
            [event.target.name]: event.target.value
        })

    }

    return (
        <form className="registration-form" autoComplete="off" >
            <Grid container alignItems="center" justify="center" direction="column">

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="first_name">First Name*</InputLabel>
                        <Input value={requestBody.first_name} required id="first_name" name="first_name" type="text" onChange={handleInputChange} />
                        <FormHelperText error>{isError ? "required" : null}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="last_name">Last Name*</InputLabel>
                        <Input value={requestBody.last_name} required id="last_name" name="last_name" type="text" onChange={handleInputChange} />
                        <FormHelperText error>{isError ? "required" : null}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="email_address">Email*</InputLabel>
                        <Input value={requestBody.email_address} required id="email_address" name="email_address" type="email" onChange={handleInputChange} />
                        <FormHelperText error>{isError ? "required" : null
                        }</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="password">Password*</InputLabel>
                        <Input required value={requestBody.password} id="password" name="password" type="password" onChange={handleInputChange} />
                        <FormHelperText error>{isError ? "required" : null}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="mobile_number">Contact No*</InputLabel>
                        <Input required value={requestBody.mobile_number} id="mobile_number" name="mobile_number" type="text" onChange={handleInputChange} />
                        <FormHelperText error>{isError ? "required" : null}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item>
                    {registrationStatus ? <Typography><br />{registrationStatus}<br /><br /></Typography> : null}
                    <Button variant="contained" color="primary" type="button" className="registration-button" onClick={handleSubmit}>
                        Register
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
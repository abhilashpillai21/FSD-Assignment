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
    const [isBlank, setIsBlank] = useState(false);
    const [isFieldError, setFieldError] = useState({
        "mobile_number": false,
        "password": false
    });

    function validateData(){
        let flag = false;
        if(isBlank)
            flag=true;
        Object.keys(isFieldError).forEach(errorFlag=>{
            flag=isFieldError[errorFlag]?flag=true:flag;
        })
        const emailFlag = validateEmail(); 
        return emailFlag && flag;
    }

    const handleSubmit = () => {
        
        let isDataInvalid = validateData();
        
        // const rawResponse = await fetch(props.baseUrl+"signup", {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json;charset=UTF-8",
        //     },
        //     body: JSON.stringify(requestBody)
        // });
        if(!isDataInvalid){
            console.log(isDataInvalid);
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
        
    }

    const handleInputChange = (event) => {
        setRequestBody({
            ...requestBody,
            [event.target.name]: event.target.value
        })
        
        validateMobile(event);
    }

    return (
        <form className="registration-form" autoComplete="off" >
            <Grid container alignItems="center" justify="center" direction="column">

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="first_name">First Name*</InputLabel>
                        <Input value={requestBody.first_name} required id="first_name" name="first_name" type="text" onChange={handleInputChange} />
                        <FormHelperText error>{isBlank ? "required" : null}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="last_name">Last Name*</InputLabel>
                        <Input value={requestBody.last_name} required id="last_name" name="last_name" type="text" onChange={handleInputChange} />
                        <FormHelperText error>{isBlank ? "required" : null}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="email_address">Email*</InputLabel>
                        <Input value={requestBody.email_address} required id="email_address" name="email_address" type="email" onChange={handleInputChange} />
                        <FormHelperText error>{isFieldError.email_address?"Invalid email address":""||isBlank ? "required" : null
                        }</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="password">Password*</InputLabel>
                        <Input required value={requestBody.password} id="password" name="password" type="password" onChange={handleInputChange} />
                        <FormHelperText error>{isBlank ? "required" : null}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="mobile_number">Contact No*</InputLabel>
                        <Input required value={requestBody.mobile_number} id="mobile_number" name="mobile_number" type="text" onChange={handleInputChange} />
                        <FormHelperText error>{isFieldError.mobile_number?"Invalid mobile number":"" || isBlank ? "required" : null}</FormHelperText>
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



    function validateMobile(event) {
        if (event.target.name === "mobile_number") {
            const re = /^[0-9\b]+$/;
            if (!(event.target.value === '' || re.test(event.target.value))) {
                setFieldError({
                    ...isFieldError,
                    mobile_number : true
                });
                setIsBlank(true);
            }
        }
    }

    function validateEmail(){
        let flag = false;
        Object.keys(requestBody).forEach(key => {
            if (!requestBody[key]) {
                setIsBlank(true);
                flag = true;
            }
            else if (key === "email_address") {
                if (!validator.isEmail(requestBody[key])) {
                    setFieldError({
                        ...isFieldError,
                        email_address: true
                    })

                    flag = true;
                } 
            }  
        });
        return flag;
    }

}




import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from 'react';
import { Button, Input, InputLabel, FormHelperText, FormControl, Typography } from '@material-ui/core';

const initialState = {
    "email_address": "",
    "first_name": "",
    "last_name": "",
    "mobile_number": "",
    "password": ""
}

export default function RegisterForm(props) {
    const [registrationStatus, setRegistrationStatus] = useState("none");
    const [requestBody, setRequestBody] = useState(initialState);
    const [blankFields, setBlankFields] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(()=>{console.log("====>",blankFields);},[blankFields])

    const handleSubmit = async () => {

        const rawResponse = await fetch(props.baseUrl+"signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(requestBody)
        });

        const message = rawResponse.ok ? "Registration Successful. Please Login!":"Invalid entries or existing user.";
        setIsError(!rawResponse.ok);
        setRegistrationStatus(message);
        setRequestBody(initialState);
    }

    const handleInputChange = (event) => {
        setRequestBody({
            ...requestBody,
            [event.target.name]: event.target.value
        });
    }

    return (
        <form className="registration-form" autoComplete="off" >
            <Grid container alignItems="center" justify="center" direction="column">

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="first_name">First Name*</InputLabel>
                        <Input value={requestBody.first_name} required id="first_name" name="first_name" type="text" onChange={handleInputChange} />
                        <FormHelperText error>{isError?"required":null}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="last_name">Last Name*</InputLabel>
                        <Input value={requestBody.last_name} required id="last_name" name="last_name" type="text" onChange={handleInputChange} />
                        <FormHelperText error>{isError?"required":null}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="email_address">Email*</InputLabel>
                        <Input value={requestBody.email_address} required id="email_address" name="email_address" type="email" onChange={handleInputChange} />
                        <FormHelperText error>{isError?"required":null}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="password">Password*</InputLabel>
                        <Input required value={requestBody.password} id="password" name="password" type="password" onChange={handleInputChange} />
                        <FormHelperText error>{isError?"required":null}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="mobile_number">Contact No*</InputLabel>
                        <Input required value={requestBody.mobile_number} id="mobile_number" name="mobile_number" type="text" onChange={handleInputChange} />
                        <FormHelperText error>{isError?"required":null}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item>
                    {registrationStatus!="none" ? <Typography><br/>{registrationStatus}<br/><br/></Typography>:null}
                    <Button variant="contained" color="primary" type="button" className="registration-button" onClick={handleSubmit}>
                        Register
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
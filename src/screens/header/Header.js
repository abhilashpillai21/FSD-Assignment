import { Button, Grid } from '@material-ui/core';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Box } from '@mui/system';
import './Header.css';
import Logo from '../../assets/logo.svg'
import LoginDialog from './login/LoginDialog';
import { ModalDisplayContext } from '../../common/reducers';

export default function Header(props) {

    const loginContext = useContext(ModalDisplayContext);
    const bookShowHandler = event => {

    }

    const loginHandler = event => {
        loginContext.dispatch({ type: "DISPLAY_LOGIN_MODAL", payload: true });
    }

    return (
        <Box className="header" sx={{ flexGrow: "1" }}>
            <Grid container >
                <Grid item xs={1}>
                    <img className="logo" src={Logo} />
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={1} style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant='contained' color="primary" onClick={bookShowHandler} >Book Show</Button>
                </Grid>
                <Grid item xs={1} style={{ display: "flex", justifyContent: "center" }}>
                    {props.location.state.loginStatus ?
                        <Button id="login-button" variant='contained' onClick={loginHandler}>Logout</Button> :
                        <Button id="logout-button" variant='contained' onClick={loginHandler}>Login</Button>}
                </Grid>
            </Grid>

            <LoginDialog {...props} />

        </Box>
    );
}
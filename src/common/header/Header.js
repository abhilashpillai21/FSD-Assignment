import Logo from '../../assets/logo.svg'
import './Header.css';
import '../css/button.css'
import { DisplayModalContext } from '../helper/context';
import Login from '../../screens/Dialogs/Login';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function TabPanel(props) {
    const { index, value, children } = props;
    return (
        <div>
            {index === value && children}
        </div>
    );
}

export default function Header(props) {
    const [isLoggedIn, setLoginStatus] = useState(true);
    const [buttonName, setButtonName] = useState("Login");
    const [displayBookShow, setDisplayBookShow] = useState(false);
    const [displayModal, setDisplayModal] = useState(false)

    useEffect(
        () => {
            if (isLoggedIn) {
                setButtonName("Logout");
                setDisplayBookShow(true);
            }
            else {
                setButtonName("Login");
            }

        }, [isLoggedIn]
    )

    const openModalHandler = () => {

        if (!isLoggedIn) {
            setDisplayModal(true);
        }
    }

    const bookShowHandler = () => {
        // need logic
        if (!isLoggedIn) {
            setDisplayModal(true);
        }
        else {
            setDisplayModal(false);
        }
    }

    return (
        <div className="header">
            <span className="image-container">
                <img src={Logo} className="header-logo" alt="logo" />
            </span>
            <span className="button-container">

                {
                    displayBookShow ?
                    <Link to={`/bookshow/:id}`}><Button className="header-button"
                            variant="contained"
                            onClick={bookShowHandler}>Book Show</Button> </Link> : ""
                }

                <Button className="header-button"
                    variant="contained"
                    align="left"
                    onClick={openModalHandler}>{buttonName}</Button>
            </span>

            <DisplayModalContext.Provider value={{ displayModal, setDisplayModal }}>
                <Login />
            </DisplayModalContext.Provider>
        </div>
    );
}
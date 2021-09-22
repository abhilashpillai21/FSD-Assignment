import React, { Fragment, useState, useEffect } from 'react';
import Logo from '../../assets/logo.svg'
import './Header.css';
import Login from '../../screens/Dialogs/Login';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import {DisplayModalContext} from '../helper/context';
{/*import Modal from 'react-modal';
import Login from '../../screens/Dialogs/Login';
 import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormControl from '@mui/material/FormControl';
import { Input, InputLabel } from '@mui/material';*/}


export default function Header(props) {
    const [isLoggedIn, setLoginStatus] = useState(false);
    const [buttonName, setButtonName] = useState("Login");
    const [displayBookShow, setDisplayBookShow] = useState(false);
    const [displayModal, setDisplayModal] = useState(false)

    {/* //DELETE
    const [displayModal, setDisplayModal] = useState(false)
   const [tabIndex, setTabIndex] = useState(0);
 const [credentials, setCredentials] = useState({
      username: "",
      password: ""
     });
    */}

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
            console.log("-->", isLoggedIn);
            setDisplayModal(true);
            console.log("==>", displayModal);
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

    {/* const credentialsInputHandler = (event) => {
       setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
     }

    const HandleTabClick = (event, value) => setTabIndex(value);

     const closeModalHandler = () => {
         setDisplayModal(false);
    }
    */}
    return (

        <Fragment>
            <div className="header">
                <span className="image-container">
                    <img src={Logo} className="header-logo" alt="logo" />
                </span>
                <span className="button-container">
                    {/**This is the Bookshow button */}
                    {
                        displayBookShow ?
                            <Button className="header-button"
                                variant="contained"
                                color="primary"
                                onClick={bookShowHandler}>Book Show</Button> : ""
                    }
                    {/**This is the Login and Logout button */}
                    <Button className="header-button"
                        variant="contained" align="left"
                        onClick={openModalHandler}>{buttonName}</Button>
                </span>
                
                <DisplayModalContext.Provider value={displayModal, setDisplayModal}>
                    <Login/>
                </DisplayModalContext.Provider>    
                
               {/* {displayModal ? <Login /> : console.log("test-->", displayModal)} */}




                {/* 
                <Modal isOpen={displayModal} onRequestClose={closeModalHandler}
                    shouldCloseOnOverlayClick={true} ariaHideApp={false} className="login-dialog">
                    <Tabs value={tabIndex} onChange={HandleTabClick}>
                        <Tab label="Login"/>
                        <Tab label="Register" />
                    </Tabs>
                    <TabPanel value={tabIndex} index={0}>       
                    <br/><br/>              
                        <FormControl>
                            
                            <InputLabel htmlFor="username">Username*</InputLabel>
                            <Input id="username" aria-describedby="my-helper-text" /><br/><br/>
 
                        </FormControl>
                        <br/><br/>
                        <FormControl>
                            

                            <InputLabel htmlFor="password">Password*</InputLabel>
                            <Input id="password" aria-describedby="my-helper-text" /> 
                        </FormControl>
                        <br/><br/><br/><br/>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>xtem-2</TabPanel>
                </Modal> */}

            </div>
        </Fragment>
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
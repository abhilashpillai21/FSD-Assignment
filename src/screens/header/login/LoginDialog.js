import Modal from 'react-modal';
import React, { useState, useContext, useEffect } from 'react';
import { GlobalStateContext } from '../../../common/reducers';
import "./LoginDialog.css";
import { Box } from '@mui/system';
import { Tabs, Tab, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };

}


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


export default function LoginDialog(props) {

    const [value, setValue] = React.useState(0);
    const loginContext = useContext(GlobalStateContext);

    const closeModalHandler = () => {
        loginContext.dispatch({type:"DISPLAY_LOGIN_MODAL", payload: false});
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Modal isOpen={loginContext.state.shouldDisplayModal} onRequestClose={closeModalHandler}
                shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true} ariaHideApp={false} className="login-dialog">

                <Box>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Login" {...a11yProps(0)} />
                        <Tab label="Register" {...a11yProps(1)} />
                    </Tabs>
                    <div> 
                        <TabPanel value={value} index={0} >
                            <LoginForm {...props}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                           <RegisterForm {...props}/>
                        </TabPanel>
                    </div>
                </Box>
            </Modal>
        </div>
    );

}

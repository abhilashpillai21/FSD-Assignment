import React, { Fragment, useEffect } from 'react';
import Header from '../header/Header';

export default function Home(props){

    useEffect(()=>{
        console.log(props);
        props.history.replace({
            pathname: '/',
            state: {
                loginStatus : false,
                "access-token" : null
            }
        })
    }
    ,[])

    return(
        
        <Fragment>
            <Header {...props}/>
        </Fragment>
    );
}
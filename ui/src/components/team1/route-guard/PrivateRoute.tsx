import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { NoMatch } from '../noMatch/NoMatch';

interface Props extends RouteProps{
    role : string,
    outlet : JSX.Element
}

const PrivateRoute = ({role, outlet, ...rest} : Props) => {
    if(role==="admin"){
        console.log(role);
        
        return outlet
    }
    return <h1>Please Log in !</h1>
};

export default PrivateRoute;
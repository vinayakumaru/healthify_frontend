import React from 'react';
import { getUserType } from '../services/auth';
import { Navigate } from 'react-router-dom';

const RestrictedRoute = (props) => {
    return (
        getUserType() === 'doctor' ? <Navigate to={"/doctorHome"}/> : getUserType() === 'user' ?  <Navigate to={"/home"}/> : props.children
    );
};

export default RestrictedRoute;
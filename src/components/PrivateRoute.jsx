import React from 'react';
import { getUserType } from '../services/auth';
import PageNotFound from '../pages/PageNotFound';

const PrivateRoute = (props) => {
    return (getUserType() === 'user' ? props.children : <PageNotFound/>);
};

export default PrivateRoute;
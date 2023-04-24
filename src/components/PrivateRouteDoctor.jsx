import React from 'react';
import { getUserType } from '../services/auth';
import PageNotFound from '../pages/PageNotFound';

const PrivateRouteDoctor = (props) => {
    return (getUserType() === 'doctor' ? props.children : <PageNotFound/>);
};

export default PrivateRouteDoctor;
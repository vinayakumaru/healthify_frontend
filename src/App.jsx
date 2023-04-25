import * as React from 'react';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import BookAppointment from './pages/BookAppointment.jsx';
import History from './pages/History.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PrivateRouteDoctor from './components/PrivateRouteDoctor.jsx';
import RestrictedRoute from './components/RestrictedRoute.jsx';
import DoctorViewAppointment from './pages/DoctorViewAppointment.jsx';
import DoctorHome from './pages/DoctorHome.jsx';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<RestrictedRoute><Login /></RestrictedRoute>} />
            <Route path="/signup" element={<RestrictedRoute><SignUp /></RestrictedRoute>} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/bookAppointment" element={<PrivateRoute><BookAppointment/></PrivateRoute>} />
            <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
            <Route path="/doctorHome" element={<PrivateRouteDoctor><DoctorHome /></PrivateRouteDoctor>} />
            <Route path="/doctor/appointment/:id" element={<PrivateRouteDoctor><DoctorViewAppointment /></PrivateRouteDoctor>} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}
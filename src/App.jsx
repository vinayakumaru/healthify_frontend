import * as React from 'react';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import BookAppointment from './pages/BookAppointment.jsx';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bookAppointment" element={<BookAppointment/>} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}
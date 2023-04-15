import * as React from 'react';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import { Route, Routes } from 'react-router-dom';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
}
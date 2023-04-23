import React from "react";
import pageNotFound from '../assets/pageNotFound.jpg';
import { Box } from "@mui/material";

export default function PageNotFound() {
    return (
        <Box
            sx={{
                backgroundImage: `url(${pageNotFound})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                height: '85vh',
                width: '85vw',
                margin: 'auto',
            }}
        />
    );
}
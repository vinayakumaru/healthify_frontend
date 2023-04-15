import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import addNewUser from "../utils/firebase.js";

export default function BasicButtons() {
    return (
        <Stack spacing={2} direction="row">
            <Button variant="text" onClick={addNewUser}>Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
        </Stack>
    );
}
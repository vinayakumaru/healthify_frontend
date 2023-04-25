import * as React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { getUserId } from '../services/auth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AlertDialog from '../components/AlertDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import extractDate from '../utils/extractDate';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function DoctorHome() {

    const [appointments, setAppointments] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [deleteAppointmentId, setDeleteAppointmentId] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        const requestUrl = 'http://localhost:8082/appointment/doctor/' + getUserId();
        axios.get(requestUrl)
            .then((response) => {
                setAppointments(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleClick = (appointmentId) => {
        axios.delete(`http://localhost:8082/appointment/delete/${appointmentId}`)
            .then((_) => {
                const newAppointments = appointments.filter((appointment) => {
                    return appointment.appointmentId !== appointmentId;
                });
                setAppointments(newAppointments);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <AlertDialog
                open={open}
                title="Cancel Appointment"
                message="Are you sure you want to cancel this appointment?"
                onNo={() => {
                    setOpen(false);
                }}
                onYes={() => {
                    setOpen(false);
                    handleClick(deleteAppointmentId);
                }}
            />
            <Navbar />
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    p: 3,
                    marginTop: 8,
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h4" component="div" sx={{ marginBottom: 3 }}> Appointments </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead
                            sx={{ backgroundColor: '#5399DE' }}
                        >
                            <TableRow>
                                <TableCell>Patient Name</TableCell>
                                <TableCell align="right">Age</TableCell>
                                <TableCell align="right">date</TableCell>
                                <TableCell align="right">view</TableCell>
                                <TableCell align="right">Cancel</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments.filter((appointment) => {
                                return appointment.status === 'pending';
                            }).map((appointment) => (
                                <TableRow
                                    key={appointment.appointmentId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{appointment.userName}</TableCell>
                                    <TableCell align="right">{appointment.userAge}</TableCell>
                                    <TableCell align="right">{extractDate(appointment.date)}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#C6DDF4',
                                                },
                                            }}
                                            color="primary"
                                            onClick={() => {
                                                navigate(`/doctor/appointment/${appointment.appointmentId}`);
                                            }}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color="error"
                                            onClick={() => {
                                                setDeleteAppointmentId(appointment.appointmentId);
                                                setOpen(true);
                                            }}
                                        >
                                            <HighlightOffIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

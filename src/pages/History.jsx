import * as React from 'react';
import NavDrawer from '../components/NavDrawer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { getUserId } from '../services/auth';
import { Box, Divider, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AlertDialog from '../components/AlertDialog';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PrescriptionDialog from '../components/PrescriptionDialog';

export default function History() {

    const [appointments, setAppointments] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [deleteAppointmentId, setDeleteAppointmentId] = React.useState('');
    const [openDialog, setOpenDialog] = React.useState(false);
    const [appointmentId, setAppointmentId] = React.useState('');


    React.useEffect(() => {
        const requestUrl = 'http://localhost:8082/appointment/user/' + getUserId();
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

    const extractDate = (dateString) => {
        const dateParts = dateString.split(" ");
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const year = dateParts[5];
        const month = monthNames.indexOf(dateParts[1]) + 1;
        const day = dateParts[2];
        const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        return formattedDate;
    }

    return (
        <NavDrawer>
            <PrescriptionDialog open={openDialog} setOpen={setOpenDialog} appointmentId={appointmentId}/>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    '::-webkit-scrollbar': {
                        width: '0.5em',
                    },
                    '::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                        borderRadius: '1em',
                    },
                }}
            >
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
                <Typography variant="h5" gutterBottom component="div"> Pending Appointments </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead
                            sx={{ backgroundColor: '#5399DE' }}
                        >
                            <TableRow>
                                <TableCell>Hospital</TableCell>
                                <TableCell align="right">Doctor</TableCell>
                                <TableCell align="right">Location</TableCell>
                                <TableCell align="right">Date</TableCell>
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
                                    <TableCell component="th" scope="row">{appointment.hospitalName}</TableCell>
                                    <TableCell align="right">{appointment.doctorName}</TableCell>
                                    <TableCell align="right">{appointment.hospitalLocation}</TableCell>
                                    <TableCell align="right">{extractDate(appointment.date)}</TableCell>
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
                <Divider sx={{ my: 3 }} />
                <Typography variant="h5" gutterBottom component="div"> Previous Appointments </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead
                            sx={{ backgroundColor: '#5399DE' }}
                        >
                            <TableRow>
                                <TableCell>Hospital</TableCell>
                                <TableCell align="right">Doctor</TableCell>
                                <TableCell align="right">Location</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments.filter((appointment) => {
                                return appointment.status !== 'pending';
                            }).map((appointment) => (
                                <TableRow
                                    key={appointment.appointmentId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{appointment.hospitalName}</TableCell>
                                    <TableCell align="right">{appointment.doctorName}</TableCell>
                                    <TableCell align="right">{appointment.hospitalLocation}</TableCell>
                                    <TableCell align="right">{extractDate(appointment.date)}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color='primary'
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#C6DDF4',
                                                },
                                            }}
                                            onClick={() => {
                                                setAppointmentId(appointment.appointmentId);
                                                setOpenDialog(true);
                                            }}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </NavDrawer>
    );
}

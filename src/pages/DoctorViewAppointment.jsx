import * as React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import extractDate from '../utils/extractDate';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Message from '../components/Message';
import PrescriptionDialog from '../components/PrescriptionDialog';

export default function DoctorViewAppointment() {

    const { id } = useParams();
    const [appointments, setAppointments] = React.useState([]);
    const [medicines, setMedicines] = React.useState([]);
    const [selectedMedicine, setSelectedMedicine] = React.useState('');
    const [timing, setTiming] = React.useState('');
    const [medicineList, setMedicineList] = React.useState([]);
    const [description,setDescription] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [severity, setSeverity] = React.useState('success');
    const [openMedicine, setOpenMedicine] = React.useState(true);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [appointmentId, setAppointmentId] = React.useState('');

    React.useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = () => {
        axios.get(`http://localhost:8082/appointment/${id}`)
            .then((response) => {
                if(response.data.status !== 'pending'){
                    setOpenMedicine(false);
                }
                axios.get(`http://localhost:8082/appointment/user/${response.data.userId}`)
                    .then((response) => {
                        setAppointments(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    React.useEffect(() => {
        axios.get(`http://localhost:8082/medicine/all`)
            .then((response) => {
                setMedicines(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleClick = () => {
        if(description === ''){
            setMessage('Please add Description');
            setSeverity('error');
            setOpen(true);
            return;
        }

        const prescribedMedicines = medicineList.map((medicine) => {
            return {
                medicineId: medicine.medicine.medicineId,
                medicineName: medicine.medicine.medicineName,
                intake: medicine.timing,
            }
        });
        const prescription = {
            appointmentId: id,
            description: description,
            prescribedMedicines: prescribedMedicines,
        }


        axios.post(`http://localhost:8082/prescription/add`, prescription)
            .then((_) => {
                setMessage('Prescription added successfully');
                setSeverity('success');
                setOpen(true);
                setOpenMedicine(false);
                fetchData();
            })
            .catch((_) => {
                setMessage('Failed to add prescription');
                setSeverity('error');
                setOpen(true);
            });
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Message open={open} setOpen={setOpen} message={message} severity={severity}/>
            <PrescriptionDialog open={openDialog} setOpen={setOpenDialog} appointmentId={appointmentId}/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 8,
                }}
            >
                <Box
                    sx={{
                        padding: 2,
                        flexGrow: openMedicine ? 0 : 1,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <TableContainer component={Paper}
                        elevation={2}
                        sx={{
                            width: '800px',
                            borderRadius: '10px',
                        }}
                    >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead
                                sx={{ backgroundColor: '#5399DE' }}
                            >
                                <TableRow>
                                    <TableCell>Hospital</TableCell>
                                    <TableCell align="right">Doctor</TableCell>
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
                <Box
                    sx={{
                        flexGrow: 1,
                        padding: 2,
                        display: openMedicine ? 'flex' : 'none',
                        justifyContent: 'center',
                    }}
                >
                    <Paper
                        elevation={15}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '400px',
                            borderRadius: '25px',
                            height: '550px',

                        }}
                    >
                        <Typography variant="h5" sx={{ marginTop: "20px", marginBottom: "5px" }}> Prescription </Typography>
                        <Typography variant='h6' sx={{
                            fontSize: '15px',
                            color: 'grey',
                        }}>Select Medicine</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 3
                        }}>
                            <Autocomplete
                                size='small'
                                disablePortal
                                id="combo-box-demo"
                                getOptionLabel={(option) => option.medicineName}
                                options={medicines}
                                sx={{ width: 200 }}
                                renderInput={(params) => <TextField {...params} label="Medicine" />}
                                onChange={(_, value,reason) => {
                                    if(reason === 'clear') setSelectedMedicine('');
                                    setSelectedMedicine(value);
                                }}
                                isOptionEqualToValue={(option, value) => option.medicineId === value.medicineId}
                            />
                            <FormControl
                                size='small'
                                sx={{ marginLeft: '1px', minWidth: 120 }}
                            >
                                <InputLabel id="demo-simple-select-standard-label">Timing</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={timing}
                                    onChange={(event) => {
                                        setTiming(event.target.value);
                                    }}
                                    label="Timing"
                                >
                                    <MenuItem value={"1-0-0"}>1-0-0</MenuItem>
                                    <MenuItem value={"1-1-0"}>1-1-0</MenuItem>
                                    <MenuItem value={"1-0-1"}>1-0-1</MenuItem>
                                    <MenuItem value={"0-1-1"}>0-1-1</MenuItem>
                                    <MenuItem value={"0-1-0"}>0-1-0</MenuItem>
                                    <MenuItem value={"0-0-1"}>0-0-1</MenuItem>
                                    <MenuItem value={"1-1-1"}>1-1-1</MenuItem>
                                </Select>
                            </FormControl>
                            <IconButton
                                color='primary'
                                onClick={
                                    () => {
                                        if (selectedMedicine !== '' && timing !== '') {
                                            if (medicineList.find((medicine) => (medicine.medicine.medicineId === selectedMedicine.medicineId)) === undefined) {
                                                setMedicineList([...medicineList, { medicine: selectedMedicine, timing: timing }]);
                                            }
                                        }
                                    }
                                }
                            >
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                minWidth: '350px',
                                marginTop: 3,
                            }}
                        >
                            <List dense={true}>
                                <ListItem>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}
                                    >
                                        <Typography variant='h6' sx={{
                                            fontSize: '15px',
                                        }}>Medicine</Typography>
                                        <Typography variant='h6' sx={{
                                            fontSize: '15px',
                                        }}>Timing</Typography>
                                    </Box>
                                </ListItem>
                                {medicineList.map((medicine) => {
                                    return (
                                        <ListItem key={medicine.medicine.medicineId}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    width: '100%',
                                                }}
                                            >
                                                <Typography variant='h6' sx={{
                                                    fontSize: '15px',
                                                    color: 'grey',
                                                }}>{medicine.medicine.medicineName}</Typography>
                                                <Typography variant='h6' sx={{
                                                    fontSize: '15px',
                                                    color: 'grey',
                                                }}>{medicine.timing}</Typography>
                                            </Box>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Box>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Description"
                            multiline
                            maxRows={3}
                            sx={{
                                marginTop: 'auto',
                                marginBottom: 1,
                                width: '80%',
                            }}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            value={description}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                width: '200px',
                                borderRadius: '25px',
                                marginBottom: 1
                            }}
                            onClick={handleClick}
                        >
                            Add Prescription
                        </Button>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}

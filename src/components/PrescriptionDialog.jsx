import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DialogTitle } from '@mui/material';


export default function PrescriptionDialog({ open, setOpen, appointmentId }) {

    const [prescription, setPrescription] = React.useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if (appointmentId === '') return;
        const requestUrl = 'http://localhost:8082/prescription/appointment/' + appointmentId;
        axios.get(requestUrl)
            .then((response) => {
                setPrescription(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [appointmentId]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>
                <Typography variant='h6'
                    sx={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >Prescription</Typography>
            </DialogTitle>
            <DialogContent>
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
                        {prescription?.prescribedMedicines.map((medicine) => {
                            return (
                                <ListItem key={medicine.medicineId}>
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
                                        }}>{medicine.medicineName}</Typography>
                                        <Typography variant='h6' sx={{
                                            fontSize: '15px',
                                            color: 'grey',
                                        }}>{medicine.intake}</Typography>
                                    </Box>
                                </ListItem>
                            );
                        })}
                    </List>
                    <Typography variant='h6'
                        sx={{
                            fontSize: '15px',
                            marginTop: 3,
                            marginLeft: 2,
                        }}
                    >Description:</Typography>
                    <Typography variant='h6'
                        sx={{
                            fontSize: '15px',
                            color: 'grey',
                            marginLeft: 2,
                        }}
                    >{prescription?.description}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
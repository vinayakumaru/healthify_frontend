import * as React from 'react';
import NavDrawer from '../components/NavDrawer';
import Search from '../components/Search';
import { Box, Divider } from '@mui/material';
import axios from 'axios';

export default function BookAppointment() {

    const [search, setSearch] = React.useState('');
    const [hospitals, setHospitals] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:8082/hospital/all')
            .then((response) => {
                setHospitals(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <NavDrawer>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexGrow: 1,
                    }}
                >
                    <Search setSearch={setSearch} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            overflowY: 'scroll',
                            flexGrow: 1,
                            height: '100%',
                        }}
                    >
                        {hospitals.filter((hospital) => {
                            if (search === '') {
                                return hospital;
                            } else if (hospital.name.toLowerCase().includes(search.toLowerCase())) {
                                return hospital;
                            }
                        }).map((hospital) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '100%',
                                    border: '1px solid #000',
                                    borderRadius: '25px',
                                    padding: '5px',
                                    margin: '5px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '100%',
                                    }}
                                >
                                    <h2>{hospital.name}</h2>
                                    <p>{hospital.location}</p>
                                </Box>
                            </Box>)
                        )
                        }
                    </Box>
                </Box>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                        mx: 2,
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexGrow: 1,
                    }}
                >
                    <h1>Book Appointment</h1>
                    <p>Book an appointment with your preferred hospital</p>
                </Box>
            </Box>
        </NavDrawer>
    );
}

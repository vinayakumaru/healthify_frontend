import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/login.jpg';
import { addNewUser } from '../services/auth';
import LinearProgress from '@mui/material/LinearProgress';
import Message from '../components/Message';
import axios from 'axios';


const theme = createTheme();

export default function signup() {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [num, setNum] = React.useState("");
  const [age, setAge] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addNewUser(data.get('email'), data.get('password'), (err,message) => {
      setLoading(false);
      if (err) {
        setMessage('Email already exists');
        setSeverity('error');
        setOpen(true);
        return;
      }
      const user = {
        userId: message,
        email: data.get('email'),
        phoneNumber: num,
        name: data.get('name'),
        age: parseInt(age),
      };
      axios.post('http://localhost:8082/user/add', user)
        .then((_) => {
          setMessage('Registration Successful');
          setSeverity('success');
          setOpen(true);
          navigate('/');
        })
        .catch((_) => {
          setMessage('Registration Failed');
          setSeverity('error');
          setOpen(true);
        });
    });
  };

  const handleChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if ((e.target.value === '' || regex.test(e.target.value)) && e.target.value.length <= 10) {
      setNum(e.target.value);
    }
  };

  const handleAgeChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if ((e.target.value === '' || regex.test(e.target.value)) && e.target.value.length <= 3) {
      setAge(e.target.value);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              color='primary'
              sx={{
                visibility: loading ? 'visible' : 'hidden',
                height: '5px',
              }} />
          </Box>
          <Box
            sx={{
              my: 2,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="name"
                id="name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="phone"
                id="phone"
                type="text"
                onChange={(e) => handleChange(e)}
                value={num}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="age"
                label="age"
                id="age"
                type="text"
                onChange={(e) => handleAgeChange(e)}
                value={age}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item
                  ml="auto"
                >
                  <Link to="/" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Message open={open} setOpen={setOpen} message={message} severity={severity} />
    </ThemeProvider>
  );
}
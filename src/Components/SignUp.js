import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Services/firebase";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import { AccountCircle, LockRounded } from '@mui/icons-material';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createAccount = async () => {
    const loginEmail = email;
    const loginPassword = password;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    createAccount();
  };

  return (
    <Grid container style={{minHeight: '100vh'}}>
      <Grid item xs={12} sm={6}>
        <img src='socialGathering.jpeg' style={{width: '100%', height: '100%', objectFit: 'cover'}} alt='title' />
      </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          style={{padding: 10}}
          alignItems='center'
          direction='column'
          justifyContent='center'
        >
          <div style={{display: 'flex', flexDirection: 'column', maxWidth: '400px', minWidth: '300px'}}>
            <Grid container justify='center'>
              <img src='greenLogo.png' width={300} alt='logo' />
            </Grid>
            <TextField
              required
              id="signup-basic"
              label="Email"
              variant="standard"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin='normal'
              InputProps={{ startAdornment: <InputAdornment position='start'><AccountCircle /></InputAdornment>}}

            />
            <TextField
              required
              style={{marginBottom: '20px'}}
              id="signup-password-input"
              label="Password"
              variant="standard"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              margin='normal'
              InputProps={{ startAdornment: <InputAdornment position='start'><LockRounded /></InputAdornment>}}
            />
            <Button style={{padding: '8px'}} variant="contained" onClick={(e) => handleSubmit(e)}>Sign Up</Button>
            <Typography marginTop={2}>Already have an account? <Link style={{textDecoration: 'none'}} href='#'>Sign In</Link></Typography>
          </div>
        </Grid>
    </Grid>
  );
}

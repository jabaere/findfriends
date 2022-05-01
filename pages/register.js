import React from 'react'
import styles from '../styles/Home.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
export default function Register() {
  const [name, setName] = React.useState('');
  const [emailReg, setEmailReg] = React.useState('');
  const [passwordReg, setPasswordReg] = React.useState('');

  return (
    <div className={styles.loginContainer} id='login'>
  
    <TextField 
    id="outlined-basic" 
    label="username" 
    variant="outlined" 
    margin="normal" 
    fullWidth 
    onChange={e => setName(e.target.value)}
    />
    <TextField 
    id="outlined-basic" 
    label="email" 
    variant="outlined" 
    margin="normal" 
    fullWidth 
    onChange={e => setEmailReg(e.target.value)}
    />
    <TextField
      id="outlined-password-input"
      label="Password"
      type="password"
      autoComplete="current-password"
      margin="normal"
      fullWidth 
      onChange={e => setPasswordReg(e.target.value)}
    />
    <Button variant="contained" margin="normal" fullWidth >Register</Button>

      
  

    </div>
  )
}

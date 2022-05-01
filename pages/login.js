import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Magic } from "magic-sdk";
import Router from "next/router";
import { MAGIC_PUBLICK_KEY } from "../utils/Constants";
import styles from "../styles/Home.module.css";
import AuthContext from "../context/AuthContext";
import Head from 'next/head'

export default function LoginPage(props) {
 

const [email,setEmail] = useState(null)
const {loginUser} = useContext(AuthContext)

/*
  const onSubmit = async ({ email }) => {
    const magic = new Magic(MAGIC_PUBLICK_KEY);
    const didToken = await magic.auth.loginWithMagicLink({ email });
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
      body: JSON.stringify({ email }),
    });
    if (res.status === 200) {
      // redirect
      console.log(res)
      Router.push("/");
    } else {
      // display an error
    }
  };

  */

  const handleChange = (e) => {
     setEmail(e.target.value)
     console.log(e.target.value)
  }

  const handleSubmit = (e) => {
     e.preventDefault();
     loginUser(email);
     console.log(email)
  }
  return (
    <>
    <Head>
       <title>login</title>
       <meta name='description'content="login to take friends"></meta>
    </Head>
    <Container maxWidth="xs">
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            variant="outlined"
            label="Your email"
            fullWidth
            autoComplete="email"
            value={email}
            onChange={handleChange}
            className={styles.textField}
           sx={{

            color:'#e9d205',
        
            "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": {
                borderColor: "#e9d205"
              }
            }, 
            "& label.Mui-focused": {
              color: 'black'
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: '#e9d205'
              }
            }
          
          }}
          />
        </Box>
        <Button 
           type="submit" 
           variant="contained" 
           color="primary" 
           fullWidth
           style={{
            color:'black',
            backgroundColor: "#e9d205",
            fontFamily:'Fredoka'
            
        }}
           >
          Login In / Sign Up
        </Button>
      </form>
    </Container>
    </>
  );
}
import React, { useState,useContext} from 'react'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AuthContext from "../context/AuthContext";
export const Alertjs = () => {
    const {alert} = useContext(AuthContext)
  return (
    <Box 
    sx={{
    m:1,
    display:'flex',
    justifyContent:'center'
    
    }}>
    {
    alert&&
    <Alert severity="success" 
    color="info" sx={{
      backgroundColor:'#e9d205',
      width:'390px',
      color:'black',
      fontFamily:'Fredoka',
      "& .MuiAlert-icon ": {
        color:'black',
       },
      }}>
    Your Done!
    </Alert>}
    </Box>
  )
}

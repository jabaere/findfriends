import React, { useState,useRef,useContext,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import styles from "../styles/Home.module.css";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Alert from '@mui/material/Alert';
import {API_URL} from "../utils/Constants"
import AuthContext from "../context/AuthContext";
import Router from "next/router";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ImageUpload from "../utils/ImageUpload"
import Loading from "../layout/Loading"

const newAnnouncement = () => {

  const [category, setCategory] = React.useState('');
  const [isLoading,setIsLoading] = useState(false)
  const [localUser,setLocalUser] = useState(null)
  //const [alert,setAlert] = useState(null)
  const {AlertUser,alert,getAnnouncementId,announcementId,user} = useContext(AuthContext)
  const [shortText,setShortText] = useState('')
  const {getToken} = useContext(AuthContext)
  
  const [values,setValues] = useState({
    title:'',
    description:'',
    number:"",
    price:"",
    category:'',
    email:localUser  //for user permission
    
  });
  const {name,number,price,description} = values
  const text = useRef(0);
  useEffect(()=>{
    
    if (window) {
      let userEmail = localStorage.getItem('userEmail');
      let decodedUserEmail = window.atob(decodeURI(userEmail));
      console.log(decodedUserEmail)
      setLocalUser(decodedUserEmail)
    }
    console.log(localUser)
    console.log(user)
  },[])
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const inputChange = (e) => {
    const {name,value} = e.target;
  
    setValues({...values,[name]:value})
   
    
   
    
    
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const onSubmit = async (e) => {
    e.preventDefault()
    const fieldCheck = Object.values(values).some(element=> element === "")
    //es
    values.email = localUser
    //
    setIsLoading(true)
   const ddt = await getToken()
   //console.log(ddt)

    const response = await fetch(`${API_URL}/api/announcements/`, {
      method: 'POST',
      mode: 'cors',
      headers: { "Content-Type": "application/json",
          "Authorization" : "Bearer 28b213be73a53483ad36c0144a5870011abc9b6b42002446de982b4434429f9ac2011aa9436a159490f19101478603cf9e327a45bdcb480db8f64581de06b63b7a72bd69e2354ab42833ef022791b738e96ad6c4cf30b5da701d1c8df755f0a9608e8888c623b63ba5af660fb16ede133c2b96ddf8f28281acb719eb0aa19dba" },
      body: JSON.stringify({data:values})

  })
  

    if(response.status !== 200){
      console.log('error')
      console.log(JSON.stringify({data:values}))
    }else{
       console.log('ok')
       //console.log(response)
       AlertUser(true)
       console.log(response)
       setIsLoading(false)
       Router.push("/userAnnouncements")
    }
    const data = await response.json()
   // getAnnouncementId(data.id)
    console.log(data)
    setTimeout(() => {
      AlertUser(false)
    }, "4000")
    
    
    //getAnnouncementId(data.data.id)
    //console.log("getAnnouncementId"+ " " + getAnnouncementId())
    //console.log("announcementId"+announcementId)
    /*
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
    */
    //setShortText(values.description.slice(0,25).concat('...'))
    //values.short_description = shortText 
   // console.log(values.short_description)
  // console.log(JSON.stringify(values))
  };


  return (
    <>
   
    
    <Container maxWidth="xs">
      
      
      
      <form onSubmit={onSubmit}>
        <Box mb={2}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         
          label="category"
          onChange={inputChange}
          className={styles.textField}
          name='category'
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e9d205",
              
            },
          
          }}
        >
          <MenuItem value='dog'>Dog</MenuItem>
          <MenuItem value='cat'>Cat</MenuItem>
          
        </Select>
      </FormControl>
        </Box>
        <Box mb={2}>
          <TextField
            name = 'title'
            variant="outlined"
            label="Title/Name"
            fullWidth
            autoComplete="email"
            onChange={inputChange}
            className={styles.textField}
           sx={{
            "& .MuiOutlinedInput-input ": {
               fontFamily:'Fredoka'
              },
            color:'#e9d205',
            "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": {
                borderColor: "#e9d205"
              }
            }, 
            "& label.Mui-focused": {
              color: 'black',
              fontFamily:'Fredoka'
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: '#e9d205'
              }
            }
          
          }}
          />

        </Box>

        <Box mb={2} display='flex'>
        <TextField
            variant="outlined"
            label="Phone Number"
            name = 'number'
            autoComplete="number"
            onChange={inputChange}
           className={styles.textField}
           sx={{
             color:'#e9d205',
             mr:2,
            "& .MuiOutlinedInput-input": {
               fontFamily:'Fredoka'
            },
        
            "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": {
                borderColor: "#e9d205",
                fontFamily:'Fredoka'
              }
            }, 
            "& label.Mui-focused": {
              color: 'black',
              fontFamily:'Fredoka'
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: '#e9d205',
                
              }
            }
          
          }}
          />
          <TextField
            variant="outlined"
            label="Price"
            name = 'price'
            autoComplete="price"
            onChange={inputChange}
           className={styles.textField}
           sx={{
             color:'#e9d205',
            "& .MuiOutlinedInput-input": {
               fontFamily:'Fredoka'
            },
        
            "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": {
                borderColor: "#e9d205",
                fontFamily:'Fredoka'
              }
            }, 
            "& label.Mui-focused": {
              color: 'black',
              fontFamily:'Fredoka'
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: '#e9d205',
                
              }
            }
          
          }}
          />
        </Box>
        <Box mb={2}>
        <TextField
          ref={(e)=> e = text}
          id="filled-multiline-static"
          label="Description"
          name = 'description'
          multiline
          rows={4}
          variant="filled"
          fullWidth
          onChange={inputChange}
          sx={{
            '& .MuiFilledInput-root': {
              overflow: 'hidden',
              borderRadius: 1,
            
              '&:hover': {
                backgroundColor: 'transparent',
              },

              '&::after':{
                  borderBottom:'2px solid #e9d205'
              },
              '&.Mui-focused': {
                backgroundColor: 'transparent',
                boxShadow: '#e9d205 0.25 0 0 0 2px',
                
               
              },
            },

            '& .MuiInputLabel-root':{
              '&.Mui-focused': {
                color:'black',
                fontFamily:'Fredoka'
               
              },

            },
            "& .MuiFilledInput-input": {

              fontFamily:'Fredoka'

            },
          
          }}
        />
        </Box>
        <Box mb={2}>
           <ImageUpload />
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
          {!isLoading ? 
             'Submit' 
             : 
             <Loading 
              type={'spinningBubbles'}
              color={'black'} 
              />}
        </Button>
        
      </form>
    
    
    </Container>
    </>
  )
}

export default newAnnouncement

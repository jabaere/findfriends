import React,{useState} from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
const ImageUpload = ({announcementId,imageUploaded})=> {

  const Input = styled('input')({
    display: 'none',
  });
    const [image,setImage] = useState(null)


    const handleSubmit = async (e) => {
        e.prevenDefault();
        console.log('imageupload')
        const formData = new FormData()
        formData.append('files',image);
        formData.append('ref',"announcements");
        formData.append('refId',announcementId);
        formData.append('field','image');

        const res = await fetch(`${API_URL}/api/upload/`,{
          method:"POST",
          body:formData
      
        })
        const data= res.json()

        console.log(data)

        if(res.ok){
          imageUploaded()
        }
    }
  

  
    const handleFilesChange = (e) => {
         setImage(e.target.files[0])
         
         console.log(e.target.files[0])
    }
  
   

  
  
    return(
    <Box >
     <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input 
           accept="image/*" 
           id="contained-button-file" 
           multiple type="file" 
           onChange={handleFilesChange}/>
        <Button 
           variant="contained" 
           component="span"
           style={{
            color:'black',
            backgroundColor: "#e9d205",
            fontFamily:'Fredoka'
            
        }}
           >
          Upload
        </Button>
      </label>
      <label htmlFor="icon-button-file">
        <Input 
           accept="image/*" 
           id="icon-button-file" 
           type="file" 
           onChange={handleFilesChange}
           />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera           
            style={{
            
            color: "#e9d205",
            
            
        }}/>
        </IconButton>
      </label>
    </Stack>
    </Box>
     )
  }

  export default ImageUpload
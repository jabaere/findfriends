import React, { useState, useContext } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import AuthContext from "../context/AuthContext";
import { API_URL } from "./Constants";
const ImageUpload = ({ announcementId, imageUploaded }) => {
  const Input = styled("input")({
    display: "none",
  });
  const [image, setImage] = useState(null);
  const { setImageUpload, handlePictureUpload, imageLoader, statusText } =
    useContext(AuthContext);

  const handleFilesChange = (e) => {
    setImageUpload(e.target.files[0]);
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleFilesChange}
          />
          <Button
            variant="contained"
            component="span"
            style={{
              color: "black",
              backgroundColor: "#e9d205",
              fontFamily: "Fredoka",
            }}
          >
            Choose
          </Button>
        </label>

        <Button
          variant="contained"
          component="span"
          style={{
            color: "black",
            backgroundColor: "#e9d205",
            fontFamily: "Fredoka",
          }}
          onClick={async () => await handlePictureUpload(image, 2, API_URL)}
        >
          Upload
        </Button>

        {/*<label htmlFor="icon-button-file">
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
      */}
      </Stack>
      <Box sx={{ marginTop: 3 }}>
        {image ? <Typography variant="caption">{image.name}</Typography> : null}
      </Box>

      <Box sx={{ width: "100%", marginTop: 5, color: "cadetblue" }}>
        {imageLoader ? <LinearProgress color="inherit" /> : null}
        {statusText ? <Typography>Ready!</Typography> : null}
      </Box>
    </Box>
  );
};

export default ImageUpload;

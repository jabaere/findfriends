import React, { useState, useRef, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import styles from "../../../styles/Home.module.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Alert from "@mui/material/Alert";
import { Typography } from "@mui/material";
import { API_URL } from "../../../utils/Constants";
import AuthContext from "../../../context/AuthContext";
import Router from "next/router";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Loading from "../../../layout/Loading";
import ImageUpload from "../../../utils/ImageUpload";
import { AUTH_KEY } from "../../../utils/Constants";
import { fromImageToUrl } from "../../../utils/Constants";
import { useWindowSize } from "../../../hooks/windowSize";
import Image from "next/image";
const EditAnnouncement = ({ statement }) => {
  const window = useWindowSize();
  const Input = styled("input")({
    display: "none",
  });
  useEffect(() => {
    console.log("iddddssssssdddddddd");
    console.log(statement.data.id);
    console.log(statement);
    console.log(window);
    //<img src={fromImageToUrl(statement.data.attributes.image.data && statement.data.attributes.image.data.attributes)}/>
  });
  //const [alert,setAlert] = useState(null)
  const { AlertUser, alert, getAnnouncementId, imageData } =
    useContext(AuthContext);
  const [shortText, setShortText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useContext(AuthContext);
  const [values, setValues] = useState({
    title: statement.data.attributes.title,
    description: statement.data.attributes.description,
    number: statement.data.attributes.number,
    price: statement.data.attributes.price,
    category: statement.data.attributes.category,
    image: {},
  });
  const { title, number, price, description, category } = values;
  const text = useRef(0);

  const inputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fieldCheck = Object.values(values).some((element) => element === "");

    const ddt = await getToken();
    //console.log(ddt)
    values.image = imageData[0];
    // values.slug = values.description.slice(0,7)
    const response = await fetch(
      `http://localhost:1337/api/announcements/${statement.data.id}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_KEY}`,
        },
        body: JSON.stringify({ data: values }),
      }
    );

    if (response.status !== 200) {
      console.log("error");
      console.log(JSON.stringify({ data: values }));
    } else {
      console.log("ok");
      //console.log(response)
      // imageUploaded()
      AlertUser(true);
      console.log(alert);
      setIsLoading(false);
      Router.push("/UserAnnouncements");
    }
    const data = await response.json();
    console.log(data);
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

  //es es
  /*
  const imageUploaded = async () => {
    const response = await fetch(`${API_URL}/api/announcements/${statement.data.id}`)
    const data = await response.json()
    console.log("imageUploaded" + data)
  }
  */
  return (
    <Box style={{ display: "flex" }}>
      <Container
        maxWidth="xl"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <form onSubmit={onSubmit}>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="category"
                onChange={inputChange}
                name="category"
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e9d205",
                  },
                }}
              >
                <MenuItem value="dog">Dog</MenuItem>
                <MenuItem value="cat">Cat</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <TextField
              value={title}
              name="title"
              variant="outlined"
              label="Title/Name"
              fullWidth
              autoComplete="email"
              onChange={inputChange}
              className={styles.textField}
              sx={{
                "& .MuiOutlinedInput-input ": {
                  fontFamily: "Fredoka",
                },
                color: "#e9d205",
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: "#e9d205",
                  },
                },
                "& label.Mui-focused": {
                  color: "black",
                  fontFamily: "Fredoka",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#e9d205",
                  },
                },
              }}
            />
          </Box>

          <Box mb={2} display="flex">
            <TextField
              value={number}
              name="number"
              variant="outlined"
              label="Number"
              autoComplete="number"
              onChange={inputChange}
              className={styles.textField}
              sx={{
                color: "#e9d205",
                mr: 2,
                "& .MuiOutlinedInput-input": {
                  fontFamily: "Fredoka",
                },

                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: "#e9d205",
                    fontFamily: "Fredoka",
                  },
                },
                "& label.Mui-focused": {
                  color: "black",
                  fontFamily: "Fredoka",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#e9d205",
                  },
                },
              }}
            />
            <TextField
              value={price}
              name="price"
              variant="outlined"
              label="Price"
              autoComplete="price"
              onChange={inputChange}
              className={styles.textField}
              sx={{
                color: "#e9d205",
                "& .MuiOutlinedInput-input": {
                  fontFamily: "Fredoka",
                },

                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: "#e9d205",
                    fontFamily: "Fredoka",
                  },
                },
                "& label.Mui-focused": {
                  color: "black",
                  fontFamily: "Fredoka",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#e9d205",
                  },
                },
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              value={description}
              ref={(e) => (e = text)}
              id="filled-multiline-static"
              label="Description"
              name="description"
              multiline
              rows={4}
              variant="filled"
              fullWidth
              onChange={inputChange}
              sx={{
                "& .MuiFilledInput-root": {
                  overflow: "hidden",
                  borderRadius: 1,

                  "&:hover": {
                    backgroundColor: "transparent",
                  },

                  "&::after": {
                    borderBottom: "2px solid #e9d205",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "transparent",
                    boxShadow: "#e9d205 0.25 0 0 0 2px",
                  },
                },

                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "black",
                    fontFamily: "Fredoka",
                  },
                },
                "& .MuiFilledInput-input": {
                  fontFamily: "Fredoka",
                },
              }}
            />
          </Box>
          <Box mb={2}>
            <ImageUpload announcementId={statement.data.id} />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{
              color: "black",
              backgroundColor: "#e9d205",
              fontFamily: "Fredoka",
            }}
          >
            {!isLoading ? (
              "Save"
            ) : (
              <Loading type={"spinningBubbles"} color={"black"} />
            )}
          </Button>
        </form>
      </Container>
      {window.width > 600 && (
        <Box
          style={{
            height: "100px",
            paddingRight: "125px",
            marginRight: "50px",
          }}
        >
          <Image
            src={fromImageToUrl(
              statement.data.attributes.image.data &&
                statement.data.attributes.image.data.attributes
            )}
            style={{ width: "350px", height: "200px" }}
            alt='friend-image'
          />
          <Typography variant="h4" align="center">
            {title}
          </Typography>
          <Box style={{ maxHeight: "400px", maxWidth: "350px" }}>
            <Typography variant="caption"> {description}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Phone Number: {number}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Price: {price}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Category: {category}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/announcements/${id}?populate=*`);
  const statement = await res.json();
  return {
    props: {
      statement,
    },
  };
}

export default EditAnnouncement;

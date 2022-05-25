import React, { useState, useRef, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import styles from "../styles/Home.module.css";
import Alert from "@mui/material/Alert";
import { API_URL } from "../utils/Constants";
import AuthContext from "../context/AuthContext";
import Router from "next/router";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ImageUpload from "../utils/ImageUpload";
import Loading from "../layout/Loading";
import { AUTH_KEY } from "../utils/Constants";
const NewAnnouncement = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [localUser, setLocalUser] = useState(null);
  //const [alert,setAlert] = useState(null)
  const { AlertUser, user, imageData } = useContext(AuthContext);
  const [slug, setSlug] = useState("");
  const [warnigAlert, setWarningAlert] = useState(false);
  const [values, setValues] = useState({
    title: "",
    description: "",
    number: "",
    price: "",
    category: "",
    email: "",
    slug: "", //"dejejnr" + Math.floor(Math.random() * 89)
    image: {},

    //for user permission
  });
  const { title, number, price, description, category} = values;
  const text = useRef(0);
  useEffect(() => {
    if (window) {
      let userEmail = localStorage.getItem("userEmail");
      let decodedUserEmail = window.atob(decodeURI(userEmail));
      //console.log(decodedUserEmail);
      setLocalUser(decodedUserEmail);
    }
    //console.log(localUser);
    //console.log(user);
    //console.log(userEmail);
  }, [user]);
 
  const inputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log({title, number, price, description, category})
   console.log(values)
    if (!title || !number || !price || !description || !category) {
      e.preventDefault();
      setWarningAlert(true);
    } else {
      setWarningAlert(false);
      setIsLoading(true);

      //es
      values.email = user.email;
      values.image = imageData[0];
      values.users_permissions_user = user;
      const x = values.description
        .split(" ")
        .join("")
        .slice(0, 7)
        .replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, "f");
      const slugRegex = /^[A-Za-z0-9-_.~]*$/;
      const z = slugRegex.test(x);
      values.slug = z ? x : "dejejnr" + Math.floor(Math.random() * 89);

      const response = await fetch(`${API_URL}/api/announcements/`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_KEY}`,
        },
        body: JSON.stringify({ data: values }),
      });

      if (response.status !== 200) {
        console.log("error");
      } else {
        console.log("ok");
        AlertUser(true);
        setIsLoading(false);
        Router.push("/UserAnnouncements", null, { shallow: false });
      }

      setTimeout(() => {
        AlertUser(false);
        //console.log(slug)
      }, "4000");

      //const ddt = await getToken();
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        {warnigAlert && (
          <Alert
            severity="warning"
            color="info"
            sx={{
              width: "390px",
              color: "black",
              marginBottom: 5,
              fontFamily: "Fredoka",
              "& .MuiAlert-icon ": {
                color: "black",
              },
              backgroundColor: "#e9d205",
            }}
          >
            Please fill all data!
          </Alert>
        )}
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
              variant="outlined"
              label="Phone Number"
              name="number"
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
              variant="outlined"
              label="Price"
              name="price"
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
            <ImageUpload announcementId={slug} />
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
              "Submit"
            ) : (
              <Loading type={"spinningBubbles"} color={"black"} />
            )}
          </Button>
        </form>
      </Container>
    </>
  );
};

export default NewAnnouncement;

import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { API_URL } from "../utils/Constants";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "next/link";

const Profile = ({ announcements }) => {
  const [userAnnouncementNumber, setUserAnnouncementNumber] = useState(0);

  const { user, logoutUser } = useContext(AuthContext);
  useEffect(() => {
    // console.log(announcements.data.filter(item => item.attributes.users_permissions_user.data.attributes.email===user.email))

    if (user) {
      const count = announcements.data
        .filter((item) => item.attributes.email !== null)
        .filter((item) => item.attributes.email === user.email);
      setUserAnnouncementNumber(count.length);
    }
  }, [user]);

  return (
    <Box style={{ padding: 10 }}>
      <Card
        sx={{
          maxWidth: 645,
          "&.MuiCard-root": {
            height: "auto",
            display: "flex",
            margin: "0 auto",
          },
        }}
      >
        <CardActionArea
          sx={{
            "&.MuiButtonBase-root": {
              display: "flex",
              flexDirection: "column",
              alignItems: "baseline",
            },
          }}
        >
          <Avatar
            sx={{
              bgcolor: "cadetblue",
              "&.MuiAvatar-root": {
                height: "auto",
                width: "100%",
                fontSize: 55,
              },
            }}
            variant="square"
          >
            {user && user.email.slice(0, 1).toUpperCase()}
          </Avatar>
          <CardContent sx={{ width: "100%" }}>
            <Typography gutterBottom variant="h5" component="div">
              User: {user && user.email}
            </Typography>
            <Box>
              <Link href="/UserAnnouncements">
                <Typography variant="body2" color="text.secondary">
                  My statements: {userAnnouncementNumber}
                </Typography>
              </Link>
            </Box>

            <Typography variant="body2" color="text.secondary">
              Last visit
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                component="span"
                style={{
                  color: "black",
                  backgroundColor: "cadetblue",
                  fontFamily: "Fredoka",
                }}
                onClick={logoutUser}
              >
                Logout
              </Button>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export async function getStaticProps() {
  const announcement_res = await fetch(
    `${API_URL}/api/announcements?populate=*`
  );
  const announcements = await announcement_res.json();

  return {
    props: {
      announcements,
    },
  };
}

export default Profile;

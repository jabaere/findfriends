import React, { useState, useEffect, useContext } from "react";
import announcements from "../announcements.json";
import AnnouncementCards from "../layout/announcementCards";
import { fromImageToUrl } from "../utils/Constants";
import styles from "../styles/Cards.module.css";
import { API_URL } from "../utils/Constants";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Router from "next/router";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

const userAnnouncements = ({ announcements }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [userAnnouncementNumber, setUserAnnouncementNumber] = useState(0);

  useEffect(() => {
    // console.log(announcements.data.filter(item => item.attributes.users_permissions_user.data.attributes.email===user.email))
    //item.attributes.users_permissions_user.data
    //item.attributes.users_permissions_user.data.attributes.email

    if (user) {
      const count = announcements.data
        .filter((item) => item.attributes.email !== null)
        .filter((item) => item.attributes.email === user.email);
      setUserAnnouncementNumber(count.length);
      console.log(count.length);
    }
  }, [user, userAnnouncementNumber]);

  return (
    <div className={styles.cardsContainer} id="dasda">
      <Box
        sx={{
          width: 400,
          display: "flex",
          justifyContent: "center",
          padding: 1,
        }}
      >
        <h3>You have {user ? userAnnouncementNumber : 0} statements</h3>
      </Box>

      <Box className={styles.cardsContainer2}>
        {user &&
          announcements.data
            .filter((item) => item.attributes.email !== null)
            .filter((item) => item.attributes.email === user.email)
            .map((announcement) => (
              <div className={styles.cards} key={announcement.attributes.title}>
                <AnnouncementCards
                  title={announcement.attributes.title}
                  image={fromImageToUrl(
                    announcement.attributes.image.data &&
                      announcement.attributes.image.data.attributes
                  )}
                  description={announcement.attributes.description
                    .slice(0, 25)
                    .concat("...")}
                  announcement={announcement.attributes.slug}
                  id={announcement.id}
                />
              </div>
            ))}
      </Box>
    </div>
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

export default userAnnouncements;

import React, { useState, useEffect, useContext } from "react";
//import announcements from "../announcements.json"
import AnnouncementCards from "../../../layout/announcementCards";
import { fromImageToUrl } from "../../../utils/Constants";
import styles from "../../../styles/Cards.module.css";
import { API_URL } from "../../../utils/Constants";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AuthContext from "../../../context/AuthContext";
import Alert from "@mui/material/Alert";

const Announcements = ({ announcements }) => {
  const router = useRouter();
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(null);
  const { searchText,handlePagination} = useContext(AuthContext);
  const [data, setData] = useState([]);

  const handleCheckbox = (e) => {
    setCategory(e.target.value);
  };

  const handlePaginationChange = (e, value) => {
    setPage(value);
    handlePagination(value)
    router.push(`${value}`, null, { shallow: false });
  };

  useEffect(() => {
    if (category === "cat" || category === "dog") {
      const result = announcements.data
        .filter((a) => a.attributes.category === category)
        .filter((a) =>
          a.attributes.title.toLowerCase().includes(searchText.toLowerCase())
        );

      setData(result);
    } else if (searchText) {
      const result = announcements.data.filter((a) =>
        a.attributes.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setData(result);
    } else {
      setData(announcements.data);
    }

    console.log("paginationpage" + " " + announcements.meta.pagination.page);
  }, [searchText, category, announcements]);

  return (
    <>
      <div className={styles.cardsContainerHome} id="dasda">
        <Box sx={{ display: "flex", justifyContent: "center", padding: 1 }}>
          <FormGroup aria-label="position">
            <FormLabel
              component="legend"
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                fontSize: "25px",
              }}
            >
              Categories
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={category}
              onChange={handleCheckbox}
              row
            >
              <FormControlLabel
                value="all"
                control={
                  <Radio
                    sx={{
                      "&.MuiRadio-root": {
                        color: "gray",
                      },
                    }}
                  />
                }
                label="All"
                labelPlacement="end"
              />
              <FormControlLabel
                value="dog"
                control={
                  <Radio
                    sx={{
                      "&.MuiRadio-root": {
                        color: "gray",
                      },
                    }}
                  />
                }
                label="Dogs"
                labelPlacement="end"
              />
              <FormControlLabel
                value="cat"
                control={
                  <Radio
                    sx={{
                      "&.MuiRadio-root": {
                        color: "gray",
                      },
                    }}
                  />
                }
                label="Cats"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormGroup>
        </Box>

        <Box className={styles.cardsContainer2}>
          {
            // !category && !searchText || category==='all'
            data.length > 0 ? (
              data.map((announcement) => (
                <div
                  className={styles.cards}
                  key={announcement.attributes.title}
                >
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
                  />
                  {console.log("11111")}
                </div>
              ))
            ) : (
              <Stack sx={{ width: "30%" }} spacing={2}>
                <Alert
                  variant="outlined"
                  severity="info"
                  sx={{
                    fontWeight: "bold",
                    border: "2px solid cadetblue",
                    "&.MuiAlert-root .MuiAlert-icon": {
                      color: "cadetblue",
                      fontWeight: "bold",
                    },
                  }}
                >
                  Nothing was found!
                </Alert>
              </Stack>
            )
          }
        </Box>
      </div>
      <Stack spacing={2} sx={{ m: "0 auto" }}>
        <Pagination
          count={announcements.meta.pagination.pageCount}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handlePaginationChange}
        />
      </Stack>
    </>
  );
};
export async function getServerSideProps({ params: { page } }) {
  const announcement_res = await fetch(
    `${API_URL}/api/announcements?populate=*&pagination[pageSize]=10&pagination[page]=${page}`
  );
  const announcements = await announcement_res.json();

  return {
    props: {
      announcements,
    },
  };
}

export default Announcements;

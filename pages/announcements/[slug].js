import React, { useState, useRef, useContext, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import { API_URL, IMAGE_URLS } from "../../utils/Constants";
import { fromImageToUrl } from "../../utils/Constants";
import Button from "@mui/material/Button";
import Link from "next/link";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import AuthContext from '../../context/AuthContext'
const Announcements = ({ announcement }) => {
  const {user} = useContext(AuthContext)
  const myLoader = ({ src }) => src;
  const options = {
    weekday: "short",
    day: "2-digit",
  };
  useEffect(() => {
    console.log(router.pathname);
  });

  const router = useRouter();
  return (
    <Box className={styles.detailsPage} id="dasda">
      <Head>
        {console.log(announcement)}
        {/*console.log(announcement.attributes.image.data.attributes.url)*/}
        {announcement.title && <title>{announcement.title}</title>}
        {announcement.short_description && (
          <meta name="description" content={announcement.short_description} />
        )}
      </Head>
      <Image
        loader={myLoader}
        src={fromImageToUrl(
          announcement.attributes.image.data &&
            announcement.attributes.image.data.attributes
        )}
        alt="image"
        width={400}
        height={250}
      />
      <p>
        Added to{" "}
        <b>{new Date(announcement.attributes.createdAt).toLocaleString()}</b>
      </p>
      <p>
        Last update{" "}
        <b>{new Date(announcement.attributes.updatedAt).toLocaleString()}</b>
      </p>
      <h3>{announcement.attributes.title}</h3>
      <Box style={{ maxHeight: "400px", maxWidth: "500px" }}>
        <p>{announcement.attributes.description}</p>
      </Box>
      <p>
        <span style={{ fontWeight: "bold" }}>Price</span>
        {"-"}
        {announcement.attributes.price}
        {"$"}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Phone number</span>
        {"-"}
        {announcement.attributes.number}
      </p>
      <Link
        href={
          user
            ? "/UserAnnouncements"
            : "/announcements"
        }
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => console.log(router.pathname)}
          style={{
            color: "black",
            backgroundColor: "#e9d205",
            fontFamily: "Fredoka",
            maxWidth: "500px",
          }}
        >
          Back
        </Button>
      </Link>
    </Box>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const announcement_res = await fetch(
    `${API_URL}/api/announcements?filters[slug]=${slug}&populate=*`
  );
  const found = await announcement_res.json();
  //const data = found.data.filter(a=> a.attributes.slug===slug)

  return {
    props: {
      announcement: found.data[0],
    },
  };
}

export async function getStaticPaths() {
  // Get external data from the file system, API, DB, etc.
  const announcement_res = await fetch(
    `${API_URL}/api/announcements?populate=*`
  );
  const announcements = await announcement_res.json();
  return {
    paths: announcements.data.map((el) => ({
      params: { slug: String(el.attributes.slug) },
    })),
    fallback: false,
  };
}

export default Announcements;

import Head from "next/head";
import styles from "../styles/Home.module.css";
import HomeData from "./homeData";

export default function Home({ children }) {
return (
    <div className={styles.container}>
      <Head>
        <title>Find Friends</title>
        <meta name="description" content="puppies,cats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeData />
    </div>
  );
}



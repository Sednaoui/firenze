import React, { useContext } from "react";
import { Contract } from "../components";
import { Web3Context } from "../helpers/Web3Context";
import styles from "../styles/Home.module.css";
import { curatedImages } from "../public/images/images";
import PhotoGallery from "../components/PhotoGallery";

function Home() {
  const web3 = useContext(Web3Context);

  console.log(`🗄 web3 context:`, web3);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Commission <mark className={styles.highlight}>The Masters</mark>
        </h1>
        <p className={styles.description}>
          <br />
          Commission artists for <a href="">Protraits</a>, <a href="">Madonnas</a> or your very own
          <a href="google.com"> CryptoPunk</a>
        </p>
      </main>
      <PhotoGallery photos={curatedImages} />
    </div>
  );
}

export default Home;

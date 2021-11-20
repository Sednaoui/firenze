import React, { useContext } from "react";
import { Contract } from "../components";
import { Web3Context } from "../helpers/Web3Context";
import styles from "../styles/Home.module.css";
import { curatedImages } from "../public/images/images";
import PhotoGallery from "../components/PhotoGallery";
import { useRouter } from "next/router";

function Home() {
  const web3 = useContext(Web3Context);
  const router = useRouter();

  console.log(`🗄 web3 context:`, web3);

  const handleClick = value => {
    const creatorAddress = value.attributes.creator_address.nodeValue;
    router.push(`./artisit/${creatorAddress}`);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Commission <mark className={styles.highlight}>The Masters</mark>
        </h1>
        <p className={styles.description}>
          <br />
          Commission artists for <a href="">Protraits</a>,
          <a href="./artisit/0x53be3420d2F2EC0C68cA0ec65FF6dc004Cc551f9"> Madonnas</a> or your very own
          <a href="google.com"> CryptoPunk</a>
        </p>
      </main>
      <PhotoGallery photos={curatedImages} onPhotoClick={handleClick} />
    </div>
  );
}

export default Home;

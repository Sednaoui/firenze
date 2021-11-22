import React, { useContext } from "react";
import { BaseLink } from "../components";
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
          Commission artists for Protraits,
          <a href="./artisit/0x53be3420d2F2EC0C68cA0ec65FF6dc004Cc551f9"> Madonnas</a> or your very own CryptoPunk
        </p>
      </main>
      <PhotoGallery photos={curatedImages} onPhotoClick={handleClick} />
      <main className={styles.footer}>
        <BaseLink href="/disegnoNFT">
          <a className={styles.title}>Artist Space</a>
        </BaseLink>
      </main>
    </div>
  );
}

export default Home;

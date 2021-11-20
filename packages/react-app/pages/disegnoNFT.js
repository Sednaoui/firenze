import React, { useContext, useState } from "react";
import { MintingFileForm } from "../components";
import utilStyles from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";

const DisegnoNFT = () => {
  return (
    <div
      className="flex flex-1 flex-col w-full items-center"
      style={{
        backgroundImage: `url("https://ipfs.io/ipfs/QmYKEWnUw6RYViZLEQKKNsN6fPBqaiBFjFj72jrtqFsSGF")`,
      }}
    >
      <div className="text-center" style={{ margin: 64 }}>
        <h1 className={utilStyles.heading2Xl}>
          <mark className={styles.highlight}>Disegno</mark>NFT
        </h1>
      </div>
      <MintingFileForm />
    </div>
  );
};

export default DisegnoNFT;

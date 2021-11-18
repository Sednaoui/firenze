import React, { useContext, useState } from "react";
import { MintingFileForm } from "../components";
import utilStyles from "../styles/utils.module.css";

const DisegnoNFT = () => {
  return (
    <div className="flex flex-1 flex-col w-full items-center">
      <div className="text-center" style={{ margin: 64 }}>
        <h1 className={utilStyles.headingXl}>Disegno NFT</h1>
      </div>
      <MintingFileForm />
    </div>
  );
};

export default DisegnoNFT;

import React, { useContext } from "react";
import { Contract } from "../components";
import { Web3Context } from "../helpers/Web3Context";

function Home() {
  const web3 = useContext(Web3Context);

  console.log(`🗄 web3 context:`, web3);

  return (
    <div className="flex flex-1 flex-col h-screen w-full items-center">
      <div className="text-center" style={{ margin: 64 }}>
        <br />
        <a href="/artistProfile" rel="noreferrer">
          Artist Profile
        </a>
        <br />
        <a href="/disegnoNFT" rel="noreferrer">
          Disegno NFT
        </a>
      </div>
    </div>
  );
}

export default Home;

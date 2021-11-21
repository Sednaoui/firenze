import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState, useEffect } from "react";
import { Address, Balance} from "../components";
import { ethers } from "arb-ts/node_modules/ethers";
import tokenabi from "../contracts/GLDToken.json";
import { Web3Context } from "../helpers/Web3Context";
import ArtistWithdrawalGrid from "../components/ArtistWithdrawalGrid"



export function ArtistWithdrawal() {
 const web3 = React.useContext(Web3Context);
  const [newPurpose, setNewPurpose] = useState("loading...");
  const [isLoading, setIsLoading] = useState(true);
  const [addressArray, setAddressArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        await findArtistStreams();
    }
    fetchData();
  }, []);

  async function findArtistStreams() {
    let addressArrayLocal = [];
    let i = 0;
    var complete = false; 
    var myContractAddress = 0;
    try {
     while (complete == false) {
   
        const readContract = web3.readContracts;
        var contractAddress = await web3.tx(readContract.SIMPLESTREAMFACTORY.allSimpleStreams(i));
        var toArtistAddress = contractAddress[1];
        //hard coded to be michelangelo's address
        if (toArtistAddress == '0x53be3420d2F2EC0C68cA0ec65FF6dc004Cc551f9') {
            myContractAddress = contractAddress;
            addressArrayLocal[i] = [myContractAddress];
        }

        i++;
     }
    } catch (e) {
      complete = true;
      console.log(e);
    }
    setAddressArray(addressArrayLocal);
    console.log(addressArray);
    setIsLoading(false);
  }
  return (
    <div class="flex-container"  align="center">
        <div>
            <ArtistWithdrawalGrid 
            isLoading={isLoading}
            addressArray={addressArray}
            />
        </div>
    </div>
  );
}
export default ArtistWithdrawal;

import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance} from ".";
import { ethers } from "arb-ts/node_modules/ethers";
import tokenabi from "../contracts/GLDToken.json";
import { Web3Context } from "../helpers/Web3Context";
import  ArtistWithdrawalItem from "../components/ArtistWithdrawalItem";

export function ArtistWithdrawalGrid({isLoading, addressArray}) {


  return isLoading ? (<h1></h1>) :
    <div>
       {addressArray.map((addressArray) =>(
         console.log(addressArray),
        <ArtistWithdrawalItem addressArray={addressArray}></ArtistWithdrawalItem>

       ))}
    </div>

}
export default ArtistWithdrawalGrid;
import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance} from "../components";


export function ExampleUI({isLoading, transactionDeployment, amountToSend, timeToSend}) {
  const [newPurpose, setNewPurpose] = useState("loading...");

  return isLoading ? (<h1></h1>) :
    <div class="flex-container"  align="center">
 
    <h1 fontsize="15px">
      Money Stream
    </h1>

    <Progress
      type="circle"
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
      percent={1}
      status="active"
    />

    <h2>
      Amount of ETH: {amountToSend}
    </h2>

    <h2>
      Time Remaining: {timeToSend} days
    </h2>

    </div>

}
export default ExampleUI;

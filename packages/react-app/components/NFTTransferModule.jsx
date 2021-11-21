import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch, Form, Select } from "antd";
import React, { useState } from "react";
import { Address, Balance} from ".";
import { ethers } from "arb-ts/node_modules/ethers";
import tokenabi from "../contracts/GLDToken.json";
import { Web3Context } from "../helpers/Web3Context";
import  ArtistWithdrawalItem from "../components/ArtistWithdrawalItem";

export function NFTTransferModule({isArtist, nftId}) {
    const web3 = React.useContext(Web3Context);

    const [form] = Form.useForm();

    const onFinish = async values => {
    const writecontract = web3.writeContracts;
       const tans = await web3.tx(writecontract.NFT.safeTransferFrom(web3.Address,values.description,nftId));
        
    }

    const [loading, setLoading] = React.useState(false);
    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
      };
  return !isArtist ? (<h1></h1>) :
    <div>
      <Form
      form={form}
      name="commission"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      <Form.Item label="To" name="description">
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset:2, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Send NFT
        </Button>
      </Form.Item>
    </Form>
    </div>

}
export default NFTTransferModule;
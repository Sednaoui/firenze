import React from "react";
import { Form, Input, Button, Select } from "antd";
import { Web3Context } from "../helpers/Web3Context";
import { uploadFileIPFS, uploadMetaDataIPFS } from "../helpers/nftPortAPI";
import { ExampleUI } from "./ExampleUI";
import { ethers } from "arb-ts/node_modules/ethers";

const CommissionForm = () => {
  const web3 = React.useContext(Web3Context);

  const [loading, setLoading] = React.useState(false);

  const [transactionDeployment, setTransactiondeployment] = React.useState(false);

  const [streamUI, setStreamUI] = React.useState(false);

  const [amountToSend, setAmountToSend] = React.useState(0);

  const [timeToSend, setTimeToSend] = React.useState(0);

  const onFinish = async values => {
    setLoading(true);

    const uploadFileResponse = await uploadFileIPFS(myFile);

    const uploadMetaDataResponse = await uploadMetaDataIPFS(
      values.type,
      values.description,
      uploadFileResponse.ipfs_url,
    );

    deploySimpleStream(uploadMetaDataResponse);
    // Show confirmation page of steaming open and information sent to the artisit
  };

  async function deploySimpleStream(uploadMetaDataResponse) {
    const writecontract = web3.writeContracts;
    console.log(writecontract);

    var amountsent = amountToSend * 10 ^ 18
    var stringAmountToSend = amountToSend.toString();
    const overrides = {
      value: ethers.utils.parseEther(stringAmountToSend),
    };

    try {
      const response = await web3.tx(
        writecontract.SIMPLESTREAMFACTORY.createSimpleStream(
          web3.address,
          amountsent,
          timeToSend,
          false,
          uploadMetaDataResponse.metadata_uri,
          overrides,
        ),
      );
      if (response) {
        setTransactiondeployment(response);
        setStreamUI(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();
  const { Option } = Select;

  const OnTypeChange = value => {
    switch (value) {
      case "Portrait":
        form.setFieldsValue({ note: "300 MATIC in 7 days" });
        setAmountToSend(3);
        setTimeToSend(7 * 24 * 60 * 60);
        return;
      case "Landscape":
        form.setFieldsValue({ note: "500 MATIC in 14 days" });
        setAmountToSend(5);
        setTimeToSend(14 * 24 * 60 * 60);
        return;
      case "Madonna":
        form.setFieldsValue({ note: "0.0001 MATIC in 100 seconds" });
        setAmountToSend(0.0001);
        setTimeToSend(100);
        return;
    }
  };

  const [myFile, setMyFile] = React.useState(null);

  const normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    setMyFile(e.target.files[0]);
    return e && e.fileList;
  };

  return (
    <div>
      <Form
        form={form}
        name="commission"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item name="type" label="Type of commission" rules={[{ required: true }]}>
          <Select placeholder="Select a option" onChange={OnTypeChange} allowClear>
            <Option value="Portrait">Portrait</Option>
            <Option value="Landscape">Landscape</Option>
            <Option value="Madonna">Madonna</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="File">
          <Input
            type="file"
            name="file"
            onChange={normFile}
            required
            rules={[{ required: true, message: "please add a file to be your NFT" }]}
          />
        </Form.Item>

        <Form.Item name="note" label="Total">
          <Input disabled />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Open Stream
          </Button>
        </Form.Item>
      </Form>
      <div>
        <ExampleUI
          showStreamUI={streamUI}
          tx={transactionDeployment}
          amountToSend={amountToSend}
          timeToSend={timeToSend}
        />
      </div>
    </div>
  );
};

export default CommissionForm;

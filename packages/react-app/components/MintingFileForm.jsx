import React from "react";
import { Form, Input, Button } from "antd";
import { easyMintingWithFileUpload } from "../helpers/nftPortAPI";

const MintingFileForm = () => {
  const onFinish = values => {
    easyMintingWithFileUpload("rinkeby", values.title, values.description, values.wallet_address, myFile);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();

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
    <Form
      form={form}
      name="commission"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item name="title" label="Title">
        <Input placeholder="La Joconde" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea placeholder="aka Mona Lisa, hot portrait of Lisa Gherardini" />
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

      <Form.Item
        name="wallet_address"
        label="Address"
        type="text"
        required
        rules={[{ required: true, message: "add an address to mint to" }]}
      >
        <Input placeholder="0x3123123ksad98asd98asd89jknjk" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Disegno NFT
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MintingFileForm;

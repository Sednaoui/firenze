import React from "react";
import { Form, Input, Button, Select } from "antd";
import { Web3Context } from "../helpers/Web3Context";
import { uploadFileIPFS, uploadMetaDataIPFS } from "../helpers/nftPortAPI";

const CommissionForm = () => {
  const web3 = React.useContext(Web3Context);

  const [loading, setLoading] = React.useState(false);

  const onFinish = async values => {
    setLoading(true);

    const uploadFileResponse = await uploadFileIPFS(myFile);

    const uploadMetaDataResponse = await uploadMetaDataIPFS(
      values.type,
      values.description,
      uploadFileResponse.ipfs_url,
    );
    // TODO: Open stream transaction in smart contract. We will be sending a link from uploadMetaDataResponse.metadata_uri in the stream

    setLoading(false);
    // Show confirmation page of steaming open and information sent to the artisit
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();
  const { Option } = Select;

  const OnTypeChange = value => {
    switch (value) {
      case "Portrait":
        form.setFieldsValue({ note: "3 ETH in 7 days" });
        return;
      case "Landscape":
        form.setFieldsValue({ note: "5 ETH in 14 days" });
        return;
      case "Madonna":
        form.setFieldsValue({ note: "1.5 ETH in 5 days" });
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
  );
};

export default CommissionForm;

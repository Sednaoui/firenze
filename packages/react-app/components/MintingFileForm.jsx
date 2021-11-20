import React from "react";
import { Form, Input, Button, Modal, Space, Row, Col } from "antd";
import { easyMintingWithFileUpload } from "../helpers/nftPortAPI";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Web3Context } from "../helpers/Web3Context";

const MintingFileForm = () => {
  const web3 = React.useContext(Web3Context);

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [tx, setTX] = React.useState({ name: "", description: "", transaction_external_url: "" });

  const onFinish = async values => {
    setLoading(true);
    const response = await easyMintingWithFileUpload("rinkeby", values.title, values.description, web3.address, myFile);

    setIsModalVisible(true);
    setTX(response);
    setLoading(false);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const [loading, setLoading] = React.useState(false);

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
      size="large"
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Mint NFT
        </Button>
      </Form.Item>

      <Modal
        visible={isModalVisible}
        title="Your NFT was Created!"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <Space className="flex-col">
          <Row>{tx.name === "undefined" ? "Nameless" : tx.name}</Row>
          <Row>{tx.description === "undefined" ? "No Description" : tx.description}</Row>
          <Row>
            <Col span={20}>
              <a href={tx.transaction_external_url}>{tx.transaction_external_url}</a>
            </Col>
            <Col>
              <CheckCircleOutlined twoToneColor="#52c41a" />
            </Col>
          </Row>
        </Space>
      </Modal>
    </Form>
  );
};

export default MintingFileForm;

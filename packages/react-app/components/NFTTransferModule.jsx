import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Input, Form, Modal, Space, Row, Col } from "antd";
import React, { useState } from "react";
import { Web3Context } from "../helpers/Web3Context";

export function NFTTransferModule({ isArtist, nftId }) {
  const web3 = React.useContext(Web3Context);

  const [form] = Form.useForm();

  // confirmation modal when NFTs are transfered
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [tx, setTX] = React.useState({ to_address: "", transaction_external_url: "" });

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // handle transfer of NFTs
  const onFinish = async values => {
    setLoading(true);
    const writecontract = web3.writeContracts;
    const response = await web3.tx(writecontract.NFT.safeTransferFrom(web3.address, values.to_address, nftId));

    setTX({ transaction_external_url: `https://polygonscan.com/tx/${response.hash}` });
    setIsModalVisible(true);
    setLoading(false);
  };

  const [loading, setLoading] = React.useState(false);
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return !isArtist ? (
    <h1></h1>
  ) : (
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
        <Form.Item label="To" name="to_address">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Send NFT
          </Button>
        </Form.Item>

        <Modal
          visible={isModalVisible}
          title="Your NFT was Transfered!"
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>,
          ]}
        >
          <Space className="flex-col">
            <Row>
              <Col span={20}>
                <a href={tx.transaction_external_url} rel="noopener noreferrer" target="_blank">
                  Transaction on PolygonScan
                </a>
              </Col>
              <Col>
                <CheckCircleOutlined twoToneColor="#52c41a" />
              </Col>
            </Row>
          </Space>
        </Modal>
      </Form>
    </div>
  );
}
export default NFTTransferModule;

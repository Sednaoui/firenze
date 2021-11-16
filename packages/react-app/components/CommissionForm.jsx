import React from "react";
import { Form, Input, Button, Select, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const CommissionForm = () => {
  const onFinish = values => {
    console.log("Success:", values);
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

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
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

      <Form.Item label="Description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Dragger">
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item name="note" label="Total">
        <Input disabled />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Open Stream
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommissionForm;

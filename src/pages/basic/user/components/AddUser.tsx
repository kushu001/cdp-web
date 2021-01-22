import React, { useState } from 'react';
import { Modal, Form, Input, Row, Col, Radio, Select } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { UserListItem } from '../data';

const { Item } = Form;
const { Option } = Select;

interface UserFormProps {
  isVisible: boolean;
  handleModalVisible: (isVisible: boolean) => void;
  handleAdd: (fields: UserListItem) => Promise<boolean>;
}

const AddUser: React.FC<UserFormProps> = (props) => {
  const [gender, setGender] = useState('0');
  const { isVisible, handleModalVisible, handleAdd } = props;
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const handleOk = async (): Promise<boolean> => {
    const values = await form.validateFields();
    return handleAdd(values as UserListItem);
  };

  const options = [
    { label: '男', value: '0' },
    { label: '女', value: '1' },
    { label: '未知', value: '2' },
  ];

  const onChange = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };

  return (
    <>
      <Modal
        destroyOnClose
        title="新建用户"
        width={800}
        onOk={handleOk}
        onCancel={() => handleModalVisible(false)}
        visible={isVisible}
      >
        <Form {...formItemLayout} form={form}>
          <Row gutter={24}>
            <Col span={12}>
              <Item
                label="用户名"
                name="name"
                rules={[{ required: true, message: '用户名为必填项' }]}
              >
                <Input placeholder="请输入用户名" />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="性别"
                name="gender"
                rules={[{ required: true, message: '性别为必填项' }]}
              >
                <Radio.Group options={options} onChange={onChange} value={gender} />
              </Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Item
                label="联系电话"
                name="tel"
                rules={[{ required: true, message: '联系电话为必填项' }]}
              >
                <Input placeholder="请输入联系电话" />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="联系地址" name="addr">
                <Input placeholder="请输入联系地址" />
              </Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Item label="公司地址" name="company">
                <Input placeholder="请输入公司地址" />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="状态"
                name="status"
                rules={[{ required: true, message: '状态为必填项' }]}
              >
                <Select placeholder="请选择状态">
                  <Option value="0">新建</Option>
                  <Option value="1">正常</Option>
                  <Option value="2">禁用</Option>
                  <Option value="3">异常</Option>
                </Select>
              </Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddUser;

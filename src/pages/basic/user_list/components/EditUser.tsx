import React from 'react';
import { Modal, Form, Input, Row, Col } from 'antd';

const { Item } = Form;

interface UserFormProps {
  isEditVisible: boolean;
  handleEditModalVisible: (isVisible: boolean) => void;
}

const EditUser: React.FC<UserFormProps> = (props) => {
  const { isEditVisible, handleEditModalVisible } = props;
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  return (
    <Modal
      destroyOnClose
      title="编辑用户"
      width={800}
      onCancel={() => handleEditModalVisible(false)}
      visible={isEditVisible}
    >
      <Form {...formItemLayout} form={form}>
        <Row gutter={24}>
          <Col span={12}>
            <Item label="用户名">
              <Input placeholder="请输入用户名" />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="性别">
              <Input placeholder="请选择性别" />
            </Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Item label="联系电话">
              <Input placeholder="请输入联系电话" />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="联系地址">
              <Input placeholder="请输入联系地址" />
            </Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Item label="公司地址">
              <Input placeholder="请输入公司地址" />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="状态">
              <Input placeholder="请选择状态" />
            </Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditUser;

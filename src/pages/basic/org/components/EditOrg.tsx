import React, { useState } from 'react';
import { Modal, Form, Input, Row, Col, Radio, Select } from 'antd';
import { OrgListItem } from '../data';
import { RadioChangeEvent } from 'antd/lib/radio';

const { Item } = Form;
const { Option } = Select;

interface OrgFormProps {
  isEditVisible: boolean;
  handleEditModalVisible: (isVisible: boolean) => void;
  handleUpdate: (fields: OrgListItem) => Promise<boolean>;
  user: OrgListItem | undefined;
}

const EditOrg: React.FC<OrgFormProps> = ({
  isEditVisible,
  handleEditModalVisible,
  user,
  handleUpdate,
}) => {
  const [gender, setGender] = useState('0');
  const [form] = Form.useForm();

  const options = [
    { label: '男', value: '0' },
    { label: '女', value: '1' },
    { label: '未知', value: '2' },
  ];

  const onChange = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };

  const handleOk = async (): Promise<boolean> => {
    let values = await form.validateFields();
    values = {
      id: user?.id,
      ...values,
    };
    return handleUpdate(values as OrgListItem);
  };

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  return (
    <Modal
      destroyOnClose
      title="编辑部门"
      width={800}
      onCancel={() => handleEditModalVisible(false)}
      onOk={handleOk}
      visible={isEditVisible}
    >
      <Form {...formItemLayout} form={form} initialValues={user}>
        <Row gutter={24}>
          <Col span={12}>
            <Item
              label="部门名称"
              name="name"
              rules={[{ required: true, message: '部门名称为必填项' }]}
            >
              <Input placeholder="请输入部门名称" />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="性别" name="gender" rules={[{ required: true, message: '性别为必填项' }]}>
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
            <Item label="状态" name="status" rules={[{ required: true, message: '状态为必填项' }]}>
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
  );
};

export default EditOrg;

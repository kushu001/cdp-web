import React from 'react';
import { Modal, Form, Input, Row, Col, Select } from 'antd';
import { OrgListItem } from '../data';

const { Item } = Form;
const { Option } = Select;

interface OrgFormProps {
  isEditVisible: boolean;
  handleEditModalVisible: (isVisible: boolean) => void;
  handleUpdate: (fields: OrgListItem) => Promise<boolean>;
  org: OrgListItem | undefined;
  orgList: OrgListItem[];
}

const EditOrg: React.FC<OrgFormProps> = ({
  isEditVisible,
  handleEditModalVisible,
  org,
  handleUpdate,
  orgList,
}) => {
  const [form] = Form.useForm();

  const handleOk = async (): Promise<boolean> => {
    let values = await form.validateFields();
    values = {
      id: org?.id,
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
      <Form {...formItemLayout} form={form} initialValues={org}>
        <Row gutter={24}>
          <Col span={12}>
            <Item label="父部门" name="pid">
              <Select
                showSearch
                filterOption={(input, option) => {
                  return option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }}
                placeholder="请选择父部门"
              >
                {orgList
                  ? orgList.map((item: OrgListItem) => {
                      return (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })
                  : null}
              </Select>
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="部门名称"
              name="name"
              rules={[{ required: true, message: '部门名称为必填项' }]}
            >
              <Input placeholder="请输入部门名称" />
            </Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Item
              label="负责人"
              name="manager"
              rules={[{ required: true, message: '负责人为必填项' }]}
            >
              <Input placeholder="请输入负责人姓名" />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="联系电话"
              name="tel"
              rules={[{ required: true, message: '联系电话为必填项' }]}
            >
              <Input placeholder="请输入联系电话" />
            </Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Item label="排序" name="order">
              <Input placeholder="请输入排序" />
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

import React from 'react';
import { Modal, Form, Input, Row, Col, Select } from 'antd';
import { OrgListItem } from '../data';

const { Item } = Form;
const { Option } = Select;

interface OrgFormProps {
  isVisible: boolean;
  handleModalVisible: (isVisible: boolean) => void;
  handleAdd: (fields: OrgListItem) => Promise<boolean>;
  orgList: OrgListItem[];
}

const AddOrg: React.FC<OrgFormProps> = (props) => {
  const { isVisible, handleModalVisible, handleAdd, orgList } = props;
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const handleOk = async (): Promise<boolean> => {
    const values = await form.validateFields();
    return handleAdd(values as OrgListItem);
  };

  return (
    <>
      <Modal
        destroyOnClose
        title="新建部门"
        width={800}
        onOk={handleOk}
        onCancel={() => handleModalVisible(false)}
        visible={isVisible}
      >
        <Form {...formItemLayout} form={form}>
          <Row gutter={24}>
            <Col span={12}>
              <Item label="父部门" name="pid">
                <Select placeholder="请选择父部门">
                  {orgList
                    ? orgList.map((item: OrgListItem) => {
                        return <Option value={item.id}>{item.name}</Option>;
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

export default AddOrg;

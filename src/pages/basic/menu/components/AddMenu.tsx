import React from 'react';
import { Modal, Form, Input, Row, Col, Select } from 'antd';
import { MenuListItem } from '../data';

const { Item } = Form;
const { Option } = Select;

interface MenuFormProps {
  isVisible: boolean;
  handleModalVisible: (isVisible: boolean) => void;
  handleAdd: (fields: MenuListItem) => Promise<boolean>;
  menuList: MenuListItem[];
}

const AddMenu: React.FC<MenuFormProps> = (props) => {
  const { isVisible, handleModalVisible, handleAdd, menuList } = props;
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const handleOk = async (): Promise<boolean> => {
    const values = await form.validateFields();
    return handleAdd(values as MenuListItem);
  };

  return (
    <>
      <Modal
        destroyOnClose
        title="新建菜单"
        width={800}
        onOk={handleOk}
        onCancel={() => handleModalVisible(false)}
        visible={isVisible}
      >
        <Form {...formItemLayout} form={form}>
          <Row gutter={24}>
            <Col span={12}>
              <Item label="上级菜单" name="pid">
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    return option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                  }}
                  placeholder="请选择上级菜单"
                >
                  {menuList
                    ? menuList.map((item: MenuListItem) => {
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
                label="菜单名称"
                name="name"
                rules={[{ required: true, message: '菜单名称为必填项' }]}
              >
                <Input placeholder="请输入菜单名称" />
              </Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Item label="URL" name="url" rules={[{ required: true, message: 'URL为必填项' }]}>
                <Input placeholder="请输入URL" />
              </Item>
            </Col>
            <Col span={12}>
              <Item label="图标" name="icon" rules={[{ required: true, message: '图标为必填项' }]}>
                <Input placeholder="请输入图标" />
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

export default AddMenu;

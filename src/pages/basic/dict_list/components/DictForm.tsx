import React, { useEffect } from 'react';
import { Card, Input, Form, Button, Row, Col, Switch } from 'antd';
import { DictListItem } from '../data';

const { Item } = Form;

interface DictFormProps {
  dict?: DictListItem;
}

const DictForm: React.FC<DictFormProps> = ({ dict }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ...dict,
    });
  });

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
  };

  return (
    <Card
      title="字典明细"
      extra={
        dict?.name ? (
          <Row gutter={24}>
            <Col>
              <Button type="primary" htmlType="submit">
                新建子项
              </Button>
            </Col>
          </Row>
        ) : (
          <></>
        )
      }
    >
      <Form {...formItemLayout} form={form} layout="horizontal">
        <Item label="名称" name="name">
          <Input />
        </Item>
        <Item label="代码" name="code">
          <Input />
        </Item>
        <Item label="排序" name="sorter">
          <Input />
        </Item>
        <Item label="启用状态" name="status">
          <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />
        </Item>
        <Item label="备注" name="remark">
          <Input />
        </Item>
        <Row gutter={24}>
          <Col>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Col>
          <Col>
            <Button danger>删除</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
export default DictForm;

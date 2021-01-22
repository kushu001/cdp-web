import React, { useState, useEffect } from 'react';
import { Card, Input, Form, Button, Row, Col, Switch, message, InputNumber } from 'antd';
import { DictListItem } from '../data';
import { addDictItem, updateDictItem, removeDictItem } from '../service';

const { Item } = Form;

interface DictFormProps {
  dict?: DictListItem;
  dictId?: Number;
  refreshData: () => void;
}

const DictItemForm: React.FC<DictFormProps> = ({ dict, dictId, refreshData }) => {
  const [form] = Form.useForm();

  const [dictItemName, setDictItemName] = useState<string>();

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ...dict,
    });
    setDictItemName(dict?.name);
  }, [dict?.name]);

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

  const resetFormHandler = () => {
    form.resetFields();
  };

  const onFinish = async (values: DictListItem) => {
    const { id } = values;

    try {
      if (id) {
        await updateDictItem({ ...values });
      } else {
        await addDictItem({ ...values }, dictId);
      }
      refreshData();
      message.info('操作成功！');
    } catch (error) {
      message.info('操作失败！');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.info('Failed:', errorInfo);
  };

  const onDeleteHandler = async () => {
    try {
      await removeDictItem(String(dict?.id));
      message.info('删除成功');
      resetFormHandler();
    } catch (error) {
      message.info('删除失败');
    }
  };

  const onChangeDictItemName = ({ target: { value } }: any) => {
    setDictItemName(value);
  };

  return (
    <Card title={`字典明细${dictItemName === undefined ? `` : `-${dictItemName}`}`}>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Item label="名称" name="name">
          <Input onChange={onChangeDictItemName} />
        </Item>
        <Item label="代码" name="code">
          <Input />
        </Item>
        <Item label="排序" name="sorter">
          <InputNumber style={{ width: '100%' }} />
        </Item>
        <Item label="启用状态" name="status" valuePropName="checked">
          <Switch checkedChildren="启用" unCheckedChildren="禁用" />
        </Item>
        <Item label="描述" name="desc">
          <Input />
        </Item>
        <Item name="id" hidden>
          <Input />
        </Item>
        <Row gutter={24}>
          <Col>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Col>
          <Col>
            <Button danger onClick={onDeleteHandler}>
              删除
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
export default DictItemForm;

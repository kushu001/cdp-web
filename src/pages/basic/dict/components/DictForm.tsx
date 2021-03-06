import React, { useEffect } from 'react';
import { Card, Input, Form, Button, Row, Col, Switch, message, InputNumber } from 'antd';
import { DictListItem } from '../data';
import { addDict, removeDict, updateDict } from '../service';

const { Item } = Form;

interface DictFormProps {
  dict?: DictListItem;
  switchCategories: () => void;
  refreshData: () => void;
}

const DictForm: React.FC<DictFormProps> = ({ dict, switchCategories, refreshData }) => {
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

  const resetFormHandler = () => {
    form.resetFields();
  };

  const onFinish = async (values: DictListItem) => {
    const { id } = values;

    try {
      if (id) {
        await updateDict({ ...values });
      } else {
        await addDict({ ...values });
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
      await removeDict(String(dict?.id));
      message.info('删除成功');
      resetFormHandler();
    } catch (error) {
      message.info('删除失败');
    }
  };

  return (
    <Card
      title="字典明细"
      extra={
        dict?.name ? (
          <Row gutter={24}>
            <Col>
              <Button type="primary" onClick={switchCategories}>
                新建子项
              </Button>
            </Col>
          </Row>
        ) : (
          <></>
        )
      }
    >
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Item label="名称" name="name" rules={[{ required: true, message: '名称为必填项' }]}>
          <Input />
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
export default DictForm;

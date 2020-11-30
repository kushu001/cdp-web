import React, { Key, useState } from 'react';
import { Card, Tree, Input, Row, Col, Button } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { PageContainer } from '@ant-design/pro-layout';
import DictForm from './components/DictForm';
import { DictListItem } from './data';
import DictItemForm from './components/DictItemForm';

const { Search } = Input;

const treeData = [
  {
    title: '性别',
    key: '1',
    name: '性别',
    code: 'GENDER',
    sorter: 1,
    remark: '性别',
    children: [
      {
        title: '男',
        key: '11',
        name: '男',
        isLeaf: true,
      },
      {
        title: '女',
        key: '12',
        isLeaf: true,
      },
      {
        title: '未知',
        key: '13',
        isLeaf: true,
      },
    ],
  },
  {
    title: '状态',
    key: '2',
    name: '状态',
    code: 'STATUS',
    sorter: 2,
    remark: '状态',
    children: [
      {
        title: '正常',
        key: '21',
        isLeaf: true,
      },
      {
        title: '禁用',
        key: '22',
        isLeaf: true,
      },
      {
        title: '异常',
        key: '23',
        isLeaf: true,
      },
    ],
  },
];

const DictList: React.FC<{}> = () => {
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(['0-0-0', '0-0-1']);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [dict, setDict] = useState<DictListItem>();
  const [isCategories, setIsCategories] = useState<boolean>(false);

  const onExpand = (expandedKeys1: Key[]) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeys1);
    setAutoExpandParent(false);
  };

  const onSelect = (selectedKeys1: Key[], info: { selected: boolean; node: DataNode }) => {
    setIsCategories(!!info.node.isLeaf);

    const dict1: DictListItem = info.node as DictListItem;
    if (info.selected) {
      setDict({
        ...dict1,
      });
    } else {
      setDict({});
    }

    setSelectedKeys(selectedKeys1);
  };

  const onSearch = (value: string) => {
    return value;
  };

  return (
    <PageContainer>
      <Row gutter={10}>
        <Col span={6}>
          <Card
            title="字典项"
            extra={
              <Row gutter={24}>
                <Col>
                  <Button type="primary" htmlType="submit">
                    新建
                  </Button>
                </Col>
              </Row>
            }
          >
            <Search
              placeholder="请输入"
              allowClear
              enterButton="查询"
              size="large"
              onSearch={onSearch}
              style={{ marginBottom: '10px' }}
            />
            <Tree
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={treeData}
              height={200}
            />
          </Card>
        </Col>
        <Col span={18}>
          {!isCategories ? <DictForm dict={dict} /> : <DictItemForm dict={dict} />}
        </Col>
      </Row>
    </PageContainer>
  );
};

export default DictList;

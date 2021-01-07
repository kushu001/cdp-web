import React, { Key, MouseEvent, useState } from 'react';
import { Card, Tree, Input, Row, Col, Button, message } from 'antd';
import { DataNode, EventDataNode } from 'antd/lib/tree';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import DictForm from './components/DictForm';
import { DictListItem } from './data';
import DictItemForm from './components/DictItemForm';
import styles from './style.less';

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
      },
      {
        title: '女',
        key: '12',
      },
      {
        title: '未知',
        key: '13',
      },
    ],
  },
  {
    title: '状态',
    key: '3',
    name: '状态',
    code: 'STATUS',
    sorter: 2,
    remark: '状态',
    children: [
      {
        title: '正常',
        name: '正常',
        key: '21',
        isLeaf: true,
      },
      {
        title: '禁用',
        name: '禁用',
        key: '22',
        isLeaf: true,
      },
      {
        title: '异常',
        name: '异常',
        key: '23',
        isLeaf: true,
      },
    ],
  },
  {
    title: '状态3',
    key: '5',
    name: '状态3',
    code: 'STATUS3',
    sorter: 2,
    remark: '状态3',
    children: [
      {
        title: '正常3',
        key: '41',
        isLeaf: true,
      },
      {
        title: '禁用3',
        key: '42',
        isLeaf: true,
      },
      {
        title: '异常3',
        key: '43',
        isLeaf: true,
      },
    ],
  },
];

const DictList: React.FC<{}> = () => {
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(['1']);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [dict, setDict] = useState<DictListItem>();
  const [isCategories, setIsCategories] = useState<boolean>(false);
  const [treeDataTest, setTreeDataTest] = useState<DictListItem[]>(treeData);

  const onExpand = (expandedKeys1: Key[]) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeys1);
    setAutoExpandParent(false);
  };

  const onSelect = (selectedKeys1: Key[], info: { selected: boolean; node: DataNode }) => {
    setIsCategories(!!info.node.isLeaf);

    const node: DictListItem = info.node as DictListItem;
    if (info.selected) {
      setDict({
        ...node,
      });
    } else {
      setDict({} as DictListItem);
    }

    setSelectedKeys(selectedKeys1);
  };

  const onDrop = (info: {
    node: EventDataNode;
    dragNode: EventDataNode;
    dropPosition: number;
    dropToGap: boolean;
  }) => {
    const { key: dropKey, pos }: { key: number | string; pos: string } = info.node;
    const { key: dragKey }: { key: number | string } = info.dragNode;
    const dropPos = pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data: DictListItem[], key: string, callback: Function) => {
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].key === key) {
          callback(data[i], i, data);
          break;
        }
        if (data[i].children) {
          loop(data[i].children as DictListItem[], key, callback);
        }
      }
    };

    const dropPosit: string = info.node.pos
      .replaceAll('-', '')
      .substr(0, info.node.pos.replaceAll('-', '').length - 1);
    const dragPosit: string = info.dragNode.pos
      .replaceAll('-', '')
      .substr(0, info.dragNode.pos.replaceAll('-', '').length - 1);
    if (dragPosit !== dropPosit) {
      if (dropPosition !== 0) {
        return;
      }

      if (dropPosition === 0) {
        if (dragPosit.substr(0, dragPosit.length - 1) !== dropPosit) {
          return;
        }
      }
    } else if (dropPosition === 0) {
      return;
    }

    const data = [...treeDataTest];

    let dragObj: DictListItem = { key: '', title: '' };
    loop(data, dragKey as string, (item: DictListItem, index: number, arr: DictListItem[]) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey as string, (item: DictListItem) => {
        const obj = item;

        obj.children = obj.children || [];
        //   // where to insert 示例添加到头部，可以是随意位置
        obj.children.unshift(dragObj);
      });
    } else if (
      (info.node.children || []).length > 0 && // Has children
      info.node.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey as string, (item: DictListItem) => {
        const obj = item;
        obj.children = obj.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        obj.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: DictListItem[] = [];
      let i: number = 0;
      loop(data, dropKey as string, (item: DictListItem, index: number, arr: DictListItem[]) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    setTreeDataTest(data);
  };

  const onSearch = (value: string) => {
    return value;
  };

  const buttonClick = (event: MouseEvent, node: DictListItem) => {
    const ev = event || window.event;
    ev.stopPropagation();
    message.info(node.name);
  };

  const onRenderNode = (node: DataNode) => {
    const treeNode: DictListItem = node as DictListItem;
    return (
      <Row className={styles.hover} justify="space-between">
        <Col>{treeNode.title}</Col>
        <Col>
          <ArrowUpOutlined
            title="上移"
            onClick={(e) => buttonClick(e, treeNode)}
            className={styles.button}
          />
          <ArrowDownOutlined
            title="下移"
            onClick={(e) => buttonClick(e, treeNode)}
            className={styles.button}
          />
        </Col>
      </Row>
    );
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
              treeData={treeDataTest}
              titleRender={onRenderNode}
              // height={200}
              draggable
              // onDragEnter={onDragEnter}
              onDrop={onDrop}
              // onDragEnd={onDragEnd}
              // onDragLeave={onDragLeave}
              // onDragOver={onDragOver}
              // onDragStart={onDragStart}
              blockNode
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

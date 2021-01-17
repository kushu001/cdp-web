import React, { Key, MouseEvent, useState, useEffect } from 'react';
import { Card, Tree, Input, Row, Col, Button, message } from 'antd';
import { DataNode, EventDataNode } from 'antd/lib/tree';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import DictForm from './components/DictForm';
import { DictListItem } from './data';
import { queryDict } from './service';
import DictItemForm from './components/DictItemForm';
import styles from './style.less';

const { Search } = Input;

const DictList: React.FC<{}> = () => {
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(['1']);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [dict, setDict] = useState<DictListItem>();
  const [dictId, setDictId] = useState<Number>();
  const [isCategories, setIsCategories] = useState<boolean>(false);
  const [treeData, setTreeData] = useState<DictListItem[]>([]);

  useEffect(() => {
    (async () => {
      const result = await queryDict();
      setTreeData(result.data);
    })();
  }, []);

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

    let allow: boolean = true;
    if (info.node.pos === info.dragNode.pos) {
      allow = false;
    }
    if (dragPosit !== dropPosit) {
      if (dropPosition !== 0) {
        allow = false;
      }

      if (dropPosition === 0) {
        if (dragPosit.substr(0, dragPosit.length - 1) !== dropPosit) {
          allow = false;
        }
        if (info.node.pos.replaceAll('-', '') !== dragPosit) {
          allow = false;
        }
      }
    } else if (dropPosition === 0) {
      allow = false;
    }

    if (!allow) {
      message.error('只能同级移动！');
      return;
    }

    const data = [...treeData];

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
        // where to insert 示例添加到头部，可以是随意位置
        obj.children.unshift(dragObj);
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

    setTreeData(data);
  };

  const onSearch = (value: string) => {
    return value;
  };

  const buttonClick = (event: MouseEvent, node: DictListItem) => {
    const ev = event || window.event;
    ev.stopPropagation();
    message.info(node.name);
  };

  const switchCategories = () => {
    setIsCategories(!isCategories);
    setDictId(dict?.id);
    setDict({} as DictListItem);
  };

  const onCreateDict = () => {
    setIsCategories(!isCategories);
    setDict({} as DictListItem);
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
                  <Button type="primary" onClick={onCreateDict}>
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
              titleRender={onRenderNode}
              draggable
              onDrop={onDrop}
              blockNode
            />
          </Card>
        </Col>
        <Col span={18}>
          {!isCategories ? (
            <DictForm dict={dict} switchCategories={switchCategories} />
          ) : (
            <DictItemForm dictId={dictId} dict={dict} />
          )}
        </Col>
      </Row>
    </PageContainer>
  );
};

export default DictList;

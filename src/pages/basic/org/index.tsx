import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Row, Col, Popconfirm, Badge } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { OrgListItem } from './data';
import { queryOrg, addOrg, removeOrg, updateOrg } from './service';
import AddOrg from './components/AddOrg';
import EditOrg from './components/EditOrg';

const status = {
  0: { text: '新建', badge: 'default' },
  1: { text: '正常', badge: 'success' },
  2: { text: '禁用', badge: 'error' },
  3: { text: '异常', badge: 'warning' },
};

const gender = {
  0: '男',
  1: '女',
  2: '未知',
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: OrgListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeOrg(selectedRows.map((row) => row.id).join(','));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const OrgList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(false);
  const [viewModalVisible, handleViewModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [user, setOrg] = useState<OrgListItem>();
  const [selectedRowsState, setSelectedRows] = useState<OrgListItem[]>([]);

  /**
   * 添加用户
   * @param fields
   */
  const handleAdd = async (fields: OrgListItem): Promise<boolean> => {
    const hide = message.loading('正在添加');
    try {
      await addOrg({ ...fields });
      hide();
      message.success('添加成功');
      if (actionRef.current) {
        actionRef.current.reload();
      }
      handleModalVisible(false);
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };

  /**
   * 编辑用户
   * @param fields
   */
  const handleUpdate = async (fields: OrgListItem): Promise<boolean> => {
    const hide = message.loading('正在修改');
    try {
      await updateOrg({ ...fields });
      hide();
      message.success('修改成功');
      if (actionRef.current) {
        actionRef.current.reload();
      }
      handleEditModalVisible(false);
      return true;
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
      return false;
    }
  };

  const columns: ProColumns<OrgListItem>[] = [
    {
      title: '部门名称',
      dataIndex: 'name',
    },
    {
      title: '负责人',
      dataIndex: 'manager',
    },
    {
      title: '联系电话',
      dataIndex: 'tel',
    },
    {
      title: '排序',
      dataIndex: 'order',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '新建', status: 'Default' },
        1: { text: '正常', status: 'Success' },
        2: { text: '禁用', status: 'Error' },
        3: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleEditModalVisible(true);
              setOrg(record);
            }}
          >
            编辑
          </a>
          <a
            style={{ marginLeft: '10px' }}
            onClick={() => {
              handleViewModalVisible(true);
              setOrg(record);
            }}
          >
            查看
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<OrgListItem>
        headerTitle="用户查询"
        actionRef={actionRef}
        rowKey="id"
        tableAlertRender={false}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="add" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params) =>
          queryOrg({ ...params }).then((resp: any) => {
            return {
              data: resp.data.records,
              current: params?.current,
              pageSize: params?.pageSize,
              success: resp.code === 200,
              total: resp.data.total,
            };
          })
        }
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Popconfirm
            title="确认记录删除？"
            onConfirm={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
            okText="确认"
            cancelText="取消"
          >
            <Button type="primary" danger>
              批量删除
            </Button>
          </Popconfirm>
        </FooterToolbar>
      )}
      {createModalVisible ? (
        <AddOrg
          isVisible={createModalVisible}
          handleModalVisible={handleModalVisible}
          handleAdd={handleAdd}
        />
      ) : null}
      {editModalVisible ? (
        <EditOrg
          isEditVisible={editModalVisible}
          handleEditModalVisible={handleEditModalVisible}
          handleUpdate={handleUpdate}
          user={user}
        />
      ) : null}
      <Drawer
        width={600}
        visible={viewModalVisible}
        onClose={() => {
          setOrg(undefined);
          handleViewModalVisible(false);
        }}
        closable={false}
      >
        {user?.name && (
          <>
            <Row gutter={[24, 20]} style={{ fontSize: '24px' }}>
              查看部门信息
            </Row>
            <Row gutter={[24, 20]}>
              <Col span={4}>用户名</Col>
              <Col span={8}>{user.name}</Col>
              <Col span={4}>性别</Col>
              <Col span={8}>{gender[user.gender]}</Col>
            </Row>
            <Row gutter={[24, 20]}>
              <Col span={4}>联系电话</Col>
              <Col span={8}>{user.tel}</Col>
              <Col span={4}>联系地址</Col>
              <Col span={8}>{user.addr}</Col>
            </Row>
            <Row gutter={[24, 20]}>
              <Col span={4}>公司地址</Col>
              <Col span={8}>{user.company}</Col>
              <Col span={4}>状态</Col>
              <Col span={8}>
                <Badge status={status[user.status].badge} />
                {status[user.status].text}
              </Col>
            </Row>
          </>
        )}
      </Drawer>
    </PageContainer>
  );
};

export default OrgList;

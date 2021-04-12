import * as Icon from '@ant-design/icons';
import { Button, message, Drawer, Row, Col, Popconfirm, Badge } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { MenuListItem } from './data';
import { queryMenu, addMenu, removeMenu, updateMenu, queryAllMenu } from './service';
import AddMenu from './components/AddMenu';
import EditMenu from './components/EditMenu';

const status = {
  0: { text: '新建', badge: 'default' },
  1: { text: '正常', badge: 'success' },
  2: { text: '禁用', badge: 'error' },
  3: { text: '异常', badge: 'warning' },
};

const renderIcon = (name: string) =>
  React.createElement(Icon && (Icon as any)[name], { style: { fontSize: '16px' } });

const MenuList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(false);
  const [viewModalVisible, handleViewModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [menu, setMenu] = useState<MenuListItem>();
  const [menuList, setMenuList] = useState<MenuListItem[]>([]);
  const [selectedRowsState, setSelectedRows] = useState<MenuListItem[]>([]);

  const refreshData = async () => {
    const result = await queryAllMenu();
    setMenuList(result.data);
  };

  useEffect(() => {
    refreshData();
  }, []);

  /**
   *  删除节点
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: MenuListItem[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      await removeMenu(selectedRows.map((row) => row.id)[0]);
      hide();
      refreshData();
      message.success('删除成功，即将刷新');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  /**
   * 添加用户
   * @param fields
   */
  const handleAdd = async (fields: MenuListItem): Promise<boolean> => {
    const hide = message.loading('正在添加');
    try {
      await addMenu({ ...fields });
      hide();
      message.success('添加成功');
      if (actionRef.current) {
        actionRef.current.reload();
        refreshData();
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
  const handleUpdate = async (fields: MenuListItem): Promise<boolean> => {
    const hide = message.loading('正在修改');
    try {
      await updateMenu({ ...fields });
      hide();
      message.success('修改成功');
      if (actionRef.current) {
        actionRef.current.reload();
        refreshData();
      }
      handleEditModalVisible(false);
      return true;
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
      return false;
    }
  };

  const columns: ProColumns<MenuListItem>[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: 'URL',
      dataIndex: 'url',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      render: (_, record) => {
        return <>{renderIcon(record.icon ? record.icon : '')}</>;
      },
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
              setMenu(record);
            }}
          >
            编辑
          </a>
          <a
            style={{ marginLeft: '10px' }}
            onClick={() => {
              handleViewModalVisible(true);
              setMenu(record);
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
      <ProTable<MenuListItem>
        headerTitle="菜单查询"
        actionRef={actionRef}
        rowKey="id"
        tableAlertRender={false}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="add" onClick={() => handleModalVisible(true)}>
            {/* <PlusOutlined /> 新建 */}
            {renderIcon('PlusOutlined')}新建
          </Button>,
        ]}
        request={(params) =>
          queryMenu({ ...params }).then((resp: any) => {
            return {
              data: resp.data,
            };
          })
        }
        pagination={false}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setMenu(selectedRows[0]);
            setSelectedRows(selectedRows);
          },
          selectedRowKeys: selectedRowsState.map((item) => item.id),
          type: 'radio',
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              当前选项 <a style={{ fontWeight: 600 }}>{menu?.name}</a>,删除此项时，其子项也会删除
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
              删除
            </Button>
          </Popconfirm>
        </FooterToolbar>
      )}
      {createModalVisible ? (
        <AddMenu
          isVisible={createModalVisible}
          handleModalVisible={handleModalVisible}
          menuList={menuList}
          handleAdd={handleAdd}
        />
      ) : null}
      {editModalVisible ? (
        <EditMenu
          isEditVisible={editModalVisible}
          handleEditModalVisible={handleEditModalVisible}
          handleUpdate={handleUpdate}
          menuList={menuList}
          menu={menu}
        />
      ) : null}
      <Drawer
        width={600}
        visible={viewModalVisible}
        onClose={() => {
          setMenu(undefined);
          handleViewModalVisible(false);
        }}
        closable={false}
      >
        {menu?.name && (
          <>
            <Row gutter={[24, 20]} style={{ fontSize: '24px' }}>
              查看部门信息
            </Row>
            <Row gutter={[24, 20]}>
              <Col span={4}>上级菜单</Col>
              <Col span={8}>{menuList.find((item) => item.id === menu.pid)?.name}</Col>
              <Col span={4}>菜单名称</Col>
              <Col span={8}>{menu.name}</Col>
            </Row>
            <Row gutter={[24, 20]}>
              <Col span={4}>路由</Col>
              <Col span={8}>{menu.url}</Col>
              <Col span={4}>图标</Col>
              <Col span={8}>{menu.icon}</Col>
            </Row>
            <Row gutter={[24, 20]}>
              <Col span={4}>排序</Col>
              <Col span={8}>{menu.order}</Col>
              <Col span={4}>状态</Col>
              <Col span={8}>
                <Badge status={status[menu.status].badge} />
                {status[menu.status].text}
              </Col>
            </Row>
          </>
        )}
      </Drawer>
    </PageContainer>
  );
};

export default MenuList;

import { OrgTreeItem } from '@/pages/basic/org/data';
import { Tree } from 'antd';
import React from 'react';

const { TreeNode } = Tree;

interface TreeProps {
  treeData: OrgTreeItem[];
}

const renderTreeNode = (treeData: OrgTreeItem[]): any => {
  return treeData.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.name} key={item.id}>
          {renderTreeNode(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.name} key={item.id} />;
  });
};

const CTree: React.FC<TreeProps> = ({ treeData }) => {
  return (
    <>
      <Tree>{renderTreeNode(treeData)}</Tree>
    </>
  );
};

export default CTree;

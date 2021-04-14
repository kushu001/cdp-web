import { OrgTreeItem } from '@/pages/basic/org/data';
import { Tree } from 'antd';
import React, { ReactNode } from 'react';

const { TreeNode } = Tree;

interface TreeProps {
  treeData: OrgTreeItem[];
}

const renderTreeNode = (treeData: OrgTreeItem[]): ReactNode => {
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
  return <Tree>{renderTreeNode(treeData)}</Tree>;
};

export default CTree;

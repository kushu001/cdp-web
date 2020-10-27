import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 珠峰科技荣誉出品"
    links={[
      {
        key: 'Chomolungma',
        title: 'Chomolungma 官方网站',
        href: 'http://www.chomolungma.com.cn/',
        blankTarget: true,
      },
      {
        key: 'kushu001',
        title: <GithubOutlined />,
        href: 'https://github.com/kushu001',
        blankTarget: true,
      },
      {
        key: 'Xiao Tao Qi',
        title: '小淘气的站点',
        href: 'http://www.xiaotaoqi.me',
        blankTarget: true,
      },
    ]}
  />
);

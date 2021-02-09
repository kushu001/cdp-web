// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Chomolungma Development Platform',
    locale: true,
    siderWidth: 208,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },

    {
      path: '/welcome',
      name: 'welcome',
      icon: 'smile',
      component: './Welcome',
    },
    {
      path: '/basic',
      name: 'basic',
      icon: 'AppstoreOutlined',
      routes: [
        {
          path: '/basic/menu',
          name: 'menu',
          icon: 'smile',
          component: './basic/menu',
        },
        {
          path: '/basic/user',
          name: 'user',
          icon: 'smile',
          component: './basic/user',
        },
        {
          path: '/basic/org',
          name: 'org',
          icon: 'smile',
          component: './basic/org',
        },
        {
          path: '/basic/dict',
          name: 'dict',
          icon: 'smile',
          component: './basic/dict',
        },
        {
          path: '/basic/log',
          name: 'log',
          icon: 'smile',
          routes: [
            {
              path: '/basic/log/operate',
              name: 'operate',
              icon: 'smile',
              component: './basic/dict',
            },
            {
              path: '/basic/log/login',
              name: 'login',
              icon: 'smile',
              component: './basic/dict',
            },
          ],
        },
        // {
        //   path: '/basic/baseTable',
        //   name: 'user',
        //   icon: 'UserOutlined',
        //   component: './ListTableList',
        // },
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      icon: 'crown',
      access: 'canAdmin',
      component: './Admin',
      routes: [
        {
          path: '/admin/sub-page',
          name: 'sub-page',
          icon: 'smile',
          component: './Welcome',
        },
      ],
    },
    // {
    //   name: 'user.list',
    //   icon: 'table',
    //   path: '/userList',
    //   component: './UserList',
    // },
    {
      path: '/',
      redirect: '/welcome',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});

import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#D01E22',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
    defaultOpenAll: true,
  },
  title: 'Chomolungma Development Platform',
  pwa: false,
  logo: '/logo.png',
  iconfontUrl: '',
} as LayoutSettings & {
  pwa: boolean;
};

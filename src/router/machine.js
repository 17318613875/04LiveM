const _import = require('@/libs/util.import.' + process.env.NODE_ENV);

export default [
  {
    path: 'TempConfig',
    name: 'TempConfig',
    component: _import('MachineM/TempConfig/index'),
    meta: {
      title: '模版配置',
      icon: '',
    },
  },
  {
    path: 'CodeM',
    name: 'CodeM',
    component: _import('MachineM/CodeM/index'),
    meta: {
      title: '提交编码',
      icon: '',
    },
  },
  {
    path: 'LiveSourceM',
    name: 'LiveSourceM',
    component: _import('MachineM/LiveSourceM/index'),
    meta: {
      title: '直播源管理',
      icon: '',
    },
  },
];

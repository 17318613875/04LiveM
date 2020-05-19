const _import = require('@/libs/util.import.' + process.env.NODE_ENV);

export default [
  {
    path: 'Create',
    name: 'Create',
    component: _import('CodeM/Create/index'),
    meta: {
      title: '创建编码',
      icon: '',
    },
  },
  {
    path: 'Edit',
    name: 'Edit',
    component: _import('CodeM/Edit/index'),
    meta: {
      title: '编辑编码',
      icon: '',
    },
  },
];

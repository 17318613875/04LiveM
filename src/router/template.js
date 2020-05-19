const _import = require('@/libs/util.import.' + process.env.NODE_ENV);

export default [
  {
    path: 'Create',
    name: 'Create',
    component: _import('TemplateM/Create/index'),
    meta: {
      title: '新建模版',
      icon: '',
    },
  },
  {
    path: 'Edit',
    name: 'Edit',
    component: _import('TemplateM/Edit/index'),
    meta: {
      title: '编辑模版',
      icon: '',
    },
  },
];

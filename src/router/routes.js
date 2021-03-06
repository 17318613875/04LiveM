/*
 * @Description: router
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-10-25 09:45:58
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-28 10:01:23
 */
import layoutHeaderAside from '@/layout/header-aside';

// import users from './modules/users'
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV);

/**
 * 在主框架内显示
 */
import Machine from '@/router/machine';
// import Template from '@/router/template';

export const userFrameIn = [
  {
    path: 'MachineM',
    name: 'MachineM',
    component: _import('MachineM/index'),
    children: Machine,
    meta: { icon: '', title: '机位管理' },
  },
  {
    path: 'DeviceM',
    name: 'DeviceM',
    component: _import('DeviceM/page'),
    meta: { icon: '', title: '设备管理' },
  },
  {
    path: 'TemplateM',
    name: 'TemplateM',
    component: _import('TemplateM/page'),
    // children: Template,
    meta: { icon: '', title: '模板管理' },
  },
  {
    path: 'CodeIDM',
    name: 'CodeIDM',
    component: _import('CodeIDM/index'),
    meta: { icon: '', title: '编码ID管理' },
  },
  {
    path: 'CodeLogM',
    name: 'CodeLogM',
    component: _import('CodeLogM/index'),
    meta: { icon: '', title: '编码日志管理' },
  },
];

const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true,
          cache: true,
        },
        component: _import('system/index'),
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
        },
        component: _import('system/log'),
      },
      ...userFrameIn,
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh'),
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect'),
      },
    ],
  },
  // users
];

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login'),
  },
];

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404'),
  },
];

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage];

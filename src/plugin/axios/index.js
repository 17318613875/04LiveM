/*
 * @Description: axios
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-08-26 18:27:40
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-16 16:07:29
 */
import store from '@/store';
import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import util from '@/libs/util';
import router from '@/router';
let isTrue = false;
// 创建一个错误
/* function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
} */

// 记录和显示错误
function errorLog(error) {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error,
    },
  });
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>');
    console.log(error);
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000,
  });
}
axios.defaults.withCredentials = false;
// 创建一个 axios 实例
const service = axios.create();

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理
    const token = util.cookies.get('acl_token');
    const userId = util.cookies.get('uuid');
    config.headers['userNum'] = userId;

    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['other'] = JSON.stringify({
      'X-Token': token,
      'X-UserId': userId,
      // 'X-Account': store.state.d2admin.user.info.account,
      // 'X-MenuId': window.localStorage['menuId'],
      // 'X-Names': encodeURIComponent(window.localStorage['menuName']),
    });
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    const { code } = dataAxios;
    // 根据 code 进行判断
    if (code === undefined || code === 200) {
      return dataAxios;
    } else if (code === 1004 || code === 1006) {
      if (!isTrue) {
        isTrue = true;
        if (/\.imgo\.tv/.test(window.location.host)) {
          util.cookies.set('acl_token', '', { domain: '.imgo.tv', path: '/' });
        } else {
          util.cookies.set('acl_token', '');
        }
        util.cookies.remove('uuid');
        // 清空 vuex 用户信息
        store.dispatch('d2admin/user/set', {}, { root: true });
        router.currentRoute.name !== 'login' &&
          MessageBox.alert('由于您长时间未操作,已自动退出,请重新登录。', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            callback: () => {
              // 跳转路由
              isTrue = false;
              router.push({
                name: 'login',
              });
            },
          });
        // Promise.reject(dataAxios)
      }
    } else if (code === 1005) {
      store.commit('d2admin/loading/updateLoading', { isLoading: false });
      Message({
        message: '用户权限不够',
        type: 'error',
        duration: 5 * 1000,
      });
    } else {
      store.commit('d2admin/loading/updateLoading', { isLoading: false });
      Message({
        message: dataAxios.msg,
        type: 'error',
        duration: 5 * 1000,
      });
    }
    return Promise.reject(dataAxios);
  },
  (error) => {
    store.commit('d2admin/loading/updateLoading', { isLoading: false });
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          break;
        case 401:
          error.message = '未授权，请登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器内部错误';
          break;
        case 501:
          error.message = '服务未实现';
          break;
        case 502:
          error.message = '网关错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网关超时';
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          break;
        default:
          break;
      }
    } else {
      error.message = '请求超时,请稍后再试';
    }
    errorLog(error);
    return Promise.reject(error);
  }
);

export default service;

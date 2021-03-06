/*
 * @Description: account
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-08-26 18:27:40
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-25 15:17:17
 */
import { MessageBox } from 'element-ui';
import router from '@/router';
import apiModel from '@api/index';
import util from '@/libs/util';
import { userFrameIn } from '@/router/routes';

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} param context
     * @param {Object} param userAccount {String} 用户账号
     * @param {Object} param userPassword {String} 密码
     * @param {Object} param route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    login({ dispatch }, json) {
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        apiModel.login
          .AccountLogin({
            ...json,
          })
          .then(async (ret) => {
            var res = ret.data;
            var userDo = res.userDo;
            // 设置 cookie 一定要存 uuid 和 token 两个 cookie
            // 整个系统依赖这两个数据进行校验和存储
            // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
            // token 代表用户当前登录状态 建议在网络请求中携带 token
            // 如有必要 token 需要定时更新，默认保存一天
            if (/\.imgo\.tv/.test(window.location.host)) {
              util.cookies.set('acl_token', res.token, { domain: '.imgo.tv', path: '/' });
            } else {
              util.cookies.set('acl_token', res.token);
            }
            util.cookies.set('uuid', userDo.id);
            util.cookies.set('userAccount', userDo.userAccount);
            util.cookies.set('nickName', userDo.nickName);

            if (res.menuList && res.menuList.length === 0) {
              MessageBox.alert('您的账号未分配权限,请联系管理员', '提示', {
                confirmButtonText: '确定',
                type: 'warning',
              });
            } else {
              // 设置 vuex 用户信息
              await dispatch(
                'd2admin/user/set',
                {
                  name: userDo.nickName,
                  account: userDo,
                },
                { root: true }
              );
              apiModel.login
                .AccountMenu({
                  userId: userDo.id,
                })
                .then(async ({ data }) => {
                  // 用户登录后从持久化数据加载一系列的设置
                  const menuList = [];
                  userFrameIn.forEach(({ path, name, children }) => {
                    const path_ = `/${path}`;
                    const target = data.find(({ link }) => link === path_);
                    if (target) {
                      const router = {
                        title: target.menuName,
                        path: path_,
                        name,
                        icon: target.icon,
                        meta: {
                          actionList: (target.actionList || []).map(({ actionCode, menuId, actionName, permission }) => ({ actionCode, menuId, actionName, permission })),
                        },
                      };
                      if (children) {
                        let childrenList = [];
                        children.forEach(({ path: childPath, name: childName }) => {
                          const path_ = `/${path}/${childPath}`;
                          const childTarget = data.find(({ link }) => link === `/${path}/${childPath}`);
                          childTarget &&
                            childrenList.push({
                              title: childTarget.menuName,
                              path: path_,
                              name: childName,
                              icon: childTarget.icon,
                              meta: {
                                actionList: (childTarget.actionList || []).map(({ actionCode, menuId, actionName, permission }) => ({ actionCode, menuId, actionName, permission })),
                              },
                            });
                        });
                        childrenList.length && (router.children = childrenList);
                      }
                      menuList.push(router);
                    }
                  });
                  // const menuList = data.map(({ menuName, icon, link, actionList }) => {});
                  await this.commit('d2admin/menu/asideSet', menuList || []);
                  // window.localStorage['usersMenuList'] = JSON.stringify(res.data)
                  await dispatch('d2admin/user/setMenuList', menuList, {
                    root: true,
                  });
                  await dispatch('load');
                });
            }
            // 结束
            resolve();
          })
          .catch((err) => {
            console.log('err: ', err);
            reject(err);
          });
      });
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} param context
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    logout({ commit, dispatch }, { confirm = false } = {}) {
      /**
       * @description 注销
       */
      async function logout() {
        // 删除cookie
        if (/\.imgo\.tv/.test(window.location.host)) {
          util.cookies.set('acl_token', '', { domain: '.imgo.tv', path: '/' });
        } else {
          util.cookies.set('acl_token', '');
        }
        util.cookies.remove('uuid');
        // 清空 vuex 用户信息
        await dispatch('d2admin/user/set', {}, { root: true });
        // 跳转路由
        router.push({
          name: 'login',
        });
      }
      // 判断是否需要确认
      if (confirm) {
        commit('d2admin/gray/set', true, { root: true });
        MessageBox.confirm('注销当前账户吗?', '确认操作', {
          confirmButtonText: '确定注销',
          cancelButtonText: '放弃',
          type: 'warning',
        })
          .then(() => {
            commit('d2admin/gray/set', false, { root: true });
            logout();
          })
          .catch(() => {
            commit('d2admin/gray/set', false, { root: true });
          });
      } else {
        logout();
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} state vuex state
     */
    load({ dispatch }) {
      return new Promise(async (resolve) => {
        await dispatch('d2admin/user/loadMenuList', null, { root: true });
        // DB -> store 加载用户名
        await dispatch('d2admin/user/load', null, { root: true });
        // DB -> store 加载主题
        await dispatch('d2admin/theme/load', null, { root: true });
        // DB -> store 加载页面过渡效果设置
        await dispatch('d2admin/transition/load', null, { root: true });
        // DB -> store 持久化数据加载上次退出时的多页列表
        await dispatch('d2admin/page/openedLoad', null, { root: true });
        // DB -> store 持久化数据加载侧边栏折叠状态
        await dispatch('d2admin/menu/asideCollapseLoad', null, { root: true });
        // DB -> store 持久化数据加载全局尺寸
        await dispatch('d2admin/size/load', null, { root: true });

        await dispatch('d2admin/menu/load', null, { root: true });
        // end
        resolve();
      });
    },
  },
};

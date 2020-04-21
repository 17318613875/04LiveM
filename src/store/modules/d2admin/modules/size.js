/*
 * @Description:size
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-08-26 18:27:40
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-23 13:04:15
 */
import Vue from 'vue'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    // 尺寸
    value: '' // medium small mini
  },
  actions: {
    /**
     * @description 将当前的设置应用到 element
     * @param {Boolean} refresh 是否在设置之后刷新页面
     */
    apply ({ state, commit }, refresh) {
      Vue.prototype.$ELEMENT.size = state.value
      if (refresh) {
        commit('d2admin/page/keepAliveClean', null, { root: true })
        router.replace('/refresh')
      }
    },
    /**
     * @description 确认已经加载组件尺寸设置 https://github.com/d2-projects/d2-admin/issues/198
     */
    isLoaded ({ state }) {
      if (state.value) return Promise.resolve()
      return new Promise(resolve => {
        const timer = setInterval(() => {
          if (state.value) {
            resolve(clearInterval(timer))
          }
        }, 10)
      })
    },
    /**
     * @description 设置尺寸
     * @param {Object} state vuex state
     * @param {String} size 尺寸
     */
    set ({ state, dispatch }, size) {
      return new Promise(async resolve => {
        // store 赋值
        state.value = size
        // 应用
        // dispatch('apply', true)
        // 持久化
        await dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'size.value',
          value: state.value,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从持久化数据读取尺寸设置
     * @param {Object} state vuex state
     */
    load ({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.value = await dispatch('d2admin/db/get', {
          dbName: 'sys',
          path: 'size.value',
          defaultValue: 'small',
          user: true
        }, { root: true })
        // 应用
        // dispatch('apply')
        // end
        resolve()
      })
    }
  }
}

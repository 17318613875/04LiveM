/*
 * @Description: auth
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-09-02 18:30:32
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-15 15:56:46
 */
import Vue from 'vue'
import router from '../router'
import store from '@/store/index'

/** 权限指令**/
Vue.directive('has', {
  inserted: (el, binding) => {
    // console.log(el.parentNode)
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el)
      // el.style.display = 'none'
    }
  }
})
/* 展示 */
Vue.directive('hasShow', {
  inserted: (el, binding) => {
    if (Vue.prototype.$_hasShow(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})

// 是否展示
Vue.prototype.$_hasShow = function (value) {
  let isExist = true
  // 权限列表
  let buttonperms = store.state.d2admin.user.usersMenuList
  for (let i = 0; i < buttonperms.length; i++) {
    if (buttonperms[i].link === router.currentRoute.path) {
      for (let index = 0; index < buttonperms[i].actionList.length; index++) {
        const items = buttonperms[i].actionList[index]
        if (value.indexOf(items.actionCode) > -1) {
          isExist = false
          return isExist
        }
      }
    }
  }
  return isExist
}
// 权限检查方法
Vue.prototype.$_has = function (value) {
  let data = store.state.d2admin.user.usersMenuList
  let result = data.filter(items => { return items.link === router.currentRoute.path })
  return result[0].actionList.some(item => item.actionCode === value)
}

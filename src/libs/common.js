/*
 * @Description: common
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-09-05 14:49:32
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-25 15:39:50
 */
import router from '../router'
import store from '@/store/index'
var common = {
  getColumnWidth: function (value) { // 动态计算权限按钮table宽度
    let number = 0
    number = value.indexOf(0) > -1 ? 1 : 0
    let buttonperms = store.state.d2admin.user.usersMenuList
    for (let i = 0; i < buttonperms.length; i++) {
      if (buttonperms[i].link === router.currentRoute.path) {
        for (let index = 0; index < buttonperms[i].actionList.length; index++) {
          const items = buttonperms[i].actionList[index]
          if (value.indexOf(items.actionCode) > -1) {
            number++
          }
        }
      }
    }
    return number * (store.state.d2admin.size.value === 'medium' ? 86 : 73)
  }
}
export default common

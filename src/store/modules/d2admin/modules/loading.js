import { Loading } from 'element-ui'
let loadingInstance = null

export default {
  namespaced: true,
  state: {
    isLoading: true
  },
  mutations: {
    updateLoading (state, payload) {
      if (payload.isLoading) {
        loadingInstance = Loading.service({
          lock: true,
          text: '努力加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      } else {
        loadingInstance && loadingInstance.close()
      }
      state.isLoading = payload.isLoading
    }
  }
}

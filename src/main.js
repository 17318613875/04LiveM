/*
 * @Description: main
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-08-26 18:27:40
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-25 15:16:04
 */
// Vue
import Vue from 'vue';
import App from './App';
// 核心插件
import d2Admin from '@/plugin/d2admin';
// store
import store from '@/store/index';
import { mapActions } from 'vuex';
// 多国语
// import i18n from './i18n'
// 菜单和路由设置
import router from './router';
// import menuHeader from '@/menu/header'
import { frameInRoutes } from '@/router/routes';
import api from '@/api/index';
import tools from '@/libs/common';
import './libs/authAction';
import utils from '@/libs/util';

Vue.prototype.$api = api;
Vue.prototype.$tools = tools;

// 核心插件
Vue.use(d2Admin);

new Vue({
  router,
  store,
  // i18n,
  render: (h) => h(App),
  methods: {
    // eslint-disable-next-line no-undef
    ...mapActions('d2admin/account', ['login']),
  },
  created() {
    // 单点登录验证
    const token = utils.cookies.get('acl_token')
    token &&
      this.login({ token }).then(() => {
        // 重定向对象不存在则返回顶层路径
        this.$store.commit('d2admin/loading/updateLoading', {
          isLoading: false,
        });
        this.$router.currentRoute.name === 'login' && this.$router.replace('index');
      });
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes);
    // 设置顶栏菜单
    // this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    // this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    // this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted() {
    // 展示系统信息
    // this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load');
    // 获取并记录用户 UA
    // this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen');
  },
}).$mount('#app');

import util from '@/libs/util';

export default {
  install(Vue) {
    Vue.prototype.$util = util;
    Vue.prototype.$open = util.open;
  },
};

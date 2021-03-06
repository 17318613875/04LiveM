import Vue from 'vue';

import d2Container from './d2-container';
import d2Icon from './d2-icon/index.vue';
import d2IconSvg from './d2-icon-svg/index.vue';
// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container);
Vue.component('d2-icon', d2Icon);
Vue.component('d2-icon-svg', d2IconSvg);

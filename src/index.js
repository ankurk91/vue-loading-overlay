import Component from './js/Component.vue';
import LoadingApi from './js/api';
import './css/index.css';

const Plugin = (Vue, props = {}, slots = {}) => {
  let api = LoadingApi(Vue, props, slots);
  Vue.$loading = api;
  Vue.prototype.$loading = api;
};

Component.install = Plugin;

export default Component;

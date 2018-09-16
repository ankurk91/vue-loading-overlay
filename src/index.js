import Component from './js/Component.vue';
import LoadingApi from './js/api';
import './css/index.css';

const Plugin = (Vue, options = {}) => {
  Vue.$loading = LoadingApi;
  Vue.prototype.$loading = LoadingApi;
};

Component.install = Plugin;

export default Component;

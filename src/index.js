import Component from './js/Component.vue';
import LoadingApi from './js/api';
import './scss/index.scss';

const Plugin = (Vue, options = {}) => {
  Vue.$loading = LoadingApi;
  Vue.prototype.$loading = LoadingApi;
};

Component.install = Plugin;

export default Component;

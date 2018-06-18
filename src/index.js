import Component from './js/Component.vue';
import LoadingProgrammatic from './js/api';
import './scss/index.scss';

const Plugin = (Vue, options = {}) => {
  Vue.$loading = LoadingProgrammatic;
  Vue.prototype.$loading = LoadingProgrammatic;
};

Component.install = Plugin;

export default Component;

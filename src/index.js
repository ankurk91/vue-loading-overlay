import Component from './js/Component.vue';
import LoadingProgrammatic from './js/api';
import './scss/index.scss';

const Plugin = (Vue, options = {}) => {
  Vue.$loading = LoadingProgrammatic;

  Object.defineProperties(Vue.prototype, {
    $loading: {
      get() {
        return LoadingProgrammatic
      }
    }
  });

};

Component.install = Plugin;

export default Component;

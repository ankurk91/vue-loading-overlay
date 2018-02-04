import LoadingProgrammatic from './js/plugin';
import Component from './js/component.vue';
import './scss/index.scss';

const LoadingPlugin = (Vue, options = {}) => {
  Vue.$loading = LoadingProgrammatic;

  Object.defineProperties(Vue.prototype, {
    $loading: {
      get() {
        return LoadingProgrammatic
      }
    }
  });

};

Component.install = LoadingPlugin;

export default Component;

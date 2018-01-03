import {Loading, LoadingProgrammatic} from './js/index';

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

Loading.install = LoadingPlugin;

export default LoadingPlugin;
export {Loading, LoadingPlugin, LoadingProgrammatic}

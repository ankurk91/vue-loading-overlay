import Vue from 'vue';
import Component from './Component.vue'

const LoadingProgrammatic = {
  show(options = {}) {
    const defaultOptions = {
      programmatic: true
    };
    const propsData = Object.assign(defaultOptions, options);
    const LoadingComponent = Vue.extend(Component);

    return new LoadingComponent({
      el: document.createElement('div'),
      propsData
    })
  }
};

export default LoadingProgrammatic;

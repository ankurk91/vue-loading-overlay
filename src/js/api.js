import Vue from 'vue';
import Component from './Component.vue'


const LoadingProgrammatic = {
  show(params = {}) {
    const defaultParam = {
      programmatic: true
    };
    const propsData = Object.assign(defaultParam, params);
    const LoadingComponent = Vue.extend(Component);

    return new LoadingComponent({
      el: document.createElement('div'),
      propsData
    })
  }
};


export default LoadingProgrammatic;

import Vue from 'vue';
import Loading from './component.vue'


const LoadingProgrammatic = {
  show(params = {}) {
    const defaultParam = {
      programmatic: true
    };
    const propsData = Object.assign(defaultParam, params);
    const LoadingComponent = Vue.extend(Loading);

    return new LoadingComponent({
      el: document.createElement('div'),
      propsData
    })
  }
};


export default LoadingProgrammatic;

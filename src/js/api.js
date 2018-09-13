import Vue from 'vue';
import Component from './Component.vue'

const LoadingProgrammatic = {
  show(options = {}, slots = {}) {
    const defaultOptions = {
      programmatic: true
    };
    const propsData = Object.assign(defaultOptions, options);
    const LoadingComponent = Vue.extend(Component);

    const instance = new LoadingComponent({
      el: document.createElement('div'),
      propsData
    });

    // Set slots
    Object.keys(slots).map((name)=>{
      instance.$slots[name] = slots[name]
    });

    return instance;
  }
};

export default LoadingProgrammatic;

import Vue from 'vue';
import Component from './Component.vue'

const LoadingApi = {
  show(options = {}, slots = {}) {
    const defaultProps = {
      programmatic: true
    };
    const propsData = Object.assign(defaultProps, options);
    const LoadingComponent = Vue.extend(Component);

    const instance = new LoadingComponent({
      el: document.createElement('div'),
      propsData
    });

    const safeSlots = Object.assign({}, slots);
    Object.keys(safeSlots).map((name) => {
      instance.$slots[name] = safeSlots[name]
    });

    return instance;
  }
};

export default LoadingApi;

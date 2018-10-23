import Component from './Component.vue'

const Api = (Vue, globalProps = {}, globalSlots = {}) => {
  return {
    show(props = globalProps, slots = globalSlots) {
      const forceProps = {
        programmatic: true
      };
      const propsData = Object.assign({}, globalProps, props, forceProps);

      const instance = new (Vue.extend(Component))({
        el: document.createElement('div'),
        propsData
      });

      const mergedSlots = Object.assign({}, globalSlots, slots);
      Object.keys(mergedSlots).map((name) => {
        instance.$slots[name] = mergedSlots[name]
      });

      return instance;
    }
  }
};

export default Api;

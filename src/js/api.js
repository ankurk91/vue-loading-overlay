import Component from './Component.vue'
import { createResolve } from "./utils";

const Api = (Vue, globalProps = {}, globalSlots = {}) => {
  return {
    show(props = globalProps, slots = globalSlots) {
      const forceProps = {
        programmatic: true
      };
      const propsData = Object.assign({}, globalProps, props, forceProps);

      const pm = createResolve()

      const instance = new (Vue.extend(Component))({
        el: document.createElement('div'),
        propsData
      });

      const mergedSlots = Object.assign({}, globalSlots, slots);
      Object.keys(mergedSlots).map((name) => {
        instance.$slots[name] = mergedSlots[name]
      });

      // 启用
      const clock = new Promise(resolve => {
        console.time('xx')
        setTimeout(() => {
          resolve()
        }, propsData.showDelay);
      })
      pm.resolve(clock);
      instance.pm = pm;

      return instance;
    }
  }
};

export default Api;

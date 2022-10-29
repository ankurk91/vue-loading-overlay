import {mount} from '@vue/test-utils';
import Component from '../src/js/Component';
import {h} from "vue";

describe('Loading component slots', () => {

  const slot = h('h3', {
    class: 'custom-slot'
  }, 'Please Wait ...');

  test('accepts default slot and replace loading icon', () => {
    let wrapper = mount(Component, {
      propsData: {
        active: true
      },
      slots: {
        default: slot
      }
    });

    expect(wrapper.find('h3').exists()).toBe(true);
    expect(wrapper.find('.vl-icon').exists()).toBe(true);
    expect(wrapper.find('svg').exists()).toBe(false);
    wrapper.unmount();
  });

  test('accepts before slot', () => {
    let wrapper = mount(Component, {
      propsData: {
        active: true
      },
      slots: {
        before: slot
      }
    });

    expect(wrapper.find('h3').exists()).toBe(true);
    expect(wrapper.find('.vl-icon').exists()).toBe(true);
    expect(wrapper.find('svg').exists()).toBe(true);
    wrapper.unmount();
  });

  test('accepts after slot', () => {
    let wrapper = mount(Component, {
      propsData: {
        active: true
      },
      slots: {
        after: slot
      }
    });

    expect(wrapper.find('h3').exists()).toBe(true);
    expect(wrapper.find('.vl-icon').exists()).toBe(true);
    expect(wrapper.find('svg').exists()).toBe(true);
    wrapper.unmount();
  });

});

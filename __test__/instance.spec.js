import {mount} from '@vue/test-utils'
import Component from '../src/js/Component';
import transitionStub from "./__stubs__/transition.js";

describe('Loading component instance', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      propsData: {
        active: true
      },
      stubs: {
        transition: transitionStub()
      }
    });
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  });

  test('renders div element', () => {
    expect(wrapper.is('div')).toBe(true);
  });

  test('rendered div has css classes', () => {
    expect(wrapper.classes()).toContain('vld-overlay')
  });

});

import {mount} from '@vue/test-utils'
import Component from '../src/js/Component';

describe('Loading component instance', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      propsData: {
        active: true
      },
    });
  });

  test('renders div element', () => {
    expect(wrapper.find('div').exists()).toBe(true);
  });

  test('rendered div has css classes', () => {
    expect(wrapper.find('div').classes()).toContain('vl-overlay');
  });

});

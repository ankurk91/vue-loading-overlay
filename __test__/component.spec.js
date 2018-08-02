import {mount} from '@vue/test-utils';
import Component from '../src/js/Component';

describe('Loading component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      propsData: {
        active: true
      }
    });
  });

  test('renders when active', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  });

  test('renders when not active', () => {
    wrapper.setProps({
      active: false
    });
    expect(wrapper.vm.$el).toMatchSnapshot()
  });

});

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

  test('renders when active', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el).toMatchSnapshot()
  });

  test('renders when not active', async () => {
    wrapper.setProps({
      active: false
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$el).toMatchSnapshot()
  });

});

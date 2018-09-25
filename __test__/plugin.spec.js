import {mount, createLocalVue} from '@vue/test-utils'
import Plugin from '../src/index';

describe('Loading plugin', () => {

  // Make a copy of local vue
  let localVue = createLocalVue();
  // Define the global component
  localVue.use(Plugin);

  test('has instance registered', () => {
    expect(localVue.$loading).toBeDefined()
  });

  test('has show method on instance', () => {
    expect(localVue.$loading.show).toBeDefined()
  });

  test('has hide method on instance returned by show()', () => {
    let loader = localVue.$loading.show();

    expect(loader.$el).toMatchSnapshot();
    expect(loader.hide).toBeDefined();
    loader.hide();
  });

});


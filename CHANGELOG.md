# Changelog

### [6.0.5](https://github.com/ankurk91/vue-loading-overlay/compare/6.0.4...6.0.5)

* Fix: Typescript def, #123

### [6.0.4](https://github.com/ankurk91/vue-loading-overlay/compare/6.0.3...6.0.4)

* Fix issue, #119

### [6.0.0](https://github.com/ankurk91/vue-loading-overlay/compare/5.0.3...6.0.0)

* Remove plugin from default export
* Remove `blur` prop
* Change dist CSS file name
* Rename CSS class names

### [5.0.1](https://github.com/ankurk91/vue-loading-overlay/compare/4.0.4...5.0.1)

* Allow composition API usage, [#88](https://github.com/ankurk91/vue-loading-overlay/issues/88)
* Now you can import package like

```js
// New way of importing
import {useLoading} from 'vue-loading-overlay';
import {Component} from 'vue-loading-overlay';
import {Plugin} from 'vue-loading-overlay';

// The good old way still works as before
import VueLoading from 'vue-loading-overlay';
```

* (Breaking) Use named export in web browser environment

```diff
- app.use(VueLoading)
+ app.use(VueLoading.Plugin)
```

### [4.0.4](https://github.com/ankurk91/vue-loading-overlay/compare/4.0.3...4.0.4)

* Fix: Composition API usage, [#88](https://github.com/ankurk91/vue-loading-overlay/issues/88)

### [4.0.3](https://github.com/ankurk91/vue-loading-overlay/compare/4.0.2...4.0.3)

* Fix: Possible SSR issue

### [4.0.2](https://github.com/ankurk91/vue-loading-overlay/compare/4.0.1...4.0.2)

* Fix: usage as plugin, in-correct parameters were being passed

### [4.0.0](https://github.com/ankurk91/vue-loading-overlay/compare/3.4.2...4.0.0) :warning:

* Drop support for Vue v2.x and add support for Vue v3.x
* Drop IE 11 support

### [3.4.2](https://github.com/ankurk91/vue-loading-overlay/compare/3.4.1...3.4.2)

* Fix: [#64](https://github.com/ankurk91/vue-loading-overlay/issues/64)

### [3.4.1](https://github.com/ankurk91/vue-loading-overlay/compare/3.4.0...3.4.1)

* Add type definitions

### [3.4.0](https://github.com/ankurk91/vue-loading-overlay/compare/3.3.4...3.4.0)

* Add: Lock scroll feature, [#51](https://github.com/ankurk91/vue-loading-overlay/issues/51)
* Add: `blur` prop to blur the background

### [3.3.4](https://github.com/ankurk91/vue-loading-overlay/compare/3.3.3...3.3.4)

* Fix: restore broken IE 11 support. :warning: IE 11 support will be removed in next major version.

### [3.3.3](https://github.com/ankurk91/vue-loading-overlay/compare/3.3.2...3.3.3)

* Fix: [#26](https://github.com/ankurk91/vue-loading-overlay/issues/26) by introducing `enforceFocus` prop

### [3.3.2](https://github.com/ankurk91/vue-loading-overlay/compare/3.3.1...3.3.2)

* Fix: revert [#44](https://github.com/ankurk91/vue-loading-overlay/issues/44)
  to fix [#46](https://github.com/ankurk91/vue-loading-overlay/issues/46)

### [3.3.1](https://github.com/ankurk91/vue-loading-overlay/compare/3.3.0...3.3.1)

* Fix:
    - [#42](https://github.com/ankurk91/vue-loading-overlay/issues/42)
    - [#44](https://github.com/ankurk91/vue-loading-overlay/issues/44)

### [3.3.0](https://github.com/ankurk91/vue-loading-overlay/compare/3.2.0...3.3.0)

* Increase `z-index` value to `9999`

### [3.2.0](https://github.com/ankurk91/vue-loading-overlay/compare/3.1.1...3.2.0)

* Add: `z-index` prop

### [3.1.1](https://github.com/ankurk91/vue-loading-overlay/compare/3.1.0...3.1.1)

* Fix: `onCancel` prop default value to empty function

### [3.1.0](https://github.com/ankurk91/vue-loading-overlay/compare/3.0.1...3.1.0)

* Add: `bars` loader type

### [3.0.1](https://github.com/ankurk91/vue-loading-overlay/compare/3.0.0...3.0.1)

* Add: `opacity` prop

### [3.0.0](https://github.com/ankurk91/vue-loading-overlay/compare/2.2.2...3.0.0) (breaking)

* Changed:
    - use SVG instead of CSS animation
    - rename `animation` prop to `transition`
    - rename `close` event to `hide`
    - `onCancel` callback will be called only when cancelled by user
    - use `v-show` instead of `v-if`
    - CSS classes has been prefixed with `vld`
    - Output CSS file name has been renamed `dist/vue-loading.css`, removed **`.min`** from name
* Added: see docs for usage
    - add `loader` prop
    - add `color` and `backgroundColor` prop
    - add `height` and `width` prop
    - add `before` and `after` slots
    - add second argument to `$loading.show(props?,slots?)` method to accept slots
* Removed:
    - SCSS has been removed completely
* Other:
    - live example available on gh-pages

### [2.2.2](https://github.com/ankurk91/vue-loading-overlay/compare/2.2.1...2.2.2)

* Fix: SSR issue [#18](https://github.com/ankurk91/vue-loading-overlay/pull/18)

### [2.2.1](https://github.com/ankurk91/vue-loading-overlay/compare/2.2.0...2.2.1)

* Fix: regression in trap focus feature
* Fix: regression in `z-index` issue
* Docs: updated demo examples

### [2.2.0](https://github.com/ankurk91/vue-loading-overlay/compare/2.1.0...2.2.0)

* Add: default slot to override the loading indicator
* Add: trap `focus` feature, user will not be able to tab on elements those are behind the loading overlay
* a11y: use `aria-live`
* Fix: detecting `window` object
* Fix: `z-index` issue on loading element
* Test: add tests
* Docs: update readme with better examples

### [2.1.0](https://github.com/ankurk91/vue-loading-overlay/compare/2.0.4...2.1.0)

* Add: allow loader to be restricted to a container element
* Chore: auto pre-fixer

### [2.0.4](https://github.com/ankurk91/vue-loading-overlay/compare/2.0.3...2.0.4)

* Chore: `dist` now includes non-minified js file as well

### [2.0.3](https://github.com/ankurk91/vue-loading-overlay/compare/2.0.2...2.0.3)

* Fix: webpack build config, [#3](https://github.com/ankurk91/vue-loading-overlay/issues/3)

### [2.0.2](https://github.com/ankurk91/vue-loading-overlay/compare/2.0.1...2.0.2)

* Fix: Don't call `onCancel` callback function when loader is not active

### [2.0.1](https://github.com/ankurk91/vue-loading-overlay/compare/2.0.0...2.0.1)

* Fix: was not working in non module environments

### [2.0.0](https://github.com/ankurk91/vue-loading-overlay/compare/1.0.0...2.0.0) (breaking)

* Fix: v1.0.0 was completely broken due to a webpack configuration
* Change: check `readme.md` file for updated usage instruction

### 1.0.0

* Initial release

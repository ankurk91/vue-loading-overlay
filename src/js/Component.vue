<template>
  <transition ref="root" :name="transition">
    <div tabindex="0"
         class="vld-overlay is-active"
         :class="{ 'is-full-page': isFullPage }"
         v-show="isActive"
         :aria-busy="isActive"
         aria-label="Loading"
         :style="{ zIndex }"
    >
      <div class="vld-background"
           @click.prevent="cancel"
           :style="bgStyle"
      ></div>
      <div class="vld-icon">
        <slot name="before"/>
        <slot name="default">
          <component
            :is="loader"
            :color="color"
            :width="width"
            :height="height"
          />
        </slot>
        <slot name="after"/>
      </div>
    </div>
  </transition>
</template>

<script>
import {defineComponent, render} from 'vue';
import {MayBeHTMLElement, removeElement} from './helpers.js'
import trapFocusMixin from './trapFocusMixin.js';
import Loaders from '../loaders/index.js';

export default defineComponent({
  name: 'vue-loading',
  mixins: [trapFocusMixin],
  props: {
    active: Boolean,
    programmatic: Boolean,
    container: [Object, Function, MayBeHTMLElement],
    isFullPage: {
      type: Boolean,
      default: true
    },
    enforceFocus: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'fade'
    },
    /**
     * Allow user to hide the loader
     */
    canCancel: Boolean,
    /**
     * Do something on cancel
     */
    onCancel: {
      type: Function,
      default: () => {
      }
    },
    color: String,
    backgroundColor: String,
    blur: {
      type: String,
      default: '2px'
    },
    opacity: Number,
    width: Number,
    height: Number,
    zIndex: Number,
    loader: {
      type: String,
      default: 'spinner'
    }
  },
  emits: ['hide', 'update:active'],
  data() {
    return {
      // Don't mutate the prop
      isActive: this.active
    }
  },
  components: Loaders,
  mounted() {
    document.addEventListener('keyup', this.keyPress)
  },
  methods: {
    /**
     * Proxy to hide() method.
     * Gets called by ESC button or when click outside
     */
    cancel() {
      if (!this.canCancel || !this.isActive) return;
      this.hide();
      this.onCancel.apply(null, arguments);
    },
    /**
     * Hide and destroy component if it's programmatic.
     */
    hide() {
      this.$emit('hide');
      this.$emit('update:active', false);

      if (this.programmatic) {
        this.isActive = false;

        // Timeout for the animation complete before destroying
        setTimeout(() => {
          const parent = this.$refs.root.parentElement;
          // unmount the component
          render(null, parent);
          removeElement(parent)
        }, 150)
      }
    },
    disableScroll() {
      if (this.isFullPage && this.lockScroll) {
        document.body.classList.add('vld-shown');
      }
    },
    enableScroll() {
      if (this.isFullPage && this.lockScroll) {
        document.body.classList.remove('vld-shown');
      }
    },
    /**
     * Key press event to hide on ESC.
     *
     * @param event
     */
    keyPress(event) {
      // todo keyCode is deprecated
      if (event.keyCode === 27) this.cancel()
    },
  },
  watch: {
    active(value) {
      this.isActive = value
    },
    isActive(value) {
      if (value) {
        this.disableScroll();
      } else {
        this.enableScroll()
      }
    }
  },
  computed: {
    bgStyle() {
      return {
        background: this.backgroundColor,
        opacity: this.opacity,
        backdropFilter: `blur(${this.blur})`
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('keyup', this.keyPress);
  },
})
</script>

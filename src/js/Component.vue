<template>
  <transition :name="transition">
    <div tabindex="0"
         class="vld-overlay is-active"
         :class="{ 'is-full-page': isFullPage }"
         v-show="isActive"
         :aria-busy="isActive"
         aria-label="Loading"
         :style="{ zIndex: this.zIndex }">
      <div class="vld-background"
           @click.prevent="cancel"
           :style="{ background: this.backgroundColor, opacity: this.opacity }">
      </div>
      <div class="vld-icon">
        <slot name="before"></slot>
        <slot name="default">
          <component :is="loader" :color="color" :width="width" :height="height"></component>
        </slot>
        <slot name="after"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  import {removeElement, HTMLElement} from './helpers.js'
  import trapFocusMixin from './trapFocusMixin.js';
  import Loaders from '../loaders/index.js';

  export default {
    name: 'vue-loading',
    mixins: [trapFocusMixin],
    props: {
      active: Boolean,
      programmatic: Boolean,
      container: [Object, Function, HTMLElement],
      isFullPage: {
        type: Boolean,
        default: true
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
      opacity: Number,
      width: Number,
      height: Number,
      zIndex: Number,
      loader: {
        type: String,
        default: 'spinner'
      }
    },
    data() {
      return {
        // Don't mutate the prop
        isActive: this.active
      }
    },
    components: Loaders,
    beforeMount() {
      // Insert the component in DOM when called programmatically
      if (this.programmatic) {
        if (this.container) {
          this.isFullPage = false;
          this.container.appendChild(this.$el)
        } else {
          document.body.appendChild(this.$el)
        }
      }
    },
    mounted() {
      // Activate immediately when called programmatically
      if (this.programmatic) {
        this.isActive = true;
      }

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

        // Timeout for the animation complete before destroying
        if (this.programmatic) {
          this.isActive = false;
          setTimeout(() => {
            this.$destroy();
            removeElement(this.$el)
          }, 150)
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
      }
    },
    beforeDestroy() {
      document.removeEventListener('keyup', this.keyPress);
    },
  }
</script>

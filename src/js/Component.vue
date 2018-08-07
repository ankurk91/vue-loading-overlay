<template>
  <transition :name="animation">
    <div tabindex="0"
         class="loading-overlay is-active"
         :class="{'is-full-page': isFullPage }"
         v-if="isActive"
         aria-live="polite"
         aria-label="Loading">
      <div class="loading-background" @click.prevent="cancel"></div>
      <div class="loading-icon"></div>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  import {removeElement, hasWindow, HTMLElement} from './util'

  export default {
    name: 'vue-loading',
    props: {
      active: Boolean,
      programmatic: Boolean,
      container: [Object, Function, HTMLElement],
      isFullPage: {
        type: Boolean,
        default: true
      },
      animation: {
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
      }
    },
    data() {
      return {
        // Don't mutate the prop
        isActive: this.active || false
      }
    },
    created() {
      hasWindow() && document.addEventListener('keyup', this.keyPress)
    },
    beforeMount() {
      if (hasWindow() && this.programmatic) {
        if (this.container) {
          this.isFullPage = false;
          this.container.appendChild(this.$el)
        } else {
          document.body.appendChild(this.$el)
        }
      }
    },
    mounted() {
      if (this.programmatic) {
        this.isActive = true;
      }
      hasWindow() && document.addEventListener('focusin', this.focusIn)
    },
    methods: {
      /**
       * Proxy to hide() method.
       */
      cancel() {
        if (!this.canCancel || !this.isActive) return;
        this.hide()
      },
      /**
       * Hide and destroy component if it's programmatic.
       */
      hide() {
        //todo rename this event to `hide`
        this.$emit('close');
        this.$emit('update:active', false);
        //todo onCancel should be called only when cancelled by user
        //todo move next line inside cancel() method
        this.onCancel.apply(null, arguments);

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
       * Keypress event to hide on ESC.
       *
       * @param event
       */
      keyPress(event) {
        // Esc key
        if (event.keyCode === 27) this.cancel()
      },
      /**
       * Trap focus event
       *
       * @param event
       */
      focusIn(event) {
        // Ignore when loading is not active
        if (!this.isActive) return;

        if (
          // Event target is the loading div element itself
          event.target === this.$el ||
          // Event target is inside the loading div
          this.$el.contains(event.target)
        ) return;

        if (
          // When loading is full screen
          !this.container ||
          // When loading is NOT full screen and event target is inside the given container
          (this.container && this.container.contains(event.target))
        ) {
          event.preventDefault();
          this.$el.focus()
        }
      }
    },
    watch: {
      active(value) {
        this.isActive = value
      }
    },
    beforeDestroy() {
      if (hasWindow()) {
        document.removeEventListener('keyup', this.keyPress);
        document.removeEventListener('focusin', this.focusIn)
      }
    },
  }
</script>

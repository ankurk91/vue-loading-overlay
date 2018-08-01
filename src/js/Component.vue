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
        // Mutable property
        isActive: this.active || false
      }
    },
    created() {
      hasWindow && document.addEventListener('keyup', this.keyPress)
    },
    beforeMount() {
      if (hasWindow && this.programmatic) {
        if (!this.container) {
          document.body.appendChild(this.$el)
        } else {
          this.isFullPage = false;
          this.container.appendChild(this.$el)
        }
      }
    },
    mounted() {
      if (this.programmatic) this.isActive = true;
      hasWindow && document.addEventListener('focusin', this.focusIn)
    },
    methods: {
      /**
       * Hide the Loader if canCancel is set to true.
       */
      cancel() {
        if (!this.canCancel || !this.isActive) return;
        this.hide()
      },
      /**
       * Emit events, and destroy component if it's programmatic.
       */
      hide() {
        this.onCancel.apply(null, arguments);
        this.$emit('close');
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
       * Keypress event that is bound to the document.
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

        // Allow to focus inside the loading div
        if (this.$el.contains(event.target)) return;

        if (
          // When loading is full screen
          !this.container
          // When loading is NOT full screen and event target is inside the container
          || (this.container && this.container.contains(event.target))
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
      if (hasWindow) {
        document.removeEventListener('keyup', this.keyPress);
        document.removeEventListener('focusin', this.focusIn)
      }
    },
  }
</script>

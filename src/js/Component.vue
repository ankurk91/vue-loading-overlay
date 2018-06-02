<template>
  <transition :name="animation">
    <div class="loading-overlay is-active"
         v-if="isActive"
         :class="{'is-full-page': isFullPage }"
         :aria-busy="isActive">
      <div class="loading-background" @click.prevent="cancel"></div>
      <div class="loading-icon"></div>
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
      canCancel: {
        type: Boolean,
        default: false
      },
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
      hasWindow && document.addEventListener('keyup', this.escape)
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
      if (this.programmatic) this.isActive = true
    },
    methods: {
      /**
       * Hide the Loader if canCancel is set to true.
       */
      cancel() {
        if (!this.canCancel) return;
        if (!this.isActive) return;

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
      escape(event) {
        // Esc key
        if (event.keyCode === 27) this.cancel()
      }
    },
    watch: {
      active(value) {
        this.isActive = value
      }
    },
    beforeDestroy() {
      hasWindow && document.removeEventListener('keyup', this.escape)
    },
  }
</script>

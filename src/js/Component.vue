<template>
  <transition :name="animation">
    <div tabindex="0"
         class="loading-overlay is-active"
         :class="{'is-full-page': isFullPage }"
         v-if="isActive"
         aria-live="polite"
         aria-label="Loading">
      <div class="loading-background" @click.prevent="cancel"></div>
      <slot>
        <div class="loading-icon"></div>
      </slot>
    </div>
  </transition>
</template>

<script>
  import {removeElement, HTMLElement} from './util'
  import trapFocusMixin from './trapFocusMixin';

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
      //todo rename this to `transition`
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
       * Key press event to hide on ESC.
       *
       * @param event
       */
      keyPress(event) {
        // Esc key
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

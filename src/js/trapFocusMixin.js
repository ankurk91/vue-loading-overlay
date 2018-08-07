import {hasWindow} from "./util";

export default {
  mounted() {
    hasWindow() && document.addEventListener('focusin', this.focusIn)
  },
  methods: {
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
  beforeDestroy() {
    hasWindow() && document.removeEventListener('focusin', this.focusIn)
  }
}

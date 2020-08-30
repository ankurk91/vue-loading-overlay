<template>
  <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :stroke="color">
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="2">
        <circle stroke-opacity=".25" cx="18" cy="18" r="18"/>
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="0.8s"
            repeatCount="indefinite"/>
        </path>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'spinner',
  props: {
    color: {
      type: String,
      default: '#000'
    },
    height: {
      type: Number,
      default: 64
    },
    width: {
      type: Number,
      default: 64
    }
  }
}
</script>

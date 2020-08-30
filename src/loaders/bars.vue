<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" :height="height" :width="width" :fill="color">
    <rect x="0" y="13" width="4" height="5">
      <animate attributeName="height" attributeType="XML"
               values="5;21;5"
               begin="0s" dur="0.6s" repeatCount="indefinite"/>
      <animate attributeName="y" attributeType="XML"
               values="13; 5; 13"
               begin="0s" dur="0.6s" repeatCount="indefinite"/>
    </rect>
    <rect x="10" y="13" width="4" height="5">
      <animate attributeName="height" attributeType="XML"
               values="5;21;5"
               begin="0.15s" dur="0.6s" repeatCount="indefinite"/>
      <animate attributeName="y" attributeType="XML"
               values="13; 5; 13"
               begin="0.15s" dur="0.6s" repeatCount="indefinite"/>
    </rect>
    <rect x="20" y="13" width="4" height="5">
      <animate attributeName="height" attributeType="XML"
               values="5;21;5"
               begin="0.3s" dur="0.6s" repeatCount="indefinite"/>
      <animate attributeName="y" attributeType="XML"
               values="13; 5; 13"
               begin="0.3s" dur="0.6s" repeatCount="indefinite"/>
    </rect>
  </svg>

</template>
<script>
export default {
  name: 'bars',
  props: {
    color: {
      type: String,
      default: '#000'
    },
    height: {
      type: Number,
      default: 40
    },
    width: {
      type: Number,
      default: 40
    }
  }
}
</script>

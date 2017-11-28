<template>
  <p>123
    <span>{{ test }}</span>
    <!-- <B></B> -->
  </p>
</template>

<script>
  // import B from './b.vue'

  export default {
    data() {
      return {
        test: '-----'
      }
    },
    // components: {
    //   B
    // }
  }
</script>

<style lang="css" scoped>
p {
  color: blue;
  box-sizing: border-box;
}
</style>

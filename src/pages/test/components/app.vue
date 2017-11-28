<template>
  <p>123
    <span>{{ test }}</span>
  </p>
</template>

<script>
  export default {
    data() {
      return {
        test: '-----'
      }
    }
  }
</script>

<style lang="css" scoped>
p {
  color: blue;
  box-sizing: border-box;
}
</style>

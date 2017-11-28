<template>
  <p>123
    <span>{{ test }}</span>
  </p>
</template>

<script>
  export default {
    data() {
      return {
        test: '123123123123'
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

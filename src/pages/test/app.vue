<template>
  <div class="content">
    <Hello></Hello>
  </div>
</template>

<script>
  import Hello from './components/hello.vue'
  import { MessageBox } from 'mint-ui'

  export default {
    mounted () {
      MessageBox('Notice', 'You clicked the button')
    },
    components: {
      Hello
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    width: 100vw;
    height: 100vh;
  }
</style>

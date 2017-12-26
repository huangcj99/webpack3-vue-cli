<template>
  <div class="content">
    <h1>{{ test }}</h1>
    <Hello></Hello>
  </div>
</template>

<script>
  import Hello from './components/hello.vue'
  import axios from 'axios'

  export default {
    data () {
      return {
        test: 'test'
      }
    },
    mounted () {
      axios.get('/api/base/clinical-project/595f33aac0c77d4db333ce53')
        .then((res) => {
          console.log(res)
        })
    },
    components: {
      Hello
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    h1 {
      height: 100px;
      font-size: 30px;/*px*/
      border: 1px solid black;/*no*/
      color: blue;
    }
  }
</style>

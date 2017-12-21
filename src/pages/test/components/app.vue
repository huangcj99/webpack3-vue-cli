<template>
  <div class="content">
    <p class="blur">123
      <span>{{ test }}</span>
    </p>
    <div class="">
   asd asd
    </div>
    <div class="">
    </div>
    <Hello></Hello>
  </div>
</template>

<script>
  import Hello from './hello.vue'
  import axios from 'axios'

  export default {
    data () {
      return {
        test: '----ssss'
      }
    },
    mounted () {
      console.log('................')
      this.test = '123'

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

<style lang="css" scoped>
:root {
  --color: {
    color: red;
    font-size: 50px;
    box-sizing: border-box;
  }
}


.content {
  height: 200px;

  & p {
    /*@apply --color;*/
    color: red;
    font-size: 30px;
  }
}




</style>

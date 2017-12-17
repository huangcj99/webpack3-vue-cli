<template>
  <div class="content">
    <p class="blur">123
      <span>{{ test }}</span>
    </p>
    <div class="">
   asd asd as d
    </div>
    <div class="">
    </div>
    <Hello></Hello>
  </div>
</template>

<script>
  import Hello from './hello.vue'

  export default {
    data() {
      return {
        test: '----asdasda',
      }
    },
    mounted() {
      console.log('................');
      this.test = '123'
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

<template id="">
  <div class="hello">
    <p class="p1">hello</p>
    <p class="p2">world</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    mounted () {
      async function test () {
        let a = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(123)
          }, 2000)
        })

        console.log(a)

        let b = await new Promise((resolve, reject) => {
          setTimeout(() => resolve(3444444444), 2000)
        })

        console.log(b)
      }

      test()
    }
  }
</script>

<style lang="scss" scoped>
  .hello {
    .p1 {
      font-size: 20px;/*px*/
    }

    .p2 {
      font-size: 30px;/*px*/
      color: red;
    }
  }
</style>

<template id="">
  <div class="hello">
    <span>hello</span>
    <span>world</span>
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
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;

    span:first-child {
      margin-right: 5px;
    }
  }
</style>

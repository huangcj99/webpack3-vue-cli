<template>
  <div class="content">
    <div class="num">{{ num$ }}</div>
    <button v-stream:click="sendNum$">点击送出值</button>
    <!-- <TestComponent
      name="huang"
      age="12"
    ></TestComponent> -->
  </div>
</template>

<script>
/* global Vue Component */
import TestComponent from './components/test.vue'

@Component({
  // components
  components: {
    TestComponent
  }
})
export default class MyApp extends Vue {
  // lift hooks
  created () {
    this.$axios.get('/api/base/clinical-project')
      .then((res) => {
        console.log(res.data)
      })
  }

  // obs stream
  subscriptions () {
    // 换用class方式后缺失domStreamEvent的绑定，这里重新编写插件进行绑定
    this.$bindDomStreamEventToThis([
      'sendNum$'
    ])

    return {
      num$: this.sendNum$
        .exhaustMap((e) => {
          console.log('执行了')
          return this.$obs().from(this.getData())
            .map((data) => {
              return data
            })
            .catch((err) => {
              console.log(err)
              return this.$obs().of('error')
            })
        })
    }
  }

  getData () {
    return this.$axios.get('/api/v1/p/base-info')
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;
  font-size: 40px;
}

</style>

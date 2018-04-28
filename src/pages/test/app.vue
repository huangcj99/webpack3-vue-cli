<template>
  <div class="content">
    <div>{{ test$ }}</div>
    <ul>
      <li v-for="(item, idx) in list$" :key="idx">
        {{ item }}
      </li>
    </ul>
    <div>数字：{{ num$ }}</div>
    <div>数字加1：{{ add }}</div>
    <div>名字：{{ name$ }}</div>
    <button v-stream:click="getNum$">点击获取数字</button>
    <button v-stream:click="getName$">点击获取名字</button>
    <TestComponent></TestComponent>
  </div>
</template>

<script>
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
        console.log(res);
      })
  }

  // computed
  get add () {
    return this.num$ ? this.num$ + 1 : 0
  }

  // rxjs
  subscriptions () {
    // 换用class方式后缺失domStreamEvent的绑定，这里重新编写插件进行绑定
    this.$bindDomStreamEventToThis([
      'getNum$',
      'getName$'
    ])

    return {
      test$: this.$obs().from(this.testPromise())
        .map(data => data),
      list$: this.$obs().of([1, 2, 3])
        .map(data => data),
      num$: this.getNum$
        .concatMap((e) => {
          return this.$obs().of(9)
            .map(data => data)
        }),
      name$: this.getName$
        .concatMap((e) => {
          return this.$obs().of('huang')
            .map(data => data)
        })
    }
  }

  // methods
  testPromise () {
    return Promise.resolve('999')
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;
}
</style>

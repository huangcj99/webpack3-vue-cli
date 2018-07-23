<template>
  <div class="content">
    <!-- 测试格式化日期, 格式化插件默认都写在format下 -->
    <!-- <div class="time">{{ $dateFormat(new Date()) }}</div> -->
    <!-- 去除注释可查看对应例子 -->
    <TestSvg></TestSvg>
    <!-- <TestAspectRatio></TestAspectRatio> -->
  </div>
</template>

<script>
import TestSvg from './components/test-svg'
import TestAspectRatio from './components/test-aspect-ratio'

export default {
  components: {
    TestSvg,
    TestAspectRatio,
  },
  props: {},
  data () {
    return {}
  },
  created () {
    console.log('-----------test start-----------')

    // 测试localStorage
    this.$storage.setItem('test-local', 'local')
    console.log(this.$storage.getItem('test-local'))

    // 测试axios
    this.$http.get('/api/base/clinical-project')

    // 测试fillParams，还有方法getUrlParams
    let url = this.$fillParams({
      test: 'testFillParams'
    }, window.location.href)

    console.log(url)

    // 测试agent的判断
    console.log(this.$os)
    console.log(this.$browser)

    console.log('-----------test end-----------')
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss">
.content {
  width: 100vw;
  height: 100vh;
  font-size: 40px;

  .time {
    // 配置了sass-resources-loader，mixin不需要在头部使用@import 'mixin.scss'
    // 测试sass mixin，可复用的css可以直接写在mixin中
    @include testMixin()
  }
}
</style>

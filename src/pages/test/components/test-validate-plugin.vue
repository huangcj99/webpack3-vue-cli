<template>
  <div>
    <label for="name">
      姓名：<input type="text" id="name" v-model="name">
    </label>
    <label for="phone">
      电话：<input type="text" id="phone" v-model="phone">
    </label>
    <!-- submit.before(submitValidate) 会先调用before传入的验证函数，通过了才执行submit -->
    <button id="submit" @click="submit.before(submitValidate)">提交1</button>

    <!-- 成功提交数据 -->
    <div>{{ info }}</div>
    <div>
      data：
      <p>{{ data.name }}</p>
      <p>{{ data.phone }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      validateManager: null,
      name: '',
      phone: '',
      info: '',
      data: {}
    }
  },
  mounted () {
    // 初始化验证管理者，传入组件的context
    this.validateManager = new this.$ValidateManager(this)
    /**
     * 注册验证方法合集
     * 传入验证方法的名字submitValidate
     * 第二个参数传入验证方法合集[]，一条验证规则为一个数组
     */
    this.validateManager.setValidateHook('submitValidate', [
      // [0]是v-model绑定的data key值
      // [1]是validate-methods下的验证方法
      // [2]验证错误的错误信息
      ['name', 'isNotEmpty', '请输入姓名'],
      ['name', 'moreThan0AndlessThan6Str', '姓名长度不能大于5'],
      ['phone', 'isNotEmpty', '请输入电话号码']
    ])
  },
  methods: {
    // 模拟提交数据
    postData (data) {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            state: '提交成功',
            data: data
          })
        }, 2000)
      })
        .then((res) => {
          this.info = res.state
          this.data = res.data
        })
    },
    submit () {
      let data = {
        name: this.name,
        phone: this.phone
      }

      this.postData(data)
    }
  }
}
</script>

<style lang="scss">
label {
  display: block;
  font-size: 20px;
  margin: 10px;

  span {
    display: block;
    margin-left: 10px;
  }
}

#submit, #submit1 {
  width: 100px;
  height: 30px;
  border: 1px solid black;
  margin: 10px;
}

div {
  font-size: 20px;
  margin: 10px;
}
</style>



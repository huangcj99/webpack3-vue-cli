import validateMethods from './methods'

export default class ValidateManager {
  constructor (vueCompCtx) {
    this.vueCompCtx = vueCompCtx  // vue context

    // 初始化
    this.init()
  }

  init () {
    Function.prototype.before = function (fn) {
      if (!fn()) {
        return 
      }

      return this()
    }
  }

  // 挂载验证函数到vue实例上
  setValidateHook (hook, validateConfig) {
    let validates = []

    validateConfig.forEach(validate => {
      // 整理验证配置
      let bindData = validate.shift()
      let validateMethod = validate.shift()
      let errorMsg = validate.shift()
      
      // 构造的验证方法将this绑定到vueCompCtx上，以便可以通过this访问到绑定的数据
      // 拼装方法存入validates中
      validates.push(validateMethods[validateMethod].call(this.vueCompCtx, bindData, errorMsg))
    }) 

    // 挂载
    this.vueCompCtx[hook] = function () {
      // 若有一种验证不通过，则验证返回false
      for (let i = 0, validate; validate = validates[i++];) {
        if (!validate()) {
          return false
        }
      }

      // 验证全通过返回true
      return true
    }
  }
}
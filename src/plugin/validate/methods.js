import utils from './utils'

/**
 * 这里的this指向注册了验证管理的vue实例context（return的函数的this需要用剪头函数或者是使用bind进行绑定）
 * 所以可以根据bindData选择需要验证的绑定的数据
 */

// 验证非空
const isNotEmpty = function (bindData, errorMsg) {
  return () => {
    if (this[bindData] === '') {
      // 此处可以在验证不通过执行一系列操作
      utils.toast(errorMsg)
      return false
    }

    return true
  }
}

// 验证长度为11的字符串
const is11Str = function (bindData, errorMsg) {
  return () => {
    if (this[bindData].length !== 11) {
      utils.toast(errorMsg)
      return false
    }

    return true
  }
}

// 大于0并且小于5的字符串
const moreThan0AndlessThan6Str = function (bindData, errorMsg) {
  return () => {
    if (this[bindData].length <= 0 || this[bindData].length >= 6) {
      utils.toast(errorMsg)
      return false
    }

    return true
  }
}

export default {
  isNotEmpty,
  is11Str,
  moreThan0AndlessThan6Str
}
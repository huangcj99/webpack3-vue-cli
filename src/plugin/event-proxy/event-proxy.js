/**
 * 入口引入该代理事件插件后，函数的原型链上回增加proxy函数
 * 适用于click事件（有冒泡行为的事件）
 * 解决使用代理事件时，点击item内元素，无法准确获取到实际委托者本身的问题
 */
export default class EventProxy {
  constructor () {
    // 初始化
    this.init()
  }

  init () {
    /**
     *  @param {Object} e;
     *  @param {String} selector;
     *  使用时，参照interactive-activity页面
     *  代理者调用时：@click="xxx方法.proxy($event, '.item')"，传入item
     *  委托者：如<li class="item" :data-proxy="id"></li>  id可为字符串或者数字
     */
    Function.prototype.proxy = function (e, selector) {
      if (!selector) {
        throw new Error('Please pass the selector which is classname!!!')
      }

      let currentTarget = e.currentTarget // 代理者
      let target = e.target // 当前点击的DOM
      let realTarget = null

      // 真实点击节点与代理节点相同时，退出函数
      if (target === currentTarget) {
        return
      }

      // 递归查找绑定的委托者节点
      realTarget = this.findRealTarget(target, selector)

      if (!realTarget) {
        throw new Error('Please confirm the target was set!!!')
      }
      
      // 传入实际的业务函数
      this(realTarget)
    }

    /**
     * @param {Object} target;
     * @param {String} selector;
     */
    Function.prototype.findRealTarget = function (target, selector) {
      let hasClass = this.hasClass(target, selector)
      let targetParentNode = target.parentNode
      let realTarget = null

      // 根据class判断当前target是否委托者
      if (hasClass) {
        realTarget = target
        return realTarget
      }

      // 当前target下查找委托者
      realTarget = target.querySelector(selector)

      // 委托者存在直接返回
      if (realTarget) {
        return realTarget
      }

      // 递归
      return this.findRealTarget(targetParentNode, selector)
    }

    Function.prototype.hasClass = function (target, selector) {
      return target.classList.contains(selector.slice(1))
    }
  }
}
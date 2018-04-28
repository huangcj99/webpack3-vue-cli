import Rx from 'rx'

export default {
    install: function (Vue, options) {
        Vue.prototype.$obs = function () {
            return Rx.Observable
        }

        // 绑定domStreamEvent
        Vue.prototype.$bindDomStreamEventToThis = function (domStreams) {
            let that = this

            domStreams.forEach(function (domStream) {
                that[domStream] = new Rx.Subject()
            })
        }
    }
}
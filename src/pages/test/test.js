import 'assets/css/reset.css'
import './test.css'
import Vue from 'vue'
import App from './components/app.vue'

new Vue({
  el: '#app',
  render: h => h(App)
});
console.log('asdasdas13dasdasasdasda');
// async function test() {
//   let a = await new Promise((resolve, reject) => {
//             setTimeout(() => {
//               resolve(123);
//             }, 2000)
//           });
//
//   console.log(a);
//
//   let b = await new Promise((resolve, reject) => {
//     setTimeout(() => resolve(3444444444), 2000);
//   })
//
//   console.log(b);
// }
//
// test();

class Test2 {
  a() {
    console.log('aaaaaaa');
  }
}

const aaa = new Test2();

aaa.a();


console.log('hello asdasdaasdasds');

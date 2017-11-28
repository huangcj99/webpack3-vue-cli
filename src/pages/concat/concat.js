
document.getElementById('btn').onclick = function () {
  console.log('点击btn');

  setTimeout(() => {
    import(/* webpackChunkName: "test-libs" */ 'libs/test-libs.js').then(module => {
      module();
    })
  }, 2000)
}

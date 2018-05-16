<template>
  <div class="container">
    <h1>box-wrapper宽度统一设置成50px</h1>
    <h2>宽高比2:1盒子:</h2>
    <div aspectratio w-2-1 class="box-wrapper">
      <div aspectratio-content></div>
    </div>
    <h2>宽高比4:1盒子:</h2>
    <div aspectratio w-4-1 class="box-wrapper">
      <div aspectratio-content></div>
    </div>
    <img src="../imgs/test-aspect-ratio.png" alt="">
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
/* aspectratio与aspectratio-content 基础样式在assets/css/global.css中，需要在引入才有效 */
.container {
  padding: 10px;

  h2 {
    margin-bottom: 10px;
  }
}

.box-wrapper {
  width: 50px;
  background-color: red;
}

[w-2-1] {
  // 比例需要单独写，插件会将其余属性删除
  aspect-ratio: '2:1';
}

[w-4-1] {
  aspect-ratio: '4:1';
}

img {
  width: 100%;
  margin-top: 10px;
}
</style>
 

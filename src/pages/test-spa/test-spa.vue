<template>
  <div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}

.fade-enter {
  opacity: 0;
}

.fade-leave-to {
  transition: none;
  opacity: 0;
}
</style>




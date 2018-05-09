<template>
  <div>
    <div>{{ name }}</div>
    <div>{{ age }}</div>
  </div>
</template>

<script>
/* global Vue Component */

@Component({
  props: [
    'name',
    'age'
  ]
})
export default class TestComponent extends Vue {}
</script>

<style lang="scss" scoped>

</style>



<template>
  <ul 
    class="activity-list" 
    bgc-fff fz-16 c-333
    @click="redirect.proxy($event, '.item')">
    <li 
      class="item"
      v-for="(item, idx) in list"
      :key="idx"
      :data-proxy="item.id"
      >
      <span>{{ item.name }}</span>
      <i></i>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          id: 'a',
          name: 'a'
        },
        {
          id: 'b',
          name: 'b'
        }
      ]
    }
  },
  methods: {
    redirect (target) {
      let route = target.dataset.proxy
      
      // route是绑定的data-proxy="activity.id"
      this.$router.push(route)
    }
  }
}
</script>

<style lang="scss">
.activity-list {
  padding-left: 15px;
  margin-top: 10px;

  li {
    @include setFlex($horizontal: space-between);
    @include fixedAndroidCenter();
    height: 56px;
    padding-right: 15px;

    i {
      @include setBackground(11.3px, 11.3px, '../imgs/Rectangle 6@2x.png');
    }
  }

  li:not(:last-of-type) {
    @include setSvgSingleBorder(bottom);
    border-image: svg(1px-border param(--color #e5e5e5)) 1 stretch;
  }
}
</style>



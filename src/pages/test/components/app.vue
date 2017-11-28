<template>
  <div class="content">
    <p class="blur">123
      <span>{{ test }}</span>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        test: '-----'
      }
    }
  }
</script>

<style lang="css" scoped>
:root {
  --color: {
    color: red;
    font-size: 50px;
    box-sizing: border-box;
  }
}

.blur {
  filter: blur(4px);
}

.content {
  height: 200px;
}

p {
  @apply --color;
}


</style>

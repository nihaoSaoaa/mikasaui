<template>
  <div>
    <MiButton>百度一下</MiButton>
    <MiButton to="https://baidu.com">百度一下</MiButton>
    <MiButton to="https://baidu.com" target="_blank">百度一下</MiButton>
  </div>
</template>

<script>
import MiButton from 'components/button/MiButton'
export default {
  components: {
    MiButton,
  },
}
</script>

<style lang="scss" scoped>

</style>
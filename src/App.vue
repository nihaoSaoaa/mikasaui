<template>
  <div id="app">
    <MyForm />
  </div>
</template> 

<script>
import MyForm from 'views/myForm/MyForm'
export default {
  name: 'App',
  components: {
    MyForm
  },
}
</script>

<style lang="scss">
@import url('./assets/css/base/base.scss');
#app {
  width: 100%;
  height: 100%;
}
</style>

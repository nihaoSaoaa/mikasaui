<template>
  <div>
    <button :class="'mi-button-size' + size" 
      :disabled="disabled" 
      @click="handleClick">
      <slot>click!</slot>
    </button>
  </div>
</template>

<script>
  //  函数用来判断传入值是否与特定值符合
  function oneOf(value, validList) {
    for (const valid of validList) {
      if (value === valid) {
        return true;
      }
    }
    return false; 
  }

  import Emitter from '../common/mixins'

  export default {
    name: 'MiButton',
    props: {
      size: {
        type: String,
        default: 'default',
        validator: val => oneOf(val, ['large', 'small', 'default']) 
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    inject: [ 'app' ],
    created () {
      this.$on('on-click', e => console.log(e));
    },
    mixins: [Emitter],
    methods: {
      handleClick(e) {
        this.dispatch('App', 'test', e, 1, 2);
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
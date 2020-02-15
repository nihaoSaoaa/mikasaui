<template>
  <div>
    <input type="text" 
      :value="currentValue"
      @blur="handleBlur"
      @input="handleInput" 
    />
  </div>
</template>

<script>
import { Emitter } from '../../common/mixins'
export default {
  name: 'MiInput',
  props: {
    value: {
      type: String,
      default: ''
    },
  },
  mixins: [Emitter],
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    // 外部改变value值时触发事件
    value(val) {
      this.currentValue = val;
    }
  },
  methods: {
    handleInput(e) {
      // 内部输入时改变 currentValue
      const value = e.target.value;
      this.currentValue = value;
      this.$emit('input', value);
      this.dispatch('MiFormItem', 'onFormChange', value);
    },
    handleBlur() {
      this.dispatch('MiFormItem', 'onFormBlur', this.currentValue)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
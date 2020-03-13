<template>
  <div>
    <input type="text" 
      class="mi-input"
      :value="currentValue"
      :placeholder="placeholder"
      @blur="handleBlur"
      @input="handleInput" 
    />
  </div>
</template>

<script>
import Emitter from '../../common/emitter'
export default {
  name: 'MiInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  mixins: [Emitter],
  watch: {
    value(val) {
      this.currentValue = val;
    }
  },
  methods: {
    handleInput(e) {
      const newValue = e.target.value;
      this.currentValue = newValue;
      this.$emit('input', newValue);
      this.dispatch('MiFormItem', 'onFormChange', newValue);
    },
    handleBlur() {
      this.dispatch('MiFormItem', 'onFormBlur', this.value);
    }
  },

}
</script>

<style lang="scss" scoped>
.mi-input {
  width: 20rem;
  height: 2rem;
  padding: 5px;
  &::placeholder {
    color: $gray;
  }
}
</style>
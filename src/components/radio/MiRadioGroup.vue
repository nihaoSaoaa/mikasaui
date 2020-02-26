<template>
  <label>
    <slot />
  </label>
</template>

<script>
import { findComponentsDownward } from '../../common/findComponents'
import Emitter from '../../common/emitter'
export default {
  name: 'MiRadioGroup',
  props: {
    value: {
      type: String,
    },
  },
  mixins: [Emitter],
  data() {
    return {
      currentValue: this.value,
      children: null
    }
  },
  watch: {
    value() {
      this.updateValue();
    }
  },
  mounted () {
    this.updateValue();
  },
  methods: {
    change(data) {
      this.currentValue = data;
      this.$emit('input', data);
      this.$emit('onChange', data);
      this.dispatch('MiFormItem', 'onFormChange', data);
    },

    updateValue() {
      this.children = findComponentsDownward(this, 'MiRadio');
      if (this.children.length) {
        this.children.forEach(child => {
          child.model = this.value;
        });
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
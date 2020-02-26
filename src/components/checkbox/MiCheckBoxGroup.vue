<template>
  <div class="flex">
    <slot />
  </div>
</template>

<script>
import Emitter from '../../common/emitter'
import { findComponentsDownward } from '../../common/findComponents.js'
export default {
  name: 'MiCheckBoxGroup',
  mixins: [ Emitter ],
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
  },
  data() {
    return {
      currrentValue: this.value,
      children: [],
    }
  },
  methods: {
    updateModel() {
      this.children = findComponentsDownward(this, 'MiCheckBox');
      if ( this.children.length ) {
        const value = this.value;
        this.children.forEach( child => {
          child.model = value;
          child.currrentValue = value.includes(child.label);
          child.group = true;
        });
      }
    },
    change(data) {
      this.currrentValue = data;
      this.$emit('input', data);
      this.$emit('onChange', data);
      this.dispatch('MiFormItem', 'onFormChange', data);
    }
  },
  mounted() {
    this.updateModel();
  },
  watch: {
    value() {
      this.updateModel();
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
</style>
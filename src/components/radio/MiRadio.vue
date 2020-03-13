<template>
  <label>
    <input 
    type="radio"
    v-model="model"
    :value="label"
    @change="change"
    >
    <slot>{{ label }}</slot>
    <i class="iconfont icon-radio"></i>
  </label>
</template>

<script>
import { findComponentUpward } from '../../common/findComponents'
export default {
  name: 'MiRadio',
  props: {
    label: {
      type: String,
    }
  },
  data() {
    return {
      model: '',
      parent: null
    }
  },
  methods: {
    change() {
      this.parent = findComponentUpward(this, 'MiRadioGroup');
      if (this.parent) {
        this.parent.change(this.model);
      } 
    }
  },
}
</script>

<style lang="scss" scoped>
label {
  position: relative;
  padding-right: 5px;

  input[type=radio] {
    cursor: pointer;
    vertical-align: middle;
    visibility: hidden;
    margin-right: 10px;

    &:checked+.icon-radio::before {
      color: #338FFF;
    }
  }

  .icon-radio {
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
  }
}
</style>
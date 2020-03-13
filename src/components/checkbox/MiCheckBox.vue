<template>
  <label>
    <input
      v-if="group" 
      type="checkbox"
      :disabled="disabled"
      v-model="model"
      :value="label"
      @change="change"
    >
    <input 
      v-else
      type="checkbox"
      :disabled="disabled"
      :checked="currentValue"
      @change="change"
    >
    <slot></slot>
    <i class="iconfont icon-check"></i>
  </label>
</template>

<script>
import Emitter from '../../common/emitter'
import { findComponentUpward } from '../../common/findComponents.js'
export default {
  name: 'MiCheckBox',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [ Number, String, Boolean ],
      default: false
    },
    trueValue: {
      type: [ Number, String, Boolean ],
      default: true
    },
    falseValue: {
      type: [ Number, String, Boolean ],
      default: false
    },
    label: {
      type: [ Number, String, Boolean ],
      default: false
    }
  },
  data() {
    return {
      currentValue: this.value,
      // group 下作为子组件时
      model: [],
      group: false,
      parent: null
    }
  },
  mixins: [Emitter],
  watch: {
    value(val) {
      if ( val === this.trueValue || val === this.falseValue ) {
        this.updateModel();
      } else {
        throw new Error('Value should be trueValue or falseValue.');
      }
    }
  },
  methods: {
    change(e) {
      // 禁用时不可改变
      if (this.disabled) {
        return;
      }
      if ( this.group ) {
        this.parent.change(this.model);
      } else {
        const checked = e.target.checked;
        this.currentValue = checked;
        //获取点击后的值传出与v-model交互
        const newValue = checked ? this.trueValue : this.falseValue;

        this.$emit('input', newValue);
        this.$emit('onChange', newValue);
        this.dispatch('onFormChange', newValue);
      }
    },
    // 修改选项框状态
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    }
  },
  mounted() {
    // 判断是否是 group 的子组件来确定数据更新的组件 
    const parent = findComponentUpward(this, 'MiCheckBoxGroup');
    if ( parent ) {
      this.parent = parent;
      this.group = true;
    }
    if ( this.group ) {
      this.parent.updateModel();
    } else {
      this.updateModel();
    }
  }
}
</script>

<style lang="scss" scoped>
label {
  position: relative;
  margin-right: 3px;
  display: inline-block;

  input[type=checkbox] {
    cursor: pointer;
    vertical-align: middle;
    visibility: hidden;
    margin:0 5px;
    &:checked+.icon-check:before {
      background-color: #338FFF;
      border: 1px solid #338FFF;
    }
  }
}
</style>
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
    <slot >
      {{ label }}
    </slot>
    <div class="indicator"></div>
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

  input[type=checkbox] {
    cursor: pointer;
    vertical-align: middle;
    visibility: hidden;
    margin-right: 5px;

    &:checked+.indicator {
      border: 1px solid #007FFF;
    }

    &:checked+.indicator::after {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  .indicator {
    position: absolute;
    width: 15px;
    height: 15px;
    left: 2px;
    top: 1px;
    border-radius: 50%;
    border: 1px solid #999;
    cursor: pointer;
  }

  .indicator::after {
    content: '';
    position: absolute;
    width: 70%;
    height: 70%;
    background-color: #007FFF;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    opacity: 0;
    transform: translate(-50%, -50%) scale(.5);
    transition: transform .1s cubic-bezier(0, .8, 1, 1);
  }
}
</style>
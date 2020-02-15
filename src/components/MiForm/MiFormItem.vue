<template>
  <div id="mi-form-item">
    <label for="" v-if="label" :class="{ 'item-label-required': isRequired  }">{{ label }}</label>
    <div class="item-info">
      <slot></slot>
      <div v-if="validateState === 'error'" class="item-msg">{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'
import { Emitter } from '../../common/mixins'
export default {
  name: 'MiFormItem',
  props: {
    label: {
      type: String,
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      isRequired: false,   // 是否为必填
      validateState: '', //校验状态
      validateMessage: '',  // 校验信息
    }
  },
  computed: {
    // 获取传入input的值
    fieldValue() {
      return this.MiForm.model[this.prop];
    }
  },
  inject: ['MiForm'],
  mixins: [Emitter],
  // 组件在渲染时，将实例缓存到 Form
  mounted () {
    if (this.prop) {
      // 组件挂载时将要校验的缓存
      this.dispatch('MiForm', 'onFormItemAdd', this);
      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue;
      this.setRules();

    }
  },
  beforeDestroy () {
    // 组件销毁前移除
    this.dispatch('MiForm', 'onFormItemMove', this);
  },
  methods: {
    
    setRules() {
      // 监听input传过来的事件
      this.$on('onFormChange', this.onFieldChange);
      this.$on('onFormBlur', this.onFieldBlur);
      // 设置 isRequired 显示 class
      const rules = this.getRules();
      if (rules.length) {
        for (const rule of rules) {
          if (rule.required) {
            return this.isRequired = rule.required;
          }
        }
      }
    },
    // 从form获取校验规则
    getRules() {
      let FormRules = this.MiForm.rules;
      FormRules = FormRules ? FormRules[this.prop] : [];
      return [ ...FormRules ];
    },
    // 获取符合change 和 blur 的校验规则
    getFilterRules(trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger || rule.trigger.includes(trigger) );
    },
    /**
    *  校验数据
    * @param trigger 校验类型
    * @param callback 回调函数
    */
    validate(trigger, callback = () => {}) {
      let rules = this.getFilterRules(trigger);

      if (!rules || rules.length === 0) {
        return true;
      }

      // 设置状态为校验中
      this.validateState = 'validating';

      // 以下为 async-validator 库的调用方法
      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';
        // 主要给Form来调用
        callback(this.validateMessage);
      });
    },
    onFieldChange() {
      this.validate('change');
    },
    onFieldBlur() {
      this.validate('blur')
    },
    // 重置数据
    resetField() {
      this.validateState = '';
      this.validateMessage = '';
      this.MiForm.model[this.prop] = this.initialValue;
    }
  },
}
</script>

<style lang="scss" scoped>
#mi-form-item {

  display: flex;
  justify-content: space-between;

  .item-info {
    position: relative;
  }
  .item-label-required::before {
  content: '*';
    color: red;
  }
  .item-msg {
    position: absolute;
    color: red;
    left: 0;
    bottom: -20px;
    font-size: 12px;
  }
}
</style>
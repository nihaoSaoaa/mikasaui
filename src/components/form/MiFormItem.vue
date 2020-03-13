<template>
  <div id="mi-form-item">
    <label v-if="label" :class="{ 'item-label-required': isRequired }" class="item-label">{{ label }}</label>
    <div class="item-info">
      <slot></slot>
      <div v-if="validateState === 'error'" class="item-msg">{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'
import  Emitter  from '../../common/emitter'
export default {
  name: 'MiFormItem',
  props: {
    label: {
      type: String,
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      validateState: '',
      validateMessage: '',
      isRequired: false
    }
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop] 
    }
  },
  inject: ['form'],
  mixins: [Emitter],
  mounted () {
    // 需校验的缓存 且 监听input框
    if (this.prop) {
      this.dispatch('MiForm', 'onMiFormItemAdd', this)
      this.setRules()
      // 设置初始值
      this.initialValue = this.fieldValue;
    }
  },
  destroyed () {
    // 组件销毁时消除缓存
    this.dispatch('MiForm', 'onMiFormItemMove', this);
  },
  methods: {
    // 监听 input框 的事件
    setRules() {
      this.$on('onFormChange', this.onFieldChange);
      this.$on('onFormBlur', this.onFieldBlur);
      // 设置this.isRequired
      const rules = this.getRules();
      if (rules.length) {
        for (const rule of rules) {
          if (rule.required) {
            this.isRequired = true;
            break;
          }
        }
      }
    },

    // 获取规则
    getRules() {
      let rules = this.form.rules;
      rules = rules ? rules[this.prop] : [];
      return [...rules];
    },
    // 筛选规则
    getFilteredRules(trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger || rule.trigger.includes(trigger))
    },
    
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validate(trigger, callback = () => {}) {
      const rules = this.getFilteredRules(trigger);
      if (!rules || rules.length === 0) {
        return;
      }

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

        callback(this.validateMessage);
      });
    },
    // 重置
    reset() {
      this.validateState = '';
      this.validateMessage = '';
      this.form.model[this.prop] = this.initialValue;
    },
    onFieldChange() {
      this.validate('change');
    },
    onFieldBlur() {
      this.validate('blur');
    }

  },
}
</script>

<style lang="scss" scoped>
#mi-form-item {

  display: flex;
  // justify-content: space-between;
  .item-label {
    width: 100px;
    line-height: 100%;
  }
  .item-info {
    position: relative;
  }
  .item-label-required::before {
  content: '*';
    color: $red;
  }
  .item-msg {
    position: absolute;
    color: $red;
    left: 0;
    bottom: -20px;
    font-size: $little-font;
  }
}
</style>
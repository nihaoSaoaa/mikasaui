<template>
  <div>
    <form action="">
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MiForm',
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // 缓存 FormItem的地方
      fields: []
    }
  },
  provide() {
    return {
      MiForm: this
    }
  },
  created () {
    // 监听 formItem 发出的事件
    this.$on('onFormItemAdd', field => {
      field && this.fields.push(field);
    });
    this.$on('onFormItemMove', field => {
      field.prop && this.fields.splice(this.fields.indexOf(field), 1);
    })
  },
  methods: {
    // 重置所有Item 的值;
    resetFields() {
      this.fields.forEach( field => {
        field.resetField();
      });
    },
    // 公开方法：全部校验数据，支持 Promise
    validate(callback) {
      return new Promise(resolve => {
        let valid = true;
        let count = 0;
        this.fields.forEach(field => {
          field.validate('', errors => {
            if (errors) {
              valid = false;
            }
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid);
              if (typeof callback === 'function') {
                callback(valid);
              }
            }
          });
        });
      });
    }
  },
  
}
</script>

<style lang="scss" scoped>

</style>
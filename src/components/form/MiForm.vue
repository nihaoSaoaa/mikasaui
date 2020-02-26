<template>
  <div>
    <form class="mi-form">
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
  provide() {
    return {
      form: this
    }
  },
  data() {
    return {
      // 用来存储 formItem 实例
      fields: []
    }
  },
  created () {
    this.$on('onMiFormItemAdd', field => this.fields.push(field) )
    this.$on('onMiFormItemMove', field => this.fields.splice(this.fields.indexOf(field), 1))
  },
  methods: {
    resetFields() {
      this.fields.forEach(field => {
        field.reset();
      });
    },
    validate(callback) {
      return new Promise((resolve) => {
        let count = 0;
        let valid = true;
        this.fields.forEach( field => {
          field.validate('', error => {
            if (error) {
              valid = false;
            }
            if (++count === this.fields.length) {
              resolve(valid);
              callback && callback(valid);
            }
          })
        })
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
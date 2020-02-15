<template>
  <div id="app">
    <mi-form ref="miForm" :model="formValidate" :rules="ruleValidate" class="form">
      <mi-form-item label="用户名" prop="name" class="item name-item">
        <mi-input v-model="formValidate.name" />
      </mi-form-item>
      <mi-form-item label="邮箱" prop="mail" class="item mail-item">
        <mi-input v-model="formValidate.mail" />
      </mi-form-item>
      <button @click="handleClick">提交</button>
      <button @click="handleReset">重置</button>
    </mi-form>
  </div>
</template> 

<script>
import MiForm from './components/MiForm/MiForm'
import MiFormItem from './components/MiForm/MiFormItem'
import MiInput from './components/MiForm/MiInput'
export default {
  name: 'App',
  components: {
    MiForm,
    MiFormItem,
    MiInput
  },
  data() {
    return {
      formValidate: {
        name: '',
        mail: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
      }
    } 
  },
  methods: {
    handleClick() {
      this.$refs.miForm.validate().then( valid => {
        valid ? window.alert('提交成功') : window.alert('提交失败');
      })
    },
    handleReset() {
      this.$refs.miForm.resetFields();
    }
  },
}
</script>

<style lang="scss">
@import url('../src/assets/css/base.scss');
@mixin pos-middle {
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  @include pos-middle;
  height: 500px;
}
.form {
  width: 250px;
  font: {
    size: 14px;
  }
  .item {
    margin-bottom: 30px;
  }
}
</style>

<template>
  <div class="form-div">
    <MiForm ref="miForm" :model="formValidate" :rules="ruleValidate" class="form">
      <MiFormItem label="用户名" prop="name" class="item name-item">
        <MiInput v-model="formValidate.name" placeholder="请输入姓名" />
      </MiFormItem>
      <MiFormItem label="邮箱" prop="mail" class="item mail-item">
        <MiInput v-model="formValidate.mail" placeholder="请输入邮箱" />
      </MiFormItem>
      <MiFormItem label="你喜欢的语言" prop="lan" class="item lan-item">
        <MiCheckBoxGroup v-model="formValidate.lan">
          <MiCheckBox label="java">java</MiCheckBox>
          <MiCheckBox label="c++">c++</MiCheckBox>
          <MiCheckBox label="c#">c#</MiCheckBox>
          <MiCheckBox label="javascript">javascript</MiCheckBox>
        </MiCheckBoxGroup>
      </MiFormItem>
      <MiFormItem label="性别" prop="sex" class="item">
        <MiRadioGroup v-model="formValidate.sex">
          <MiRadio label="male">男</MiRadio>
          <MiRadio label="female">女</MiRadio>
        </MiRadioGroup>
      </MiFormItem>
      <MiFormItem class="item">
        <MiCheckBox v-model="formValidate.isAgree">同意协议......</MiCheckBox>
      </MiFormItem>
      <MiFormItem class="item btn-item">
        <MiButton @click="handleClick" :disabled="!formValidate.isAgree" class="submit">提交</MiButton>
        <MiButton @click="handleReset">重置</MiButton>
      </MiFormItem>
    </MiForm>
  </div>
</template>

<script>
import {
  MiForm,
  MiFormItem,
  MiInput
} from 'components/form'
import {
  MiCheckBox,
  MiCheckBoxGroup
} from 'components/checkbox'
import {
  MiRadio,
  MiRadioGroup
} from 'components/radio'
import MiButton from 'components/button/MiButton'
export default {
  name: 'MyForm',
  components: {
    MiForm,
    MiFormItem,
    MiInput,

    MiCheckBox,
    MiCheckBoxGroup,

    MiRadio,
    MiRadioGroup,

    MiButton
  },
  data() {
    return {
      formValidate: {
        name: '',
        mail: '',
        isAgree: false,
        lan: [],
        sex: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        lan: [
          { required: true, type: 'array', min: 1, message: '请选择至少一门语言', trigger: 'change' },
          { type: 'array', max: 2, message: '最好选择两门语言', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change'}
        ]
      },
    } 
  },
  methods: {
    handleClick() {
      this.$refs.miForm.validate().then( valid => {
        valid ? this.$Alert.success({content: '提交成功'}) : this.$Alert.defeat({content: '提交失败'});
      })
    },
    handleReset() {
      this.$refs.miForm.resetFields();
      this.$Alert.success({content: '重置成功'})
    }
  },
}
</script>

<style lang="scss" scoped>
.form-div {
  @include pos-middle;
}
.form {
  font: {
    size: 14px;
  }
  .item {
    margin-bottom: 30px;
  }
  .btn-item {
    margin-left: 50%;
    transform: translate(-50%);
    
    .submit {
      margin-right: 30px;
    }
  }
}
</style>
<template>
  <label>
    <input 
    type="radio"
    v-model="model"
    :value="label"
    @change="change"
    >
    <slot>{{ label }}</slot>
    <div class="indicator"></div>
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
  margin-right: 3px;

  input[type=radio] {
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
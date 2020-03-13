<template>
  <button 
    :disabled="disabled" 
    @click.prevent="handleClick" 
    class="mi-button"
    :class="finalClass"
  >
    <slot></slot>
  </button>
</template>

<script>

export default {
  props: {
    btnStyle: {
      type: String,
      default: 'info'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    finalClass() {
      return this.disabled ? '' : this.btnStyle 
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  },
}
</script>

<style lang="scss" scoped>
.mi-button {
  width: 60px;
  height: 30px;
  border-radius: 5px;
  font-size: $middle-font;
  background-color: #fff;
  cursor: pointer;
  color: $gray;
  border: 1px solid $gray;
  transition: color .15s ease-in-out,
              background-color .15s ease-in-out,
              border-color .15s ease-in-out,
              box-shadow .15s ease-in-out;
  &:disabled {
    color: $gray;
    border: 1px solid $gray;
    transition: none !important;
  }
}
.info {
  color: $blue;
  border: 1px solid $blue;

  &:hover {
    background-color: $blue;
    color: #fff;
  }
}

</style>
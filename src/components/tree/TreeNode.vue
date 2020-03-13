<template>
  <ul class="tree-ui">
    <li class="tree-li">
      <span class="tree-expand" @click="handleExpand">
        <i class="iconfont icon-zengjia"  v-if="data.children && data.children.length && !data.expand"></i>
        <i class="iconfont icon-jianshao"  v-if="data.children && data.children.length && data.expand"></i>
      </span>
      <MiCheckBox  
        v-if="showCheckBox"
        :value="data.checked"
        @input="handleCheck"
      />
      <span class="tree-title">{{ data.title }}</span>
      <TreeNode
        v-show="data.expand"
        v-for="(item, index) in data.children"
        :key="index"
        showCheckBox
        :data="item"
      />
    </li>
  </ul>
</template>

<script>
import MiCheckBox from '../checkbox/MiCheckBox'
import { findComponentUpward } from '../../common/findComponents'
export default {
  name: 'TreeNode',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    showCheckBox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tree: findComponentUpward(this, 'Tree')
    }
  },
  components: {
    MiCheckBox
  },
  methods: {
    handleExpand() {
      this.$set(this.data, 'expand', !this.data.expand)
      if (this.tree) {
        this.tree.emitEvent('onToggleEvent', this.data)
      }
    },

    handleCheck(checked) {
      this.updateTreeDown(this.data, checked)
      if (this.tree) {
        this.tree.emitEvent('onCheckChange', this.data)
      }
    },
    updateTreeDown(data, checked) {
      this.$set(data, 'checked', checked)
      if (data.children && data.children.length) {
        data.children.forEach( item => {
          this.updateTreeDown(item, checked)
        });
      }
    }
  },
  watch: {
    'data.children': {
      deep: true,
      handler(newData) {
        if (newData) {
          const checkedAll =  newData.every( data => data.checked )
          this.$set(this.data, 'checked', checkedAll);
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.tree-ul, .tree-li {
  list-style: none;
}
.tree-li {
  padding-left: 40px;
}
.tree-expand {
  cursor: pointer;
  margin-right: 5px;
}
.tree-title {
  line-height: 25px;
}
</style>
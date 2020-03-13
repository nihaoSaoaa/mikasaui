<template>
  <div>
    <TreeNode
      v-for="(item, index) in cloneData"
      :key="index"
      showCheckBox
      :data="item"
    />
  </div>
</template>

<script>
import TreeNode from './TreeNode'
import { deepClone } from '../../common/assist'
export default {
  name: 'Tree',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    showCheckBox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cloneData: []
    }
  },
  components: {
    TreeNode
  },
  created () {
    this.rebuildData();
    console.log(this.cloneData);
  },
  watch: {
    data() {
      this.rebuildData();
    }
  },
  methods: {
    rebuildData() {
      this.cloneData = deepClone(this.data)
    },
    emitEvent(event, data) {
      this.$emit(event, data, this.cloneData)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
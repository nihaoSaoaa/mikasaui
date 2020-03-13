<template>
  <div>
    <Tree :data="data" showCheckBox />
  </div>
</template>

<script>
import Tree from 'components/tree/Tree'
export default {
  data() {
    return {
      data: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              // expand: true,
              children: [
                { title: 'leaf 1-1-1' },
                { title: 'leaf 1-1-2' },
                { title: 'leaf 1-1-3' }
              ]
            },
            {
              title: 'parent 1-2',
              // expand: true,
              children: [
                { title: 'leaf 1-2-1' },
                { title: 'leaf 1-2-2' },
                { title: 'leaf 1-2-3' }
              ]
            }
          ]
        }
      ]
    }
  },
  components: {
    Tree,
  },
}
</script>

<style lang="scss" scoped>

</style>
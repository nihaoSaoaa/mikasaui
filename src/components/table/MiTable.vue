<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in coloums" :key="col.key">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data" :key="index">
        <td v-for="col in coloums" :key="col.key">
          <template v-if="col.render">
            <Render :row="row" :col="col" :index="index" :render="col.render" />
          </template>
          <template v-else-if="col.slot">
            <slot :row="row" :col="col" :index="index" :name="col.slot" />
          </template>
          <template v-else>{{ row[col.key] }}</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Render from './render'

export default {
  name: 'MiTable',
  components: {
    Render,
  },
  props: {
    coloums: {
      type: Array,
      default() {
        return []
      } 
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #e9e9e9;

  th {
    background-color: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
  }
  td, th {
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
  }
}
</style>
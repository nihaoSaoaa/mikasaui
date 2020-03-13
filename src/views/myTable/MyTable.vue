<template>
  <div>
    <MiTable :coloums="columns" :data="data">
  
      <template #name="{ row, index }">
        <input type="text" v-model="editName"  v-if="editIndex === index">
        <span v-else>{{ row.name }}</span>
      </template>

      <template #age="{ row, index }">
        <input type="text" v-model="editAge"  v-if="editIndex === index">
        <span v-else>{{ row.age }}</span>
      </template>

      <template #birthday="{ row, index }">
        <input type="text" v-model="editBirthday"  v-if="editIndex === index">
        <span v-else>{{ getBirthday(row.birthday) }}</span>
      </template>

      <template #address="{ row, index }">
        <input type="text" v-model="editAddress"  v-if="editIndex === index">
        <span v-else>{{ row.address }}</span>
      </template>

      <template #action="{ row, index }">
        <div v-if="editIndex === index">
          <button @click="handleSave(index)">完成</button>
          <button @click="editIndex = -1">取消</button>
        </div>
        <div v-else>
          <button @click="handleEdit(row,index)">修改</button>
        </div>
      </template>

    </MiTable>
  </div>
</template>

<script>
import { MiTable } from 'components/table'
export default {
  name: 'MyTable',
  components: {
    MiTable,
  },
  data() {
    return {
      columns: [
        {
          title: '姓名',
          key: 'name',
          slot: 'name'
          // render: (h, { row, index } ) => {
          //   if (this.editIndex === index) {
          //     return h('input', {
          //       domProps: { value: row.name },
          //       on: { input: e => this.editName = e.target.value }
          //     })
          //   } else {
          //     return h('span', row.name)
          //   }
          // }
        },
        {
          title: '年龄',
          key: 'age',
          slot: 'age'
        //   render: (h, { row, index } ) => {
        //     if (this.editIndex === index) {
        //       return h('input', {
        //         domProps: { value: row.age },
        //         on: { input: e => this.editAge = e.target.value }
        //       })
        //     } else {
        //       return h('span', row.age)
        //     }
        //   }
        },
        {
          title: '出生日期',
          key: 'birthday',
          slot: 'birthday'
        //   render:(h, { row, index }) => {
        //     if (this.editIndex === index) {
        //       return h('input', {
        //         domProps: { value: row.birthday },
        //         on: { input: e => this.editBirthday = e.target.value }
        //       })
        //     } else {
        //       const data = new Date(parseInt(row.birthday))
        //       const year = data.getFullYear()
        //       const month = data.getMonth() + 1;
        //       const day = data.getDate()
        //       return h('span', `${year}-${month}-${day}`)
        //     }
        //   }
        },
        {
          title: '地址',
          key: 'address',
          slot: 'address'
        //   render: (h, { row, index } ) => {
        //     if (this.editIndex === index) {
        //       return h('input', {
        //         domProps: { value: row.address },
        //         on: { input: e => this.editAddress = e.target.value }
        //       })
        //     } else {
        //       return h('span', row.address)
        //     }
        //   }
        },

        {
          title: '操作',
          slot: 'action'
          // render:(h, { row, index }) => {
          //   if (this.editIndex === index) {
          //     return [
          //       h('button', {
          //         on: {
          //           click: () => {
          //             this.data[index].name = this.editName;
          //             this.data[index].age = this.editAge;
          //             this.data[index].birthday = this.editBirthday;
          //             this.data[index].address = this.editAddress;
          //             this.editIndex = -1;
          //           }
          //         }
          //       }, '保存'),
          //       h('button', {
          //         style: { marginLeft: '6px' },
          //         on: { click:() => { this.editIndex = -1 } },
                  
          //       }, '取消')
          //     ]
          //   } else {
          //     return h('button',{
          //       on: {
          //         click: () => {
          //           this.editName = row.name;
          //           this.editAge = row.age;
          //           this.editBirthday = row.birthday;
          //           this.editAddress = row.address;
          //           this.editIndex = index;
          //         }
          //       }
          //     }, '修改')
          //   }
          // }
        }
      ],
      data: [
        {
          name: '小张',
          age: '21',
          birthday: '919526400000',
          address: '浙江省宁波市'
        },
        {
          name: '小马',
          age: '22',
          birthday: '919526400000',
          address: '浙江省宁波市'
        },
        {
          name: '小赵',
          age: '21',
          birthday: '919526400000',
          address: '浙江省宁波市'
        },
        {
          name: '小李',
          age: '22',
          birthday: '919526400000',
          address: '浙江省宁波市'
        }
      ],
      // 保存正在提交的数据
      editName: '',
      editAge: '',
      editBirthday: '',
      editAddress: '',
      // 提交的行数
      editIndex: -1,
    }
  },
  methods: {
    getBirthday(dateCut) {
      const data = new Date(parseInt(dateCut))
      const year = data.getFullYear()
      const month = data.getMonth() + 1;
      const day = data.getDate()
      return `${year}-${month}-${day}`;
    },
    handleEdit(row, index) {
      this.editName = row.name;
      this.editAge = row.age;
      this.editBirthday = row.birthday;
      this.editAddress = row.address;
      this.editIndex = index;

    },
    handleSave(index) {
      this.data[index].name = this.editName;
      this.data[index].age = this.editAge;
      this.data[index].birthday = this.editBirthday;
      this.data[index].address = this.editAddress;
      this.editIndex = -1;
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
<template>
  <div class="monitor">
    <div class="Abnormaldata">异常数据</div>
    <div>{{ isShow }}</div>
    <!-- <div v-if="!dangerpeople.length">
      <el-empty description="暂无数据" style="margin-top: 100px" />
    </div> -->

    <el-table :data="dangerpeople" class="mtable">
      <el-table-column prop="name" label="姓名" class="item" align="center" />
      <el-table-column prop="number" label="学号" class="item" align="center" />
      <el-table-column
        prop="phone"
        label="手机号"
        class="item"
        align="center"
      />
      <el-table-column
        prop="temperature"
        label="体温"
        class="item"
        align="center"
      />
    </el-table>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onUpdated } from 'vue'
import { formget } from '@/api/form'

export default defineComponent({
  name: 'monitor',
  setup() {
    const dangerpeople = []
    let isShow = false
    onBeforeMount(async () => {
      const data = await formget({})

      if (data.formData.length) {
        console.log(data.formData, ',,,')
        data.formData.map(item => {
          if (item.temperature >= 37) {
            dangerpeople.push(item)
            isShow = true
            console.log(dangerpeople, 'dangerpeople', isShow)
          }
        })
      }
    })

    return { dangerpeople, isShow }
  },
})
</script>

<style lang="scss" scoped>
.monitor {
  color: $mainColor;
  .Abnormaldata {
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #aaa;
  }
  .mtable {
    width: 90%;
    margin: 0 auto;
    .item {
      width: 20%;
      // display: inline-block;
      // text-align: center;
    }
  }
  .el-table th > .cell {
    text-align: center;
  }
  .el-table td {
    text-align: center;
  }
}
</style>

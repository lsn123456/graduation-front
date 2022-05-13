<!--
 * @Descripttion: 
 * @version: 
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-04-23 15:16:12
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
-->
<template>
  <div class="home">
    <el-form :model="form" :rules="rules" ref="ruleform" class="ruleform">
      <el-form-item
        label="选择发布类型"
        prop="choose"
        label-width="220px"
        class="type"
      >
        <el-radio-group v-model="form.choose">
          <el-radio label="新闻" />
          <el-radio label="公告" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="btn">提交</el-button>
      </el-form-item>
      <el-form-item label="标题" label-width="220px" prop="title">
        <el-input
          placeholder="请输入标题"
          v-model="form.title"
          class="titleinput"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容" label-width="220px" prop="content">
        <el-input
          placeholder="请输入内容"
          v-model="form.content"
          type="textarea"
          class="contentinput"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { putnew } from '@/api/news'
import { putnotice } from '@/api/notice'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      form: {},
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        choose: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    async onSubmit() {
      console.log(
        this.form.choose,
        'form',
        JSON.parse(JSON.stringify(this.form))
      )
      if (!this.form.choose) {
        ElMessage.error('您还未填写内容')
        console.log('llll')
      } else {
        if (this.form.choose === '新闻') {
          const { code, data } = await putnew({
            title: this.form.title,
            content: this.form.content,
          })
          this.form = this.$options.data().form

          ElMessage({
            message: '新闻发布成功',
            type: 'success',
          })
        } else if (this.form.choose === '公告') {
          const { code, data } = await putnotice({
            title: this.form.title,
            content: this.form.content,
          })
          this.form = this.$options.data().form
          ElMessage({
            message: '公告发布成功',
            type: 'success',
          })
        }
      }
    },
  },
}

// import { defineComponent, reactive, ref, toRefs, unref } from 'vue'
// import { putnew } from '@/api/news'
// import { putnotice } from '@/api/notice'
// import { ElMessage } from 'element-plus'
// export default defineComponent({
//   name: 'home',
//   setup() {
//     let state = reactive({
//       form: {
//         title: '',
//         content: '',
//         choose: '',
//       },
//       rules: {
//         title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
//         content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
//         choose: [
//           {
//             required: true,
//             message: '请选择类型',
//             trigger: 'change',
//           },
//         ],
//       },
//     })

//     // const rules = reactive({})

//     const ruleform = ref()
//     // const formrefs = toRefs(form)

//     const onSubmit = async () => {
//       if (state.form.choose === '新闻') {
//         const { code, data } = await putnew({
//           title: state.form.title,
//           content: state.form.content,
//         })
//         ruleform.value.clearValidate()
//         ruleform.value.resetFields()
//         ElMessage({
//           message: '新闻发布成功',
//           type: 'success',
//         })
//       } else if (state.form.choose === '公告') {
//         const { code, data } = await putnotice({
//           title: state.form.title,
//           content: state.form.content,
//         })
//         ElMessage({
//           message: '公告发布成功',
//           type: 'success',
//         })
//       }
//     }

//     return { onSubmit, ...toRefs(state) }
//   },
// })
</script>

<style lang="scss" scoped>
.home {
  color: $mainColor;
  .ruleform {
    .titleinput,
    .contentinput {
      width: 60%;
    }

    // .contentinput {
    //   height: 150px !important;
    // }
    // .titleinput {
    //   height: 50px !important;
    // }
    .el-input__inner {
      height: 50px;
    }
    .el-textarea__inner {
      height: 150px !important;
    }
    .type {
      float: left;
    }
    .el-button {
      float: right;
      margin-right: 45%;
    }
  }
}
</style>

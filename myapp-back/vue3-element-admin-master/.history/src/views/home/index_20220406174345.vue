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
import { defineComponent, reactive, ref, toRefs, unref } from 'vue'
import { putnew } from '@/api/news'
import { putnotice } from '@/api/notice'
export default defineComponent({
  name: 'home',
  setup() {
    let state = reactive({
      form: {
        title: '',
        content: '',
        choose: '',
      },
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
    })

    // const rules = reactive({})

    const ruleform = ref()
    // const formrefs = toRefs(form)

    const onSubmit = async () => {
      if (state.form.choose === '新闻') {
        const { code, data } = await putnew({
          title: state.form.title,
          content: state.form.content,
        })
        console.log('11')
      } else if (state.form.choose === '公告') {
        const { code, data } = await putnotice({
          title: state.form.title,
          content: state.form.content,
        })
        console.log('22')
      }
    }

    return { onSubmit, ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
.home {
  color: $mainColor;
  .ruleform {
    .titleinput,
    .contentinput {
      width: 60%;
    }

    .el-textarea__inner {
      height: 150px;
    }
    .el-input__inner {
      height: 50px;
    }
    .type {
      float: left;
    }
    // .el-button {
    //   display: inline-block;
    //   width: 100px;
    // }
    .el-form-item__content {
      float: left;
      right: 200px;
    }
  }
}
</style>

<!--
 * @Description:fuse
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-08-26 18:27:40
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-23 13:22:54
 -->
<template>
  <el-form
    :inline="true"
    :model="form"
    :rules="rules"
    ref="form"
    :size="$store.state.d2admin.size.value"
    style="margin-bottom: -18px;"
  >
    <el-form-item label="分类" prop="uniTypeId">
      <el-select v-model="form.uniTypeId" placeholder="分类" style="width: 100px;">
        <el-option label="全部" value="-1" />
        <el-option
          :label="item.typeName"
          :value="item.uniTypeId"
          v-for="(item,index) in typesList"
          :key="index"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="融合合集ID" prop="uniFuseClipId">
      <el-input v-model="form.uniFuseClipId" placeholder="合集ID" style="width: 260px;" />
    </el-form-item>
    <el-form-item label="融合标题" prop="fuseName">
      <el-input v-model="form.fuseName" placeholder="标题" style="width: 180px;" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleFormSubmit">
        <d2-icon name="search" />查询
      </el-button>
    </el-form-item>

    <el-form-item>
      <el-button @click="handleFormReset">
        <d2-icon name="refresh" />重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      typesList: [],
      form: {
        uniFuseClipId: '',
        uniTypeId: '-1',
        fuseName: ''
      },
      rules: {}
    }
  },
  created () {
    this.typesList = JSON.parse(window.localStorage['typeList'])
  },
  methods: {
    handleFormSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$tools.trims(this.form)
          this.$emit('submit', this.form)
        }
      })
    },
    handleFormReset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<!--
 * @Description:footer
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-09-04 08:58:37
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-23 12:59:31
 -->
<template>
  <el-pagination
    background
    :current-page="page"
    :page-size="size"
    :total="pageTotal"
    :page-sizes="[10, 20, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    style="margin: -10px;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :small="['mini','small'].indexOf($store.state.d2admin.size.value)>-1"
  ></el-pagination>
</template>

<script>
export default {
  props: {
    page: {
      default: 0
    },
    size: {
      default: 0
    },
    pageTotal: {
      default: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('change', {
        page: 1,
        size: val,
        pageTotal: this.total
      })
    },
    handleCurrentChange (val) {
      this.$emit('change', {
        page: val,
        size: this.size,
        pageTotal: this.total
      })
    }
  }
}
</script>

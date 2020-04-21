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

<template>
  <div>
    <page-header slot="header" @submit="handleSubmit" ref="header" />
    <page-main
      @selectItem="handleSelectItem"
      :table-data="table"
      :loading="loading"
      :action="action"
      @submit="handleSubmitheader"
    />
    <page-footer
      slot="footer"
      :page="pages.page"
      :size="pages.size"
      :pageTotal="pages.pageTotal"
      @change="handlePaginationChange"
      :key="pages.page"
    />
  </div>
</template>

<script>

export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  components: {
    PageHeader: () => import('./componnets/PageHeader'),
    PageMain: () => import('./componnets/PageMain'),
    PageFooter: () => import('./componnets/PageFooter')
  },
  props: {
    action: {
      default: 'bind'
    }
  },
  data () {
    return {
      table: [],
      loading: false,
      pages: {
        page: 1,
        size: 20,
        pageTotal: 0
      }
    }
  },
  methods: {
    handleSelectItem (val) {
      this.$emit('submit', val)
    },
    handleSubmitheader () {
      this.$refs.header.handleFormSubmit()
    },
    handlePaginationChange (val) {
      this.pages = val
      this.$refs.header.handleFormSubmit()
    },
    handleSubmit (form) {
      this.loading = true
      this.$model.getFuseClipsList(
        {
          ...form,
          ...this.pages
        },
        data => {
          this.table = data.list
          this.pages.pageTotal = data.total
          this.loading = false
        }
      )
    }
  }
}
</script>

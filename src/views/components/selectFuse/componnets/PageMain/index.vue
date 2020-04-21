<!--
 * @Description:table
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-08-26 18:27:40
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-23 16:06:54
 -->
<template>
  <div>
    <el-table
      ref="Table"
      :data="currentTableData"
      v-loading="loading"
      :size="$store.state.d2admin.size.value"
      border
      stripe
      height="390"
      style="width: 100%;margin: 20px auto;"
    >
      <el-table-column label="融合ID" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.uniFuseClipId}}</template>
      </el-table-column>

      <el-table-column label="合集名" align="center" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.fuseName}}</template>
      </el-table-column>
      <el-table-column label="英文名" align="center" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.enName}}</template>
      </el-table-column>
      <el-table-column label="别名" align="center" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.otherName}}</template>
      </el-table-column>
      <el-table-column label="分类" align="center" width="120">
        <template slot-scope="scope">
          <el-tag
            disable-transitions
            v-for="items in scope.row.videoTypesList"
            :key="items.uniTypeId"
          >{{items.typeName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="80px">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.ottStatus ? 'success' : 'danger'"
            disable-transitions
          >{{scope.row.ottStatus?'上线':'下线'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="年份" width="80px">
        <template slot-scope="scope">{{scope.row.releaseYear}}</template>
      </el-table-column>

      <el-table-column label="创建时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.createTime}}</template>
      </el-table-column>

      <el-table-column label="更新时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.updateTime}}</template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            v-if="action=='bind'"
            :size="$store.state.d2admin.size.value"
            type="danger"
            @click="handleSelect(scope.row.uniFuseClipId)"
          >绑定</el-button>
          <el-button
            v-else
            :size="$store.state.d2admin.size.value"
            type="danger"
            @click="handleSelect(scope.row.uniFuseClipId)"
          >选择</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    action: {
      default: 'bind'
    },
    tableData: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data () {
    return {
      currentTableData: [],
      multipleSelection: []
    }
  },
  watch: {
    tableData: {
      handler (val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  created () {
    this.loadTableData()
  },
  methods: {
    loadTableData () {
      this.$emit('submit')
    },
    handleSelect (val) {
      this.$confirm(
        '确认' + (this.action === 'bind' ? '绑定' : '选择') + '该数据?'
      )
        .then(_ => {
          this.$emit('selectItem', val)
        })
        .catch(_ => {})
    }
  }
}
</script>

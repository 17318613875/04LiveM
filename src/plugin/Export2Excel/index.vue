<!--
 * @Description:
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-08-26 18:27:40
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-23 13:05:57
 -->
<template>
  <div>
    <el-dialog title="选择需要导出的数据" :visible.sync="dialogVisible" width="50%" center>
      <el-checkbox-group v-model="checkList">
        <el-checkbox checked border :label="index" v-for="(item,index) in headers" :key="index">{{item}}</el-checkbox>
      </el-checkbox-group>

      <span slot="footer" class="dialog-footer">
        <el-form-item label="选择类型" prop="uniTypeId">
          <el-select v-model="bookType" placeholder="请选择分类">
            <el-option label="xlsx" value="xlsx" />
            <el-option label="csv" value="csv" />
            <el-option label="txt" value="txt" />
          </el-select>
        </el-form-item>
        <el-button :size="$store.state.d2admin.size.value" type="primary" @click="handleDownloadXlsx(multipleSelection)">确 定</el-button>
        <el-button :size="$store.state.d2admin.size.value" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-button-group>
      <el-button
        type="primary"
        :size="$store.state.d2admin.size.value"
        :disabled="multipleSelection.length==0"
        @click="dialogVisible=!dialogVisible"
      >导出</el-button>
    </el-button-group>
  </div>
</template>
<script>
export default {
  props: {
    multipleSelection: {
      type: Array,
      required: true,
      defaults: []
    },
    headers: {
      type: Array,
      required: true
    },
    valueData: {
      type: Array,
      required: true
    },
    procData: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      checkList: [],
      dialogVisible: false,
      bookType: 'xlsx'
    }
  },
  methods: {
    handleDownloadXlsx (list) {
      if (this.checkList.length === 0) {
        this.$message.error('请至少选择一个数据')
      } else {
        import('@/plugin/Export2Excel/Export2Excel').then(excel => {
          const data = this.formatJson(this.formatData(this.valueData), list)
          excel.export_json_to_excel({
            header: this.formatData(this.headers),
            data,
            filename: '导出数据',
            autoWidth: true,
            bookType: this.bookType
          })
        })
      }
    },
    formatData (array) {
      var temparray = []
      array.map((v, i) => {
        if (this.checkList.indexOf(i) > -1) {
          temparray.push(v)
        }
      })
      return temparray
    },
    formatJson (filterVal, jsonData) {
      return this.procData(jsonData).map((v, index) =>
        filterVal.map((j, index) => {
          return v[j]
        })
      )
    }
  }
}
</script>

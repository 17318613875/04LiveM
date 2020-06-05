<template>
  <MyLayout>
    <el-table class="my-style" slot="body" border :data="tableData" v-bind="$attrs" height="100%">
      <el-table-column v-if="isCheckBox" type="selection" width="55"></el-table-column>
      <template v-for="($item, $index) in formType">
        <el-table-column :key="$index" :prop="$item.key" :label="$t($item.key)" :width="$item.width"></el-table-column>
      </template>
    </el-table>
    <el-pagination
      slot="footer"
      v-if="hasPagination"
      layout="prev, pager, next"
      :total="formData.total"
      style="padding-top: 10px;"
    ></el-pagination>
  </MyLayout>
</template>

<script>
import MyLayout from "@/components/MyLayout/index.vue";
export default {
  name: "MyTable",
  components: { MyLayout },
  props: ["tableData", "formType", "formData", "hasPagination", "isCheckBox"],
  data() {
    return {
      radioVal: undefined
    };
  }
};
</script>

<style lang="scss">
.my-style.el-table {
  thead {
    .cell {
      white-space: nowrap;
    }
  }
}
</style>

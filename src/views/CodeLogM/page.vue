<template>
  <d2-container class="page">
    <MyLayout>
      <MyForm
        slot="header"
        :formData.sync="formData"
        :formType="formType"
        :required="false"
        :edit="edit"
        @keypress.enter.native="search"
      >
        <template slot="formBtns" slot-scope="scope">
          <el-button type="primary" :size="scope.size" @click="search">搜 索(Enter)</el-button>
          <el-button type="primary" :size="scope.size" @click="dialogVisible = true">创 建</el-button>
        </template>
      </MyForm>
      <MyTable
        slot="body"
        :tableData="tableData"
        :formType="formType"
        :formData="formData"
        :hasPagination="true"
      ></MyTable>
    </MyLayout>
    <el-dialog
      title="创建:编码日志"
      :visible.sync="dialogVisible"
      :width="dailogWidth"
      :before-close="dialogBeforeClose"
      :append-to-body="true"
    >
      <MyForm
        :formData.sync="createData"
        :formType="formType"
        :required="true"
        :edit="edit"
        :isRadio="true"
        :isCheckBox="true"
      ></MyForm>
      <div slot="footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import MyLayout from "@/components/MyLayout/index.vue";
import MyForm from "@/components/MyForm/index.vue";
import MyTable from "@/components/MyTable/index.vue";
import { FormType } from "./config";
export default {
  name: "CodeLogM",
  components: { MyLayout, MyForm, MyTable },
  inject: ["dailogWidth", "labelWidth"],
  data() {
    return {
      formType: Array.from(FormType),
      formData: {},
      createData: {},
      tableData: [
        { id: 1, streamId: 102030, creatorName: "彭斌斌", codeStatus: 2 },
        { id: 2, streamId: 102030, creatorName: "彭斌斌", codeStatus: 2 },
        { id: 3, streamId: 102030, creatorName: "彭斌斌", codeStatus: 2 },
        { id: 4, streamId: 102030, creatorName: "彭斌斌", codeStatus: 2 },
        { id: 5, streamId: 102030, creatorName: "彭斌斌", codeStatus: 2 },
        { id: 6, streamId: 102030, creatorName: "彭斌斌", codeStatus: 2 },
        { id: 7, streamId: 102030, creatorName: "彭斌斌", codeStatus: 2 },
        { id: 8, streamId: 102030, creatorName: "彭斌斌", codeStatus: 2 },
        { id: 9, streamId: 102030, creatorName: "彭斌斌", codeStatus: 2 },
        { id: 10, streamId: 102030, creatorName: "彭斌斌", codeStatus: 2 }
      ],
      edit: true,
      dialogVisible: false
    };
  },
  provide: {
    FormProps: {
      "label-width": "auto"
    }
  },
  methods: {
    search() {
      debugger;
    },
    create() {},
    dialogBeforeClose() {}
  }
};
</script>

<style>
</style>
<template>
  <el-form ref="form" :model="formData" v-bind="formProps" :rules="rules">
    <template
      v-for="{
        key,
        type,
        searchType,
        label,
        querySearchAsync,
        changeVal,
        autosize,
        options,
        multiple,
        loading,
        readonly,
        disabled,
      } in formType"
    >
      <el-form-item
        v-if="(required && type) || (!required && searchType)"
        :label="`${label || $t(key)}${(multiple && '(多选)') || ''}`"
        :key="key"
        :prop="key"
      >
        <template v-if="type === 'input' || searchType === 'input'">
          <el-input
            v-model="formData[key]"
            :placeholder="`请输入${label || $t(key)}`"
            clearable
            :disabled="disabled || !edit"
            :readonly="readonly"
          ></el-input>
        </template>
        <template v-else-if="type === 'textarea' || searchType === 'textarea'">
          <el-input
            type="textarea"
            v-model="formData[key]"
            :placeholder="`请输入${label || $t(key)}`"
            clearable
            :autosize="autosize || { minRows: 2, maxRows: 4 }"
            :disabled="disabled || !edit"
            :readonly="readonly"
          ></el-input>
        </template>
        <template v-else-if="type === 'inputSearch' || searchType === 'inputSearch'">
          <el-autocomplete
            v-model="formData[key]"
            :fetch-suggestions="querySearchAsync"
            @select="changeVal"
            placeholder="请输入关键词"
            clearable
            :disabled="disabled || !edit"
          ></el-autocomplete>
        </template>
        <template v-else-if="type === 'select' || searchType === 'select'">
          <el-select
            v-model="formData[key]"
            :placeholder="`请输入${label || $t(key)}`"
            clearable
            filterable
            :multiple="multiple"
            :disabled="disabled || !edit"
            @change="() => changeVal && changeVal(formData, formType)"
          >
            <el-option v-if="!required && !multiple" label="不限" :value="undefined"></el-option>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </template>
        <template v-else-if="type === 'selectSearch' || searchType === 'selectSearch'">
          <el-select
            v-model="formData[key]"
            :placeholder="`请输入${label || $t(key)}`"
            clearable
            filterable
            :remote="true"
            :multiple="multiple"
            :remote-method="querySearchAsync"
            :loading="loading"
            :disabled="disabled || !edit"
            @change="() => changeVal && changeVal(formData, formType)"
          >
            <el-option v-if="!required && !multiple" label="不限" :value="undefined"></el-option>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </template>
        <template v-else-if="type === 'checkbox' || searchType === 'checkbox'">
          <el-checkbox-group v-model="formData[key]" :disabled="disabled || !edit">
            <el-checkbox
              v-for="option in options"
              :key="option.value"
              :label="option.value"
              :disabled="option.disabled"
            >{{ option.label }}</el-checkbox>
          </el-checkbox-group>
        </template>
        <template v-else-if="type === 'radio' || searchType === 'radio'">
          <el-radio-group v-model="formData[key]" :disabled="disabled || !edit">
            <el-radio
              v-for="option in options"
              :key="option.value"
              :label="option.value"
              :disabled="option.disabled"
            >{{ option.label }}</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
    </template>
    <slot name="formBtns" :size="formProps.size"></slot>
  </el-form>
</template>

<script>
import * as Rules from "@/config/rules";
export default {
  name: "MyForm",
  props: ["formData", "formType", "required", "edit", "FormProps"],
  computed: {
    formProps: {
      get: function() {
        return Object.assign(
          {
            inline: true,
            size: "mini",
            "label-width": "80px"
          },
          this.FormProps || {}
        );
      }
    }
  },
  data() {
    return {
      rules: {}
    };
  },
  methods: {
    init() {
      const formData = { pageSize: 20, pageNum: 1, total: 60 };
      const rules = {};
      this.formType.forEach(({ key, label, rulesKey }) => {
        formData[key] = undefined;
        rulesKey &&
          Object.assign(rules, Rules[rulesKey](key, label || this.$t(key)));
      });
      this.$emit("update:formData", Object.assign(formData, this.formData));
      this.required && (this.rules = rules);
    }
  },
  created() {
    this.init();
  }
};
</script>

<style></style>

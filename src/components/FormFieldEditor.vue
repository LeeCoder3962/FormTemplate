<template>
  <div>
    <el-form ref="formField" :model="formField">
      <el-form-item label="题目">
        <el-input v-model="formField.fieldName" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formField.fieldDscr" />
      </el-form-item>
      <el-select v-model="formField.fieldType" placeholder="请选择">
        <el-option
          v-for="fieldType in fieldTypeList"
          :key="fieldType.value"
          :label="fieldType.label"
          :value="fieldType.value"
        />
      </el-select>
      <el-form-item>
        <el-button @click="addOption">新增选项</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    formField: {
      type: Object,
      required: true
    },
    fieldTypeList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    addOption() {
    }
  }
}
</script>

<template>
  <el-form-item
    :prop="fieldId"
    :label="fieldSeq + '. ' + fieldName"
  >
    <p v-if="fieldDscr">{{ fieldDscr }}</p>
    <el-input
      v-if="fieldType === FieldTypeEnum.INPUT"
      v-model="fieldAnswer.answer"
    />
    <el-input
      v-if="fieldType === FieldTypeEnum.TEXTAREA"
      v-model="fieldAnswer.answer"
      type="textarea"
    />
    <el-radio-group
      v-if="fieldType === FieldTypeEnum.RADIO"
      v-model="fieldAnswer.answer"
    >
      <el-radio
        v-for="fieldOption in fieldOptionList"
        :key="fieldOption.optionId"
        :label="fieldOption.optionId"
      >
        {{ fieldOption.optionName }}
        <el-input v-if="fieldOption.ifRemark" v-model="fieldOption.remark" class="remark-input" size="mini" />
      </el-radio>
    </el-radio-group>
    <el-checkbox-group
      v-if="fieldType === FieldTypeEnum.CHECKBOX"
      v-model="fieldAnswer.answer"
    >
      <!-- 主要checkbox的v-model指不能为null -->
      <el-checkbox
        v-for="fieldOption in fieldOptionList"
        :key="fieldOption.optionId"
        :label="fieldOption.optionId"
      >
        {{ fieldOption.optionName }}
        <el-input v-if="fieldOption.ifRemark" v-model="fieldOption.remark" class="remark-input" size="mini" />
      </el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>

<script>
import { FieldTypeEnum } from './enum.js'

export default {
  name: 'FormField',
  props: {
    formId: {
      type: String,
      required: true
    },
    formVer: {
      type: Number,
      required: true
    },
    fieldId: {
      type: String,
      required: true
    },
    fieldSts: {
      type: String,
      required: true
    },
    fieldSeq: {
      type: Number,
      required: true
    },
    fieldName: {
      type: String,
      required: true
    },
    fieldType: {
      type: String,
      required: true
    },
    fieldDscr: {
      type: String,
      default: null
    },
    fieldConfig: {
      type: String,
      default: null
    },
    ifRequired: {
      type: Boolean,
      default: false
    },
    fieldOptionList: {
      type: Array,
      default: function() { return [] }
    },
    fieldAnswer: {
      type: Object,
      default: function() {
        let answer = null
        if (this.fieldType === FieldTypeEnum.CHECKBOX) {
          answer = []
        }
        return {
          answerId: null,
          formId: null,
          formVer: 1,
          fieldId: null,
          caseNo: null,
          answer: answer

        }
      }
    }
  },
  data() {
    return {
      FieldTypeEnum: FieldTypeEnum
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="6">
        <h1>
          {{ formTmpl.formName }}
        </h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <p>
          {{ formTmpl.formDscr }}
        </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form ref="formTmpl" :label-position="labelPosition" :model="formTmpl">
          <el-form-item
            v-for="formField in formTmpl.formFieldList"
            :key="formField.fieldId"
            :label="formField.fieldSeq + '. ' + formField.fieldName"
          >
            <form-field-editor :form-field="formField" :field-type-list="FieldTypeList" />

            <el-input
              v-if="formField.fieldType === FieldTypeEnum.INPUT"
              v-model="formField.fieldAnswer.answer"
            />
            <el-input
              v-if="formField.fieldType === FieldTypeEnum.TEXTAREA"
              v-model="formField.fieldAnswer.answer"
              type="textarea"
            />
            <el-radio-group
              v-if="formField.fieldType === FieldTypeEnum.RADIO"
              v-model="formField.fieldAnswer.answer"
            >
              <el-radio
                v-for="fieldOption in formField.fieldOptionList"
                :key="fieldOption.optionId"
                :label="fieldOption.optionId"
              >
                {{ fieldOption.optionName }}
              </el-radio>
            </el-radio-group>
            <el-checkbox-group
              v-if="formField.fieldType === FieldTypeEnum.CHECKBOX"
              v-model="formField.fieldAnswer.answer"
            >
              <el-checkbox
                v-for="fieldOption in formField.fieldOptionList"
                :key="fieldOption.optionId"
                :label="fieldOption.optionId"
              >
                {{ fieldOption.optionName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onAddField">新增字段</el-button>
            <el-button @click="onOut">退出</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const FieldTypeEnum = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  RADIO: 'radio',
  CHECKBOX: 'checkbox'
}
const FieldTypeList = [
  {
    label: '单行文本题',
    value: 'input'
  },
  {
    label: '多行文本题',
    value: 'textarea'
  },
  {
    label: '单选题',
    value: 'radio'
  },
  {
    label: '多选题',
    value: 'checkbox'
  }
]
Object.freeze(FieldTypeEnum)

import FormFieldEditor from './FormFieldEditor.vue'

export default {
  components: {
    FormFieldEditor
  },
  data() {
    return {
      formTmpl: {
        formId: 'id1',
        formVer: 1,
        formSts: 'pend',
        ifCrossBorder: true,
        ifEnhanced: true,
        formName: '表单标题',
        formDscr: '表单描述',
        formConfig: '表单配置',
        createTime: '创建时间',
        createUserId: '创建者',
        formFieldList: [
          {
            formId: 'id1',
            formVer: 1,
            fieldId: 'id1',
            fieldSts: 'normal',
            fieldSeq: 1,
            fieldName: '字段名称',
            fieldType: FieldTypeEnum.INPUT,
            fieldDscr: '字段描述',
            fieldConfig: '字段配置',
            ifRequired: true,
            fieldOptionList: [],
            fieldAnswer: {
              answerId: 'id1',
              formId: 'id1',
              formVer: 1,
              fieldId: 'id1',
              caseNo: '001',
              answer: '字段答案'
            }
          },
          {
            formId: 'id1',
            formVer: 1,
            fieldId: 'id2',
            fieldSts: 'normal',
            fieldSeq: 2,
            fieldName: '字段名称',
            fieldType: FieldTypeEnum.TEXTAREA,
            fieldDscr: '字段描述',
            fieldConfig: '字段配置',
            ifRequired: true,
            fieldOptionList: [],
            fieldAnswer: {
              answerId: 'id1',
              formId: 'id1',
              formVer: 1,
              fieldId: 'id2',
              caseNo: '001',
              answer: '字段答案'
            }
          },
          {
            formId: 'id1',
            formVer: 1,
            fieldId: 'id3',
            fieldSts: 'normal',
            fieldSeq: 3,
            fieldName: '字段名称',
            fieldType: FieldTypeEnum.RADIO,
            fieldDscr: '字段描述',
            fieldConfig: '字段配置',
            ifRequired: true,
            fieldOptionList: [
              {
                formId: 'id1',
                formVer: 1,
                fieldId: 'id3',
                optionId: 'id1',
                optionSeq: 1,
                optionName: '选项名称',
                remark: '选项备注'
              },
              {
                formId: 'id1',
                formVer: 1,
                fieldId: 'id3',
                optionId: 'id2',
                optionSeq: 2,
                optionName: '选项名称',
                remark: '选项备注'
              }
            ],
            fieldAnswer: {
              answerId: 'id2',
              formId: 'id1',
              formVer: 1,
              fieldId: 'id3',
              caseNo: '001',
              answer: 'id2'
            }
          },
          {
            formId: 'id1',
            formVer: 1,
            fieldId: 'id4',
            fieldSts: 'normal',
            fieldSeq: 4,
            fieldName: '字段名称',
            fieldType: FieldTypeEnum.CHECKBOX,
            fieldDscr: '字段描述',
            fieldConfig: '字段配置',
            ifRequired: true,
            fieldOptionList: [
              {
                formId: 'id1',
                formVer: 1,
                fieldId: 'id4',
                optionId: 'id1',
                optionSeq: 1,
                optionName: '选项名称',
                remark: '选项备注'
              },
              {
                formId: 'id1',
                formVer: 1,
                fieldId: 'id4',
                optionId: 'id2',
                optionSeq: 2,
                optionName: '选项名称',
                remark: '选项备注'
              }
            ],
            fieldAnswer: {
              answerId: 'id2',
              formId: 'id1',
              formVer: 1,
              fieldId: 'id4',
              caseNo: '001',
              answer: ['id2']
            }
          }
        ]
      },
      labelPosition: 'top',
      FieldTypeEnum: FieldTypeEnum,
      FieldTypeList: FieldTypeList
    }
  },
  methods: {
    onAddField: function() {
    },
    onOut: function() {
    }
  }
}
</script>

<style scoped>
h1 {
text-align: center;
}
</style>

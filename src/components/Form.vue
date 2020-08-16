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
            <div v-if="formField.fieldType === FieldTypeEnum.INPUT">
              <el-input v-model="formField.fieldAnswer.answer" />
            </div>
            <div v-if="formField.fieldType === FieldTypeEnum.TEXTAREA">
              <el-input v-model="formField.fieldAnswer.answer" type="textarea" />
            </div>
            <div v-if="formField.fieldType === FieldTypeEnum.RADIO">
              <el-radio-group
                v-for="fieldOption in formField.fieldOptionList"
                :key="fieldOption.optionId"
                v-model="formField.fieldAnswer.answer"
              >
                <el-radio :label="fieldOption.optionId">
                  {{ fieldOption.optionName }}
                </el-radio>
              </el-radio-group>
            </div>
            <div v-if="formField.fieldType === FieldTypeEnum.CHECKBOX">
              <el-checkbox-group
                v-for="fieldOption in formField.fieldOptionList"
                :key="fieldOption.optionId"
                v-model="formField.fieldAnswer.answer"
              >
                <el-checkbox :label="fieldOption.optionId">
                  {{ fieldOption.optionName }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="onReset">重置</el-button>
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
Object.freeze(FieldTypeEnum)

export default {
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
      FieldTypeEnum: FieldTypeEnum
    }
  },
  methods: {
    onSubmit: function() {
      console.log(this)
    },
    onReset: function() {
      this.$refs['formTmpl'].resetFields()
    }
  }
}
</script>

<style scoped>
h1 {
text-align: center;
}
</style>

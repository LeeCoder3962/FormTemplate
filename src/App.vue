<template>
  <div id="app">
    <FormTemplate v-bind="formTmpl" />
  </div>
</template>

<script>
import './plugins/element.js'
import FormTemplate from './components/FormTemplate.vue'
import { FieldTypeEnum } from './components/enum.js'

export default {
  name: 'App',
  components: {
    FormTemplate
  },
  data() {
    return {
      formTmpl: {
        formId: 'id1',
        formVer: 1,
        formSts: 'pend',
        formType: 'kyc',
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
            fieldDscr: '',
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
            fieldDscr: '',
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
            fieldDscr: '',
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
                ifRemark: true,
                remark: '备注'
              },
              {
                formId: 'id1',
                formVer: 1,
                fieldId: 'id3',
                optionId: 'id2',
                optionSeq: 2,
                optionName: '选项名称',
                ifRemark: false,
                remark: null
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
            fieldDscr: '',
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
                ifRemark: true,
                remark: '备注'
              },
              {
                formId: 'id1',
                formVer: 1,
                fieldId: 'id4',
                optionId: 'id2',
                optionSeq: 2,
                optionName: '选项名称',
                ifRemark: false,
                remark: null
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
      }
    }
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>

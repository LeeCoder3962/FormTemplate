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
          <draggable v-model="formTmpl.formFieldList" :animation="200" :scroll="true" filter=".noDraggable" :move="draggableMove">
            <transition-group name="field-transition">
              <div
                v-for="formField in formTmpl.formFieldList"
                :key="formField.fieldId"
              >
                <el-card v-if="ifEditable&&formField.ifShowEditor" shadow="always" class="noDraggable animateEditor">
                  <el-row>
                    <el-col :span="18" :offset="3">
                      <div>
                        <form-field-editor :form-field="formField" :field-type-list="FieldTypeEnum.getArray()" @edit-field="editField" @cancel-edit="cancelEdit" />
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
                <el-card
                  v-else
                  :shadow="cardShadow()"
                >
                  <el-row>
                    <el-col :span="18" :offset="3">
                      <div @click="showEditor(formField)">
                        <el-form-item
                          :prop="formField.fieldId"
                          :label="formField.fieldSeq + '. ' + formField.fieldName"
                        >
                          <p v-if="formField.fieldDscr">{{ formField.fieldDscr }}</p>
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
                              <el-input v-if="fieldOption.ifRemark" v-model="fieldOption.remark" class="remark-input" size="mini" />
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
                              <el-input v-if="fieldOption.ifRemark" v-model="fieldOption.remark" class="remark-input" size="mini" />
                            </el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
            </transition-group>
          </draggable>
          <el-form-item>
            <el-button type="primary" @click="addField">新增字段</el-button>
            <el-button @click="out">退出</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'animate.css'
import animateCSS from '../utils/animatecss'
import FormFieldEditor from './FormFieldEditor.vue'
import { FieldTypeEnum } from './enum.js'
import draggable from 'vuedraggable'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'FormTemplate',
  components: {
    FormFieldEditor,
    draggable
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
      },
      labelPosition: 'top',
      ifEditable: true,
      cardShadow() {
        if (this.ifEditable) {
          return 'hover'
        } else {
          return 'never'
        }
      },
      FieldTypeEnum: FieldTypeEnum
    }
  },
  computed: {
    isEditing() {
      const formFieldList = this.formTmpl.formFieldList
      let flag = false
      formFieldList.forEach(formField => {
        if (formField.ifShowEditor) {
          flag = true
          // 不要在这里return
        }
      })
      return flag
    }
  },
  methods: {
    addField() {
      this.formTmpl.formFieldList.push({
        formId: this.formTmpl.formId,
        formVer: this.formTmpl.formVer,
        fieldId: uuidv4().replace(/-/g, ''),
        fieldSts: 'normal',
        fieldSeq: this.formTmpl.formFieldList.length + 1,
        fieldName: '字段名称',
        fieldType: FieldTypeEnum.INPUT,
        // fieldDscr: null,
        // fieldConfig: null,
        ifRequired: false,
        // fieldOptionList: [],
        fieldAnswer: null
        // fieldAnswer: {
        //   answerId: 'id1',
        //   formId: 'id1',
        //   formVer: 1,
        //   fieldId: 'id1',
        //   caseNo: '001',
        //   answer: '字段答案'
        // }
      })
    },
    editField(formFieldEdited) {
      const formFieldList = this.formTmpl.formFieldList
      // 数组中对象被修改了 还能用数组的indexOf判断位置吗?
      const index = formFieldList.findIndex(formField => formField.fieldId === formFieldEdited.fieldId)
      formFieldEdited.ifShowEditor = false
      formFieldList.splice(index, 1, formFieldEdited)
    },
    cancelEdit(fieldId) {
      const formFieldList = this.formTmpl.formFieldList
      const index = formFieldList.findIndex(formField => formField.fieldId === fieldId)
      const formField = formFieldList[index]
      formField.ifShowEditor = false
      formFieldList.splice(index, 1, formField)
    },
    out() {
    },
    showEditor(formField) {
      if (this.ifEditable && !formField.ifShowEditor && !this.isEditing) {
        const formFieldList = this.formTmpl.formFieldList
        const index = formFieldList.indexOf(formField)
        formField.ifShowEditor = true
        formFieldList.splice(index, 1, formField)
        this.formTmpl.formFieldList = formFieldList
      } else if (!formField.ifShowEditor) {
        animateCSS('.animateEditor', 'shakeX')
      }
    },
    draggableMove() {
      if (this.isEditing) {
        animateCSS('.animateEditor', 'shakeX')
        return false
      }
    }
  }
}
</script>

<style>
.remark-input .el-input__inner {
    width: 220px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    /*outline: medium;*/
}
</style>

<style scoped>
h1 {
text-align: center;
}
.el-card {
  display: block;
  border: none;
  margin-bottom: 10px;
}

.field-transition-enter-active, .field-transition-leave-active {
  transition: all 500ms;
}
.field-transition-enter, .field-transition-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

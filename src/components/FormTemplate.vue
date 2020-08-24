<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="6">
        <h1>
          {{ formName }}
        </h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <p>
          {{ formDscr }}
        </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form ref="formTmpl" :label-position="labelPosition">
          <draggable v-model="formFieldList" :animation="200" :scroll="true" :move="draggableMove" draggable=".draggabled">
            <transition-group name="field-transition">
              <div
                v-for="formField in formFieldList"
                :key="formField.fieldId"
                :class="{draggabled:ifEditable&&!formField.ifShowEditor}"
              >
                <div v-if="formField.fieldSts !== FieldStsEnum.DELETED">
                  <el-card v-if="ifEditable&&formField.ifShowEditor" shadow="always" class="animateEditor">
                    <el-row>
                      <el-col :span="18" :offset="3">
                        <div>
                          <form-field-editor v-bind="formField" :field-type-list="FieldTypeEnum.getArray()" @edit-field="editField" @cancel-edit="cancelEdit" />
                        </div>
                      </el-col>
                    </el-row>
                  </el-card>
                  <el-card v-else :shadow="cardShadow()" class="form-field-card">
                    <el-row>
                      <el-col :span="18" :offset="3">
                        <div @click="showEditor(formField)">
                          {{ formField.fieldSts }}
                          <form-field v-bind="formField" />
                        </div>
                      </el-col>
                      <el-col :span="1" :offset="2">
                        <i class="my-el-icon el-icon-edit-outline" @click="showEditor(formField)" />
                        <i class="my-el-icon el-icon-delete" @click="deleteField(formField)" />
                        <i class="my-el-icon el-icon-copy-document" @click="copyField(formField)" />
                      </el-col>
                    </el-row>
                  </el-card>
                </div>
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
import FormField from './FormField.vue'
import { FieldTypeEnum, FieldStsEnum } from './enum.js'
import draggable from 'vuedraggable'
import { v4 as uuidv4 } from 'uuid'
import deepClone from '../utils/deepClone.js'

export default {
  name: 'FormTemplate',
  components: {
    FormFieldEditor,
    FormField,
    draggable
  },
  props: {
    formId: {
      type: String,
      required: true
    },
    formVer: {
      type: Number,
      required: true
    },
    formSts: {
      type: String,
      required: true
    },
    formType: {
      type: String,
      required: true
    },
    ifCrossBorder: {
      type: Boolean,
      default: true
    },
    ifEnhanced: {
      type: Boolean,
      default: true
    },
    formName: {
      type: String,
      required: true
    },
    formDscr: {
      type: String,
      default: null
    },
    formConfig: {
      type: String,
      default: null
    },
    createTime: {
      type: String,
      default: null
    },
    createUserId: {
      type: String,
      default: null
    },
    initFormFieldList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      formFieldList: deepClone(this.initFormFieldList),
      FieldTypeEnum: FieldTypeEnum,
      FieldStsEnum: FieldStsEnum,
      labelPosition: 'top',
      ifEditable: true,
      cardShadow() {
        if (this.ifEditable) {
          return 'hover'
        } else {
          return 'never'
        }
      },
      ifShowIcon: false
    }
  },
  computed: {
    isEditing() {
      const formFieldList = this.formFieldList
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
    // todo 重新排序
    addField() {
      // todo 向上移动
      if (this.isEditing) {
        animateCSS('.animateEditor', 'shakeX')
      } else {
        this.formFieldList.push({
          formId: this.formId,
          formVer: this.formVer,
          fieldId: uuidv4().replace(/-/g, ''),
          fieldSts: FieldStsEnum.TEMP,
          fieldSeq: this.formFieldList.length + 1,
          fieldName: '字段名称',
          fieldType: FieldTypeEnum.INPUT,
          // fieldDscr: null,
          // fieldConfig: null,
          ifRequired: false,
          // fieldOptionList: [],
          // fieldAnswer: null
          // fieldAnswer: {
          //   answerId: 'id1',
          //   formId: 'id1',
          //   formVer: 1,
          //   fieldId: 'id1',
          //   caseNo: '001',
          //   answer: '字段答案'
          ifShowEditor: true
        // }
        })
      }
    },
    editField(formFieldEdited) {
      const formFieldList = this.formFieldList
      const index = formFieldList.findIndex(formField => formField.fieldId === formFieldEdited.fieldId)
      formFieldEdited.ifShowEditor = false
      if (formFieldEdited.fieldSts === FieldStsEnum.TEMP) {
        formFieldEdited.fieldSts = FieldStsEnum.INCREASED
      } else if (formFieldEdited.fieldSts === FieldStsEnum.UPDATING) {
        // todo 判断是否真的修改了
        formFieldEdited.fieldSts = FieldStsEnum.UPDATED
      }
      formFieldList.splice(index, 1, formFieldEdited)
    },
    // todo 撤销删除
    deleteField(formField) {
      const that = this
      // todo bug 删除弹窗没有内容
      that.$confirm(`确定删除 ${formField.fieldName}？`).then(function() {
        const formFieldList = that.formFieldList
        const index = formFieldList.indexOf(formField)
        formField.fieldSts = FieldStsEnum.DELETED
        formFieldList.splice(index, 1, formField)
        that.formFieldList = formFieldList
      })
    },
    copyField(formField) {
      const formFieldClone = deepClone(formField)
      formFieldClone.fieldId = uuidv4().replace(/-/g, '')
      formFieldClone.fieldSeq = this.formFieldList.length + 1
      formFieldClone.fieldSts = FieldStsEnum.INCREASED
      // this.formFieldList.push(formFieldClone)
      this.formFieldList.splice(this.formFieldList.indexOf(formField) + 1, 0, formFieldClone)
    },
    cancelEdit(fieldId) {
      const formFieldList = this.formFieldList
      const index = formFieldList.findIndex(formField => formField.fieldId === fieldId)
      const formField = formFieldList[index]
      formField.ifShowEditor = false
      if (formField.fieldSts === FieldStsEnum.TEMP) {
        formFieldList.splice(index, 1)
      } else {
        formFieldList.splice(index, 1, formField)
      }
    },
    out() {
    },
    showEditor(formField) {
      if (this.ifEditable && !formField.ifShowEditor && !this.isEditing) {
        const formFieldList = this.formFieldList
        const index = formFieldList.indexOf(formField)
        formField.ifShowEditor = true
        formFieldList.splice(index, 1, formField)
        this.formFieldList = formFieldList
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
.my-el-icon {
  cursor: pointer;
  float: right;
  font-size:x-large;
}
</style>

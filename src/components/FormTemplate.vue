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
          <draggable v-model="formFieldList" :animation="200" :scroll="true" filter=".noDraggable" :move="draggableMove">
            <transition-group name="field-transition">
              <div
                v-for="formField in formFieldList"
                :key="formField.fieldId"
              >
                <el-card v-if="ifEditable&&formField.ifShowEditor" shadow="always" class="noDraggable animateEditor">
                  <el-row>
                    <el-col :span="18" :offset="3">
                      <div>
                        <form-field-editor v-bind="formField" :field-type-list="FieldTypeEnum.getArray()" @edit-field="editField" @cancel-edit="cancelEdit" />
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
                <el-card v-else :shadow="cardShadow()">
                  <el-row>
                    <el-col :span="18" :offset="3">
                      <div @click="showEditor(formField)">
                        <form-field v-bind="formField" />
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
import FormField from './FormField.vue'
import { FieldTypeEnum } from './enum.js'
import draggable from 'vuedraggable'
import { v4 as uuidv4 } from 'uuid'

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
    formFieldList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
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
    addField() {
      this.formFieldList.push({
        formId: this.formId,
        formVer: this.formVer,
        fieldId: uuidv4().replace(/-/g, ''),
        fieldSts: 'normal',
        fieldSeq: this.formFieldList.length + 1,
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
      const formFieldList = this.formFieldList
      // 数组中对象被修改了 还能用数组的indexOf判断位置吗?
      const index = formFieldList.findIndex(formField => formField.fieldId === formFieldEdited.fieldId)
      formFieldEdited.ifShowEditor = false
      formFieldList.splice(index, 1, formFieldEdited)
    },
    cancelEdit(fieldId) {
      const formFieldList = this.formFieldList
      const index = formFieldList.findIndex(formField => formField.fieldId === fieldId)
      const formField = formFieldList[index]
      formField.ifShowEditor = false
      formFieldList.splice(index, 1, formField)
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
</style>

<template>
  <div>
    <el-form ref="formFieldEditor" :model="thisFormField">
      <el-row>
        <el-col :span="2"><label>题目</label></el-col>
        <el-col :span="22"><el-input v-model="thisFormField.fieldName" size="small" /></el-col>
      </el-row>
      <el-row>
        <el-col :span="2"><label>备注</label></el-col>
        <el-col :span="22"><el-input v-model="thisFormField.fieldDscr" size="small" /></el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="2">
          <el-select v-model="thisFormField.fieldType" size="mini">
            <el-option
              v-for="fieldType in fieldTypeList"
              :key="fieldType.value"
              :label="fieldType.label"
              :value="fieldType.value"
            />
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-checkbox v-model="thisFormField.ifRequired">必填</el-checkbox>
        </el-col>
      </el-row>
      <div v-if="thisFormField.fieldType === FieldTypeEnum.RADIO || thisFormField.fieldType === FieldTypeEnum.CHECKBOX">
        <draggable v-model="thisFormField.fieldOptionList" handle=".el-icon-sort" :animation="200" @end="draggableEnd">
          <transition-group name="option-transition">
            <el-row
              v-for="fieldOption in thisFormField.fieldOptionList"
              :key="fieldOption.optionId"
            >
              <el-col :span="2"><i class="el-icon-sort" style="cursor: all-scroll;" /></el-col>
              <el-col :span="15"><el-input v-model="fieldOption.optionName" size="small" /></el-col>
              <el-col :span="1">
                <el-tooltip content="删除" :open-delay="1000">
                  <i class="el-icon-close" style="cursor: pointer;" @click="removeOption(fieldOption.optionId)" />
                </el-tooltip>
              </el-col>
              <el-col :span="2" :offset="0"><el-checkbox v-model="fieldOption.ifRemark">备注</el-checkbox></el-col>
            </el-row>
          </transition-group>
        </draggable>
        <el-row>
          <el-col :span="15" :offset="2">
            <el-button type="text" @click="addOption">新增选项</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15" :offset="2">
            <el-button type="text">批量修改</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <div style="margin-top: 8px;border-top: 1px solid #e0e0e0" />
        <el-col :span="2" :offset="10">
          <div style="margin: -10px auto 0;text-align: center;background-color: white;width:55px;cursor: pointer;" @click="ifShowSetting = !ifShowSetting">
            设置
            <i v-show="!ifShowSetting" class="el-icon-arrow-down" />
            <i v-show="ifShowSetting" class="el-icon-arrow-up" />
          </div>
        </el-col>
      </el-row>
      <transition name="el-fade-in-linear">
        <el-row v-show="ifShowSetting">
          <el-col :span="24">
            展开
          </el-col>
        </el-row>
      </transition>
      <el-row>
        <el-col :offset="18">
          <el-button size="small" @click="$emit('cancel-edit', thisFormField.fieldId)">取消</el-button>
          <el-button type="primary" size="small" @click="$emit('edit-field', thisFormField)">确定</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { FieldTypeEnum } from './enum.js'
import deepClone from '../utils/deepClone.js'
import { v4 as uuidv4 } from 'uuid'
import draggable from 'vuedraggable'

export default {
  name: 'FormFieldEditor',
  components: {
    draggable
  },
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
      ifShowSetting: false,
      FieldTypeEnum: FieldTypeEnum,
      thisFormField: deepClone(this.formField)
    }
  },
  methods: {
    addOption() {
      this.thisFormField.fieldOptionList.push({
        formId: this.thisFormField.formId,
        formVer: this.thisFormField.formVer,
        fieldId: this.thisFormField.fieldId,
        optionId: uuidv4().replace(/-/g, ''),
        optionSeq: this.thisFormField.fieldOptionList.length + 1,
        optionName: '选项',
        remark: null
      })
    },
    removeOption(optionId) {
    // todo 逻辑删除
      const fieldOptionList = this.thisFormField.fieldOptionList
      const index = fieldOptionList.findIndex(option => option.optionId === optionId)
      fieldOptionList.splice(index, 1)
      // 重新排序
      fieldOptionList.map(function(option, index) {
        option.optionSeq = index + 1
        return option
      })
    },
    draggableEnd() {
      // 重新排序
      const fieldOptionList = this.thisFormField.fieldOptionList
      fieldOptionList.map(function(option, index) {
        option.optionSeq = index + 1
        return option
      })
    }
  }
}
</script>

<style scoped>
.option-transition-enter-active, .option-transition-leave-active {
  transition: all 500ms;
}
.option-transition-enter, .option-transition-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

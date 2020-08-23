const { default: Enum } = require('../utils/Enum')

export const FieldTypeEnum = new Enum([
  {
    label: '单行文本题',
    value: 'input',
    key: 'INPUT'
  },
  {
    label: '多行文本题',
    value: 'textarea',
    key: 'TEXTAREA'
  },
  {
    label: '单选题',
    value: 'radio',
    key: 'RADIO'
  },
  {
    label: '多选题',
    value: 'checkbox',
    key: 'CHECKBOX'
  }
])

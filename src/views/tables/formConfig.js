import FormStyle from '@/const/formStyleConst'
import validate from '@/utils/validate'
const config = {
  title: '过滤表单',
  ref: 'filterForm',
  params: {
    showFiled: 'show', // 对象中带有show字段&&show的value为true就会展示
    deviceName: {
      label: '测试规则',
      value: '',
      show: true,
      type: FormStyle.INPUT_STRING,
      labelWidth: 100,
      ruleRely: 'deviceName2',
      transformationFunc: function (target) {
        // mode转换方法
        return '1'
      },
      rules: [
        {
          validator: function (rule, value, callback) {
            validate({
              maxLen: 10,
              value,
              callback
            })
          },
          trigger: 'change'
        }, {
          validator: function (rule, value, callback) {
          },
          trigger: 'change'
        }
      ],
      defaultValue: '', // 默认值:代表这个输入框没有填写
      span:6
    },
    deviceName2: {
      label: '333cccccccccccccccccccccccccc',
      value: '',
      show: true,
      type: FormStyle.INPUT_NUMBER,
      offset:0

    },
    deviceName21: {
      label: '密码框',
      value: '',
      show: true,
      type: FormStyle.INPUT_PASSWORD

    },
    deviceName5: {
      label: '测试添加个数',
      value: '',
      show: true,
      type: FormStyle.INPUT_SINGLE_SELECT,
      options: [
        {
          label: '1',
          value: 1,
          disable: false
        },
        {
          label: '2',
          value: 2,
          disable: false
        }
      ]

    },
    deviceName3: {
      label: '5555',
      value: '',
      show: true,
      type: FormStyle.INPUT_SEAT,
      labelWidth: 100,
      options: [
        {
          label: 'ddddddd',
          value: 'd',
          disable: false
        },
        {
          label: '3333',
          value: 'dvvv',
          disable: true
        }
      ]
    },
    deviceName6: {
      label: '模板',
      value: '',
      show: true,
      type: FormStyle.INPUT_SINGLE_SELECT,
      labelWidth: 100,
      options: [
        {
          label: 'ddddddd',
          value: 'd',
          disable: false
        },
        {
          label: '3333',
          value: 'dvvv',
          disable: true
        }
      ]
    }
  }
}
export default config

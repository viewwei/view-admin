<template>
  <div class="main">
    <el-form ref="form" :model="formStyle" :inline="true">
      <el-row>
        <el-col
          :span="filedValue.hasOwnProperty('span') ? filedValue.span : 10"
          v-for="([filed, filedValue], index) in formData"
          :key="index"
        >
          <!-- 输入框为普通字符串 || 密码框 -->
          <el-form-item
            v-if="
              filedValue.type == FormStyle.INPUT_STRING ||
              FormStyle.INPUT_PASSWORD == filedValue.type
            "
            :prop="`params.${filed}.value`"
            :rules="getRule(filedValue.rules, filedValue)"
          >
            <p
              slot="label"
              class="form_item_label"
              :style="{
                width: filedValue.labelWidth
                  ? `${filedValue.labelWidth}px`
                  : '100px',
              }"
            >
              {{ filedValue.label }}
            </p>
            <el-input
              :type="
                filedValue.type == FormStyle.INPUT_STRING ? 'text' : 'password'
              "
              v-model="filedValue.value"
              :clearable="true"
            ></el-input>
          </el-form-item>
          <!-- 输入框为数值 -->
          <el-form-item v-else-if="filedValue.type == FormStyle.INPUT_NUMBER">
            <p
              slot="label"
              class="form_item_label"
              :style="{
                width: filedValue.labelWidth
                  ? `${filedValue.labelWidth}px`
                  : '100px',
              }"
            >
              {{ filedValue.label }}
            </p>
            <el-input
              v-model.number="filedValue.value"
              type="number"
              :clearable="true"
            ></el-input>
          </el-form-item>
          <!-- 输入框为下拉框 -->
          <el-form-item
            v-else-if="filedValue.type == FormStyle.INPUT_SINGLE_SELECT"
          >
            <p
              slot="label"
              class="form_item_label"
              :style="{
                width: filedValue.labelWidth
                  ? `${filedValue.labelWidth}px`
                  : '100px',
              }"
            >
              {{ filedValue.label }}
            </p>
            <el-select v-model="filedValue.value">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in filedValue.options"
                :key="index"
                :disabled="
                  item.hasOwnProperty('disable') ? item.disable : false
                "
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 多选 -->
          <el-form-item
            v-else-if="filedValue.type == FormStyle.INPUT_MULTIPLE_SELECT"
          >
            <p
              slot="label"
              class="form_item_label"
              :style="{
                width: filedValue.labelWidth
                  ? `${filedValue.labelWidth}px`
                  : '100px',
              }"
            >
              {{ filedValue.label }}
            </p>
            <el-select v-model="filedValue.value" :multiple="true">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in filedValue.options"
                :key="index"
                :disabled="
                  item.hasOwnProperty('disable') ? item.disable : false
                "
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 输入框占位符号-->
          <el-form-item
            v-else-if="filedValue.type == FormStyle.INPUT_SEAT"
           :style="{opacity:0}"
          >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import FormStyle from "@/const/formStyleConst";
export default {
  computed: {
    formData() {
      let keys = Object.entries(this.formStyle.params);
      let legKeys = keys.filter(([_, filedValue]) => {
        if ((Object.prototype.toString.call(filedValue) != "[object Object]") || 
          (filedValue.hasOwnProperty('template') && filedValue.template == true)
        ) {
          return false;
        }else if (this.formStyle.params.hasOwnProperty('showFiled') &&filedValue[this.formStyle.params.showFiled] == false){
        //  判断有无showFiled字段，如果存在,并且设置为false，则不显示
         return false
        }
        return true;
      });
      
      return legKeys;
    },
  },
  methods: {
    getRule(rules, value) {
      if (!Array.isArray(rules)) {
        return [];
      }
      for (let index = 0; index < rules.length; index++) {
        let rule = rules[index];
        /**
         * 这里trigger的大概率方正就是
         * 下拉框选择blur,失去焦点触发
         * 输入框选择change变化
         * */
        if (
          value.hasOwnProperty('ruleRely') && 
          this.formStyle.params.hasOwnProperty(value.ruleRely)
          ) {
            /**
             * 这条代码的意思是当一个条件依赖其他条件的时候，可以使用这种方式，
             * ruleRely 会在validate函数的第一个参数返回，并且是ruleRely的值是一个响应数据
             * */
            rule.ruleRely = this.formStyle.params[value.ruleRely]
        }
        if (
          value.type == FormStyle.INPUT_STRING ||
          value.type == FormStyle.INPUT_NUMBER ||
          value.type == FormStyle.INPUT_PASSWORD
        ) {
          // 代表普通输入框，密码框，数字框选择使用change
          if (
            rule.hasOwnProperty("trigger") &&
            ["blur", "change"].includes(rule.trigger)
          ) {
            continue;
          }
          rule.trigger = "change";
        } else if (
          value.type == FormStyle.INPUT_SINGLE_SELECT ||
          value.type == FormStyle.INPUT_MULTIPLE_SELECT ||
          value.type == FormStyle.INPUT_DATE ||
          value.type == FormStyle.INPUT_TIME
        ) {
          // 代表下拉框，下拉多选框，日期选择框，时间选择框
          rule.trigger = "blur"; //代表失去焦点触发
        }
      }
      return rules
    },
  },
  props: {
    formStyle: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      FormStyle,
    };
  },
};
</script>
<style  scoped>
.main >>> .el-form-item {
  display: flex;
  flex-direction: row;
}
.main >>> .el-form-item__content {
  flex: 1;
}
.main >>> .el-select {
  width: 100%;
}
</style>
<style lang="scss" scoped>
.form_item_label {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.main {
  background-color: #fff;
}
</style>
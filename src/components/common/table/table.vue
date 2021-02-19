<template>
  <div>
    <el-table v-bind="$attrs">
      <el-table-column
        type="index"
        v-if="tableStyle.params.index.show"
        :width="tableStyle.params.index.width"
        :index="tableStyle.params.index.indexMethod"
        :label="tableStyle.params.index.label"
      >
      </el-table-column>
      <!-- 操作栏 -->
      <!-- 操作栏目设计思路如下 -->
      <!-- 如果操作栏目有slot，那么优先使用slot,slot的名称为配置字段tableOperation下的slot字段 -->
      <!-- 1.代表操作栏没有插槽，并且存在操作动作 -->
      <el-table-column
        :width="
          tableStyle.tableOperation.width
            ? tableStyle.tableOperation.width
            : '100'
        "
        :fixed="tableStyle.tableOperation.fixed"
        :label="tableStyle.tableOperation.label"
        v-if="
          tableStyle.tableOperation.operations.length > 0 &&
          Boolean(
            $scopedSlots[
              tableStyle.tableOperation.slot
                ? tableStyle.tableOperation.slot
                : 'tableOperation'
            ]
          ) == false
        "
      >
        <template slot-scope="scope">
          <a
            class="table-operation"
            v-for="(item, index) in tableStyle.tableOperation.operations"
            :key="index"
            @click="tableOperationEvent(scope, item)"
            >{{
              item.formatterFun
                ? item.formatterFun(scope)
                : item.label
                ? item.label
                : "操作"
            }}</a
          >
        </template>
      </el-table-column>
      <!-- 2.代表操作使用插槽的 -->
      <el-table-column
        :width="
          tableStyle.tableOperation.width
            ? tableStyle.tableOperation.width
            : '100'
        "
          :fixed="tableStyle.tableOperation.fixed"
        :label="tableStyle.tableOperation.label"
        v-else-if="
          Boolean(
            $scopedSlots[
              tableStyle.tableOperation.slot
                ? tableStyle.tableOperation.slot
                : 'tableOperation'
            ]
          )
        "
      >
        <template slot-scope="scope">
          <slot
            :name="
              tableStyle.tableOperation.slot
                ? tableStyle.tableOperation.slot
                : 'tableOperation'
            "
            :row="scope.row"
            :table="tableStyle.tableOperation"
          ></slot>
        </template>
      </el-table-column>

      <!-- 表单内容内容操作下 -->
     <template  v-for="([filed,filedItem],index) of getTableStyleData" >
         <!-- 1.代表正常读取+展示数据，数据不需要加工 -->
       <el-table-column 
       v-if="filedItem.readType == TableConst.NORMAL|| !filedItem.readType" :key="index"
       :label="filedItem.label"
       >
           <template slot-scope="scope"> {{scope.row[filed]}}</template>
       </el-table-column>
       <!-- 代表通过函数读取，返回当前行数和这一行的数据 -->
        <el-table-column v-if="filedItem.readType == TableConst.FUNCTION" :key="index"
         :label="filedItem.label"
        >
           <template slot-scope="scope"> {{filedItem.readFunc(scope.row,scope.$index)}}</template>
       </el-table-column>
       </template>
    </el-table>
     <!-- <div class="block">
    <el-pagination
    :small="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div> -->
  </div>
</template>
<script>
import {TableNomalConst,TableConst} from "@/const/table.js"

export default {
  inheritAttrs: false,
  props: {
    tableStyle: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // scope 代表表格的作用域插槽数据 item代表表格配置项数据中的operations遍历数据
    tableOperationEvent(scope, item) {
      console.log("scope:", scope, item);
      item.event && this.$emit(item.event, scope.row);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
       handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  },
  data(){
      return {
          TableConst,
          currentPage4:20
      }
  },
  computed:{
      getTableStyleData(){
        //   获取表格样式数据
        let styleData = []
        if (!this.tableStyle.params){
            return 
        }
        styleData= Object.entries(this.tableStyle.params).filter(key=>{
             const [fild,item] = key
            //  判断是不是序号或者返回值是不是非对象
             if (fild ==TableNomalConst.INDEX ||
              (!Object.is(typeof item,'object')) ||
               (Object.is(typeof item,'object') && (item[this.tableStyle.params.tableShowField] == false ||item[this.tableStyle.params.tableHide] == false )) ){
                 return false
             }
             return true

         })
        return styleData
      }
  }
};
</script>
<style lang="scss" scoped>
.table-operation {
  padding-right: 20px;
  cursor: pointer;
  user-select: none;
  color: $primary;
}
.table-operation:hover {
  color: $primary;
}
.table-pagination {
    background-color: orange;
}
</style>
<template>
  <div v-loading="loading">
    <el-table
      v-bind="$attrs"
      v-on="$listeners"
      @select="selectionChange"
      @select-all="selectAll"
      @header-dragend="headerDragend"
      :data="getTableSourceData"
      :header-cell-style="{ background: '#2495CE', color: '#FFF' }"
      ref="commonTable"
      size="mini"
    >
       <el-table-column
      type="selection"
      width="55"
      v-if="tableStyle.params.select"
      >
    </el-table-column>
      <el-table-column
        type="index"
        fixed="left"
        v-if="tableStyle.params.index&&tableStyle.params.index.show"
        :index="tableStyle.params.index.indexMethod"
        :label="tableStyle.params.index.label"
        width="50"
      >
      </el-table-column>
      <!-- 操作栏 -->
      <!-- 操作栏目设计思路如下 -->
      <!-- 如果操作栏目有slot，那么优先使用slot,slot的名称为配置字段tableOperation下的slot字段 -->
      <!-- 1.代表操作栏没有插槽，并且存在操作动作 -->
      <el-table-column
        :label="tableStyle.tableOperation.label"
        :fixed="tableStyle.tableOperation.fixed"
        :min-width="tableStyle.tableOperation.minWidth"
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
        :fixed="tableStyle.tableOperation.fixed"
        :label="tableStyle.tableOperation.label"
        :min-width="tableStyle.tableOperation.minWidth"
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
      <template v-for="([filed, filedItem], index) of getTableStyleData">
        <!-- 1.代表正常读取+展示数据，数据不需要加工 -->
        <el-table-column
          v-if="filedItem.readType == TableConst.NORMAL || !filedItem.readType"
          :key="index"
          :label="filedItem.label"
           :min-width="filedItem.minWidth"
             :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
             {{ scope.row[filed] }}
             </template>
        </el-table-column>
        <!-- 代表通过函数读取，返回当前行数和这一行的数据 -->
        <el-table-column
          v-if="filedItem.readType == TableConst.FUNCTION"
          :key="index"
          :label="filedItem.label"
          :min-width="filedItem.minWidth"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
           {{ filedItem.readFunc(scope.row, scope.$index,getTableSourceData) }}  </template
          >
        </el-table-column>
       <!-- 代表超级链接 -->
        <el-table-column
          v-if="filedItem.readType == TableConst.LINK"
          :key="index"
          :label="filedItem.label"
          :min-width="filedItem.minWidth"
          :show-overflow-tooltip="true"
        >
        <template slot-scope="{row,$index}">
           <sn-link v-on="$listeners" :row="row" :scope="filedItem" :field="filed" :sourceData="getTableSourceData" :index="$index" />
        </template>
        </el-table-column>
          <!-- 代表tag布局 -->
        <el-table-column
          v-if="filedItem.readType == TableConst.TAG"
          :key="index"
          :label="filedItem.label"
          :min-width="filedItem.minWidth"
        >
        <template slot-scope="{row,$index}">
           <sn-tag :row="row" :scope="filedItem" :field="filed"
           :sourceData="getTableSourceData" :index="$index"
           v-on="$listeners"
           />
        </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="table-pagination">
      <el-pagination
        :small="false"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="
          $attrs.page_sizes ? $attrs.page_sizes : [10, 20, 100, 1000]
        "
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="showType == 0 ? totalNum : sourceData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { TableNomalConst, TableConst } from "@/const/table.js";
import elLink from "./templetes/elLink"
import snTag from "./templetes/tableTag"
export default {
  inheritAttrs: false,
  components:{
    "sn-link":elLink,
    "sn-tag":snTag
  },
  props: {
    // 表格样式
    tableStyle: {
      type: Object,
      required: true,
    },
    sourceData: {
      // 源数据，未加工数据
      type: Array,
      required: true,
    },
    showType: {
      //数据展示列表
      // 0代表数据请求样式，1代表全部请求样式
      type: Number,
      required: false,
      default: 0,
    },
    totalNum: {
      // 网络请求的时候使用数量
      type: Number,
      required: false,
    },
    pageNum: {
      //当前页码
      type: Number,
      required: false,
      default: 1,
    },
    pageSizes: {
      // 当前一页条目数据
      type: Number,
      required: false,
      default: 10,
    },
    loading: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    headerDragend(){
      this.doLayout()
    },
    // scope 代表表格的作用域插槽数据 item代表表格配置项数据中的operations遍历数据
    tableOperationEvent(scope, item) {
      item.event && this.$emit(item.event, scope.row);
    },
    selectAll(section){
     this.$emit('selectAll',section)
    },
    selectionChange(section){
      this.$emit('selectAll',section)
    },
    // 改变页面条目
    handleSizeChange(val) {
      if (this.showType == 1) {
        this.pageSize = val;
      } else if (this.showType == 0) {
        // 代表是请求数据
      }
    },
    // 改变页码调用
    handleCurrentChange(val) {
      if (this.showType == 1) {
        this.currentPage = val;
      }
      this.$emit("handleSizeChange", {
        pagenum: val,
        pagesize: this.pageSize,
      });
    },
    doLayout() {
      this.$nextTick(() => {
        this.$refs.commonTable.doLayout();
      });
    },
  },
  data() {
    return {
      TableConst,
      currentPage: this.pageNum, //当前页码
      pageSize: this.pageSizes, //一页条数
    };
  },
  computed: {
    // 组装请求表格实例
    getTableStyleData() {
      //   获取表格样式数据
      let styleData = [];
      if (!this.tableStyle.params) {
        return;
      }
      styleData = Object.entries(this.tableStyle.params).filter((key) => {
        const [fild, item] = key;
        //  判断是不是序号或者返回值是不是非对象
        if (
          fild == TableNomalConst.INDEX ||
          !Object.is(typeof item, "object") ||
          (Object.is(typeof item, "object") &&
            (item[this.tableStyle.params.tableShowField] == false ||
              item[this.tableStyle.params.tableHide] == false))
        ) {
          return false;
        }
        return true;
      });
      return styleData;
    },
    // 组织表格数据
    getTableSourceData() {
      if (this.showType == 0) {
        return this.sourceData;
      }
      let showData = [];
      showData = this.sourceData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      return showData;
    },
  },
  watch: {
    getTableStyleData(val) {
      this.doLayout();
    },
  },
};
</script>
<style scoped>
.table-pagination >>> .el-input__inner {
  outline-color: red;
  color: #000;
  border: 1px solid #dcdfe6;
}
.table-pagination >>> .el-input__inner:focus {
  border: 1px solid #1890ff;
}
</style>
<style lang="scss" scoped>
.table-operation {
  padding-right: 20px;
  color: $primary;
  cursor: pointer;
  user-select: none;
}
.table-operation:hover {
  color: $primary;
}
.table-pagination {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px 0px;
  background-color: #fff;
}
.text-show {
    // white-space: nowrap;
    // text-overflow: ellipsis;
    // overflow: hidden;
}
</style>

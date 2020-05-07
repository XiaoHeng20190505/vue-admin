<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <!-- 表单操作 -->
      <el-row>
        <el-col :span="4">
          <el-form-item label="类型：">
            <el-select
              v-model="formInline.region"
              placeholder="请选择"
              style="width: 120px"
              size="medium"
            >
              <el-option label="国际信息" value="InternationalInfo"></el-option>
              <el-option label="国内信息" value="DomesticInfo"></el-option>
              <el-option label="社会信息" value="SocialInfo"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="日期：">
            <el-date-picker
              v-model="formInline.dateValue"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 400px"
              size="medium"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="关键字：">
            <el-select
              v-model="formInline.keywords"
              placeholder="ID"
              style="width: 80px"
              size="medium"
            >
              <el-option label="ID" value="id"></el-option>
              <el-option label="标题" value="title"></el-option>
            </el-select>
            <div class="emptyDiv"></div>
            <el-input
              v-model="formInline.user"
              placeholder="请输入内容"
              style="width: 160px"
              size="medium"
            ></el-input>
            <div class="emptyDiv"></div>
            <el-button type="danger" @click="onSubmit" size="medium">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item style="float: right">
            <el-button type="danger" size="medium" @click="dialogFormVisible = true">新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 表格信息显示 -->
      <el-row>
        <el-table
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%; margin-bottom:20px"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="info" label="标题"></el-table-column>
          <el-table-column prop="category" label="类别" width="120"></el-table-column>
          <el-table-column prop="date" label="日期" width="160">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="administrator" label="管理人" width="120"></el-table-column>
          <el-table-column label="操作" width="180">
            <el-button type="danger" size="small">删除</el-button>
            <el-button type="success" size="small" @click="onAddIndo">编辑</el-button>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 表格下方操作 -->
      <el-row>
        <el-button size="small">批量删除</el-button>
        <el-pagination class="pull-right" background layout="prev, pager, next" :total="1000"></el-pagination>
      </el-row>
    </el-form>

      <!-- 编辑弹出框 -->
      <el-dialog title="新增" :visible.sync="dialogFormVisible" top="20vh">
        <el-form :model="dialogForm">
          <el-form-item label="类别:" :label-width="dialogForm.formLabelWidth">
            <el-select
              v-model="dialogForm.region"
              placeholder="请选择"
              style="width: 120px"
              size="medium"
            >
              <el-option label="国际信息" value="InternationalInfo"></el-option>
              <el-option label="国内信息" value="DomesticInfo"></el-option>
              <el-option label="社会信息" value="SocialInfo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题:" :label-width="dialogForm.formLabelWidth">
            <el-input v-model="dialogForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="概况:" :label-width="dialogForm.formLabelWidth">
            <el-input v-model="dialogForm.content" autocomplete="off" type="textarea" :autosize="{minRows:6,maxRows:6}"></el-input>
          </el-form-item> 
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.demo-form-inline .emptyDiv {
  width: 10px;
  height: 100%;
  display: inline-block;
}
.demo-form-inline .el-col-10 {
  width: 40%;
}
.demo-form-inline .el-col-8 {
  width: 35%;
}
el-table {
  text-align: center;
}
</style>
<script>
import { reactive, ref, toRefs, isRef } from "@vue/composition-api";
export default {
  name: "infoList",
  setup(props, context) {
    //数据声明
    //信息表格列表
    const tableData = reactive([
      {
        info: "美国一流行病专家从政府辞职 其负责的防疫团队曾被解散",
        category: "国际信息",
        date: "2016-05-03",
        administrator: "管理员"
      },
      {
        info: "纽约州或于一周内部分重开 州长：须扩大病毒检测规模",
        category: "国际信息",
        date: "2016-05-03",
        administrator: "张三"
      },
      {
        info: "约翰逊复工后缺席8场简报会 英国民众建议他回去休息",
        category: "国际信息",
        date: "2016-05-03",
        administrator: "李四"
      },
      {
        info: "韩国客机降落遭驻韩美军拒绝 被迫空中盘旋1小时",
        category: "国际信息",
        date: "2016-05-03",
        administrator: "王五"
      }
    ]);
    const formInline = reactive({
      user: "",
      region: "",
      keywords: "",
      dateValue: ""
    });
    const dialogFormVisible = ref(false)
    const dialogForm = reactive({
      region: "",
      title: "",
      content: "",
      formLabelWidth: '60px'
    })
    const onSubmit = () =>{
      onMessage("submit!","success");
    }
    const onAddIndo = () =>{
      dialogFormVisible.value = true
      //  alert("submit!");
    }
    /**封装 element-ui 的消息弹出框 */
    const onMessage = (message, type, bolShow, timer) => {
      context.root.$message({
        message,
        type,
        duration: timer || 2000,
        showClose: bolShow
      });
    };

    return {
      tableData,
      formInline,
      dialogFormVisible,
      dialogForm,
      onSubmit,
      onAddIndo
    };
  }
};
</script>
<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <!-- 表单操作 -->
      <el-form-item label="关键字：">
        <el-select
          v-model="formInline.keywords"
          placeholder="手机号"
          style="width: 100px"
          size="medium"
        >
          <el-option label="手机号" value="usertelephone"></el-option>
          <el-option label="姓名" value="userName"></el-option>
        </el-select>
        <div class="emptyDiv"></div>
        <el-input
          v-model="formInline.context"
          placeholder="请输入内容"
          style="width: 160px"
          size="medium"
        ></el-input>
        <div class="emptyDiv"></div>
        <el-button type="danger" @click="onSubmit" size="medium">查询</el-button>
      </el-form-item>
    </el-form>

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
        <el-table-column prop="userEmail" label="邮箱/用户名" width="180"></el-table-column>
        <el-table-column prop="userName" label="真实姓名" width="120"></el-table-column>
        <el-table-column prop="userTelephone" label="手机号" width="180"></el-table-column>
        <el-table-column prop="userAddress" label="地区"></el-table-column>
        <el-table-column prop="userRole" label="角色" width="120"></el-table-column>
        <el-table-column prop="userDisabled" label="禁启用状态">
          <el-radio-group v-model="radioable">
            <el-radio :label="1">禁用</el-radio>
            <el-radio :label="2">启用</el-radio>
          </el-radio-group>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="danger" size="small">删除</el-button>
          <el-button type="success" size="small" @click="onAddIndo">编辑</el-button>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 表格下方,分页及批量删除操作 -->
    <el-row>
      <el-button size="small">批量删除</el-button>
    </el-row>
    <!-- 新增/编辑用户对话框 -->
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm">
        <el-form-item label="用户名" :label-width="dialogForm.formLabelWidth">
          <el-input v-model="dialogForm.userEmail" autocomplete="off"  style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="dialogForm.formLabelWidth">
          <el-input v-model="dialogForm.userName" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="dialogForm.formLabelWidth">
          <el-input v-model="dialogForm.userTelephone" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="地区" :label-width="dialogForm.formLabelWidth">
          <el-select v-model="dialogForm.userProvince" placeholder="省" style="width: 100px; margin-right:20px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-select v-model="dialogForm.userMunicipal" placeholder="市" style="width: 100px; margin-right:20px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-select v-model="dialogForm.userDistrict" placeholder="区" style="width: 100px; margin-right:20px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="dialogForm.formLabelWidth">
          <el-radio-group v-model="dialogForm.disabled">
            <el-radio :label="true">禁用</el-radio>
            <el-radio :label="false">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色" :label-width="dialogForm.formLabelWidth">
          <el-checkbox-group v-model="dialogForm.userRole">
            <el-checkbox label="系统管理员"></el-checkbox>
            <el-checkbox label="信息管理员"></el-checkbox>
            <el-checkbox label="用户管理员"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false" style="width: 100px">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" style="width: 100px">确 定</el-button>
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
</style>
<script>
import { reactive, ref, toRefs, isRef } from "@vue/composition-api";
export default {
  name: "userlist",
  setup(props, content) {
    //   数据声明
    // 表单提交
    const formInline = reactive({
      keywords: "",
      context: ""
    });
    // 表格内容存储
    const tableData = reactive([
      {
        userEmail: "409019683@qq.com",
        userName: "张三",
        userTelephone: "13788888888",
        userAddress: "广东省 深圳市 宝安区",
        userRole: "系统管理员",
        userDisabled: 1
      }
    ]);

    const radioable = ref(2);
    const dialogFormVisible = ref(false);
    const dialogForm = reactive({
        userEmail: "",
        userName: "",
        userTelephone: "",
        userProvince: [],
        userMunicipal: [],
        userDistrict: [],
        disabled: true,
        userRole: [],
        formLabelWidth: '120px'
    })

    const onSubmit = () => {
      alert("成功");
    };
    const onAddIndo = () => {
      dialogFormVisible.value = true;
    };

    return {
      formInline,
      tableData,
      radioable,
      dialogFormVisible,
      dialogForm,
      onSubmit,
      onAddIndo
    };
  }
};
</script>
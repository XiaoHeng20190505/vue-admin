<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="4">
          <el-form-item label="类型：">
            <el-select
              v-model="formInline.region"
              placeholder="请选择"
              style="width: 120px"
              size="medium"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="日期：">
            <el-date-picker
              v-model="value1"
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
              v-model="formInline.region"
              placeholder="ID"
              style="width: 80px"
              size="medium"
            >
              <el-option label="id" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
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
            <el-button type="danger"  size="medium">新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
</style>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      value1: ""
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
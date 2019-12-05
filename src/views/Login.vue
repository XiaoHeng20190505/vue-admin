<template>
  <!-- 最外层要有一层包裹区div即可 -->
  <div id="Login">
    <!-- div里边是内容区 -->
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="item in menutab"
          v-bind:key="item.text"
          @click="doTab(item)"
        >
          {{ item.text }}
          <!-- 循环li列表，实现登陆Tab导航功能 -->
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
            提交
          </el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  components: {}, // 声明组件的地方
  data() {
    // 存放数据的地方
    return {
      menutab: [
        { text: "登陆", current: true },
        { text: "注册", current: false }
      ]
    };
  },
  methods: {
    // vue数据驱动视图，数据驱动视图渲染。
    doTab(item) {
      this.menutab.forEach(item => {
        item.current = false;
      });
      if (item.index == 0) {
        item.current = true;
      } else {
        item.current = true;
      }
    }
  }, // 定义函数（方法）
  created: {}, // 创建完成时
  Mounted: {} // 挂载完成时
};
</script>
<style lang="scss" scoped>
// scoped代表此样式只在本文件内有效，不写的话就是全局样式了
#Login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center; // 文字居中
  li {
    display: inline-block; // 将块元素转换成行内元素
    width: 88px; // 宽度
    line-height: 36px; // 加粗
    font-size: 14px; // 字号
    color: #fff;
    border-radius: 2px; //圆角效果
    cursor: pointer; // 鼠标在此处有焦点的时候，鼠标箭头编程手势
  }
}
.current {
  background-color: rgba(0, 0, 0, 0.1); // 当前选中的内容应该有一个背景颜色
}
</style>

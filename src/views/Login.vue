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
      <!-- 表单开始 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <!-- 用户名 -->
        <el-form-item prop="username" class="login-item">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="邮箱格式：xxx@xxx.com"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" class="login-item">
          <label>密码</label>
          <el-input type="text" v-model="ruleForm.password" autocomplete="off" placeholder="密码格式：数字+字母"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="checkpass" class="login-item" v-if="model == 'register'">
          <label>确认密码</label>
          <el-input type="text" v-model="ruleForm.checkpass" autocomplete="off" placeholder="密码格式：数字+字母"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="vcode" class="login-item">
          <label>验证码</label>
          <el-row :gutter="11">
            <!-- v-model.number 绑定数据，会限制只能输入数字 -->
            <el-col :span="15"><el-input v-model="ruleForm.vcode" placeholder="六位：数字和字母"></el-input></el-col>
            <el-col :span="8"><el-button type="success" class="login-btn" @click="getSms()">验证码</el-button></el-col>
          </el-row>
          
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item class="login-item">
          <el-button 
          type="danger" 
          @click="submitForm('ruleForm')" 
          class="login-btn login-submit" 
          :disabled="submitButtonEnable"
          >{{ model == 'login' ? '登录' : '注册' }}</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
    </div>
  </div>
</template>
<script>
import  { getVcode }  from '../api/login'
import { reactive, ref, toRefs, isRef } from "@vue/composition-api"
import { stripscript, checkUsername, checkPassword, checkVcode } from '../utils/validate.js'; //引用外部Jscript的函数方式：import,多个函数名使用逗号隔开
export default {
  name: "Login",
  setup(props, context) {
    // console.log(context)//可查看context包括什么内容
    /**
     * 数据验证
     */
    // 验证-邮箱
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱！"));
      } else if (!checkUsername(value)) {
        callback(new Error("邮箱格式错误！"));
      }else {
        callback(); //返回true
      }
    };
    // 验证-密码
    var validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码！"));
      } else if (value.length < 6 || value.length >20) {
        callback(new Error("密码长度在6~20位"));
      } else if (!checkPassword(value)) {
        callback(new Error("密码格式不正确，应为数字+字母！"));
      } else {
        callback();
      }
    };
    //验证-确认密码
    var validateCheckpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码！"));
      } else if (value.length < 6 || value.length >20) {
        callback(new Error("密码长度在6~20位"));
      } else if (!checkPassword(value)) {
        callback(new Error("密码格式不正确，应为数字+字母！"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次密码输入不一致，请检查！"));
      } else {
        callback();
      }
    };
    // 验证-验证码
    var validateVcode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码！"));
      }else if (value.length != 6) {
        return callback(new Error("验证码长度为6！"));
      } else if (!checkVcode(value)) {
        return callback(new Error("验证码格式不正确！"));
      } else {
         return callback();
      }

    };

    /**
     * 声明数据,声明的都是一个对象
     */
    /**模块登录、注册按钮 */
    const menutab = reactive([
        { text: "登陆", current: true, type: "login"},
        { text: "注册", current: false, type: "register" }
    ])
    /**form表单信息 */
    const ruleForm = reactive({
        username: "",
        password: "",
        checkpass: "",
        vcode: ""
    })
    /** 声明模块值*/
    const model = ref("login")
    /**提交按钮是否可用 */
    const submitButtonEnable = ref(true)
    /**
     * 声明form表单验证
     */
    const rules = reactive({
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        checkpass: [{ validator: validateCheckpass, trigger: "blur" }],
        vcode: [{ validator: validateVcode, trigger: "blur" }]
    })
    /**
     * 声明函数
     */
    /**登录、注册模块切换 */
    const doTab = (item => {
        menutab.forEach(item => {
        item.current = false;
      });
      if (item.index == 0) {
        item.current = true;
        model.value = item.type;
      } else {
        item.current = true;
        model.value = item.type;
      }

    })
    /**获取验证码*/
    const getSms = (() => {
      if(!checkUsername(ruleForm.username)){
        context.root.$message.error('用户名格式错误')
        return
      }
      let data = {username: ruleForm.username,Model: model.value}
      getVcode(data)
    })
    /**form表单提交*/
    const submitForm = (formName => {
      //   context.refs[formName].validate(valid => {
      //   // if (valid) {
      //   //   alert("submit!");
      //   // } else {
      //   //   console.log("error submit!!");
      //   //   return false;
      //   // }
      //   // 为给定 ID 的 user 创建请求
        
      // });
    })

    /**
     * 声明生命周期
     */
    onMounted: {()=>{
    }} // 挂载完成时

    /**
     * 数据返回的地方,声明的方法也要return出去
     */
    return {
        menutab,
        ruleForm,
        rules,
        model,
        submitButtonEnable,
        doTab,
        getSms,
        submitForm
    };
  }
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
.login-form {
  margin-top: 28px;
  label {
    display: block;
    color: #eee;
    font-size: 14px;
    margin-bottom: 4px;
  }
  .login-item {
    margin-bottom: 14px;
  }
  .login-btn {
    width: 100%;
    display: block;
  }
  .login-submit {
    margin-top: 18px;
  }
}
</style>

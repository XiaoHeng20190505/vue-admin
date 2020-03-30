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
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
            placeholder="邮箱格式：xxx@xxx.com"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" class="login-item">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="密码格式：数字+字母"
          ></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="checkpass" class="login-item" v-if="model == 'register'">
          <label>确认密码</label>
          <el-input
            type="password"
            v-model="ruleForm.checkpass"
            autocomplete="off"
            placeholder="密码格式：数字+字母"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="vcode" class="login-item">
          <label>验证码</label>
          <el-row :gutter="11">
            <!-- v-model.number 绑定数据，会限制只能输入数字 -->
            <el-col :span="15">
              <el-input v-model="ruleForm.vcode" placeholder="六位：数字和字母"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button
                type="success"
                class="login-btn"
                @click="getSms()"
                :disabled="VcodeData.VcodeStatus"
              >{{ VcodeData.VcodeContext }}</el-button>
            </el-col>
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
import { getVcode, Register, Login } from "../api/login";
import { reactive, ref, toRefs, isRef } from "@vue/composition-api";
import {
  stripscript,
  checkUsername,
  checkPassword,
  checkVcode
} from "../utils/validate.js"; //引用外部Jscript的函数方式：import,多个函数名使用逗号隔开
export default {
  name: "Login",
  setup(props, context) {
    console.log(context.parent.$route); //可查看context包括什么内容
    // var root = context.root
    /**
     * 数据验证
     */
    // 验证-邮箱
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱！"));
      } else if (!checkUsername(value)) {
        callback(new Error("邮箱格式错误！"));
      } else {
        callback(); //返回true
      }
    };
    // 验证-密码
    var validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码！"));
      } else if (value.length < 6 || value.length > 20) {
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
      } else if (value.length < 6 || value.length > 20) {
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
      } else if (value.length != 6) {
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
      { text: "登陆", current: true, type: "login" },
      { text: "注册", current: false, type: "register" }
    ]);
    /**form表单信息 */
    const ruleForm = reactive({
      username: "",
      password: "",
      checkpass: "",
      vcode: ""
    });
    /** 声明模块值*/
    const model = ref("login");
    /**提交按钮是否可用 */
    const submitButtonEnable = ref(true);
    /**验证码数据 */
    const VcodeData = reactive({
      VcodeStatus: false,
      VcodeContext: "验证码"
    });
    /**60秒倒计时 */
    const TimeDown = reactive({
      timecount: 60,
      timer: 1
    });
    /**
     * 声明form表单验证
     */
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      checkpass: [{ validator: validateCheckpass, trigger: "blur" }],
      vcode: [{ validator: validateVcode, trigger: "blur" }]
    });
    /**
     * 声明函数
     */
    /**登录、注册模块切换 */
    const doTab = item => {
      menutab.forEach(item => {
        item.current = false;
      });
      if (item.index == 0) {
        item.current = true;
        model.value = item.type;
        resetForm();
      } else {
        item.current = true;
        model.value = item.type;
        resetForm();
      }
    };
    /**获取验证码*/
    const getSms = () => {
      if (!checkUsername(ruleForm.username)) {
        context.root.$message.error("用户名格式错误");
        return;
      }
      let data = { username: ruleForm.username, module: model.value };
      /**在获取验证码期间显示'发送中'且按钮不可用
       * 获取验证码成功之后开始倒计时
       * 倒计时结束之后，验证码按钮设置为'再次获取'
       */
      VcodeData.VcodeStatus = true;
      VcodeData.VcodeContext = "发送中";
      /** //模拟服务器卡顿
        setTimeout(() => {
          getVcode(data).then(response => {
          let result = response.data
            if(result.resCode === 0) {
              context.root.$message({
                message:result.message,
                type: 'success'
              })
            }
          }).catch(error => {
            console.log(error)
          })
        }, 3000);
      */

      getVcode(data)
        .then(response => {
          // console.log(response)
          let result = response.data;
          if (result.resCode === 0) {
            context.root.$message({
              message: result.message,
              type: "success",
              duration: 2000,
              showClose: true
            });
            // let count =10//倒计时也可以声明变量
            TimeDown.timer = setInterval(() => {
              --TimeDown.timecount;
              if (TimeDown.timecount == 0) {
                clearInterval(TimeDown.timer);
                VcodeData.VcodeStatus = false;
                VcodeData.VcodeContext = "再次获取";
              } else {
                VcodeData.VcodeContext = `倒计时${TimeDown.timecount}秒`;
                // console.log(count)
              }
            }, 1000);
            //启用提交按钮
            submitButtonEnable.value = false;
          }
        })
        .catch((error) => {
          console.log(error.message.indexOf("timeout"))
          if(error.message.indexOf("timeout") === -1){
            context.root.$message({
              message: "请求异常: "+error.message,
              type: "error",
              duration: 2000,
              showClose: true
            });
          }else{
            context.root.$message({
              message: "请求超时,30秒之后再次获取",
              type: "error",
              duration: 2000,
              showClose: true
            });
            
          }
          /**请求错误30秒之后重新获取 */
          TimeDown.timecount = 30
          TimeDown.timer = setInterval(() => {
              --TimeDown.timecount;
              if (TimeDown.timecount == 0) {
                clearInterval(TimeDown.timer);
                VcodeData.VcodeStatus = false;
                VcodeData.VcodeContext = "再次获取";
              } else {
                VcodeData.VcodeContext = `倒计时${TimeDown.timecount}秒`;
                // console.log(count)
              }
            }, 1000);
        });
    };
    /**form表单提交*/
    const submitForm = formName => {
      let requestData = {
        username: ruleForm.username,
        password: ruleForm.password,
        code: ruleForm.vcode
      };
      context.refs[formName].validate(valid => {
        if (valid) {
          if (model.value == "login") {
            context.root.$store.dispatch("storeLogin", requestData)
              .then(response => {
                let result = response.data;
                if (result.resCode == 0) {
                  context.root.$message({
                    message: result.message,
                    type: "success",
                    showClose: true
                  });
                  // vue3.0z中路由控制实在context.parent.$router中，路由读取可在context.parent.$route中
                  context.parent.$router.push({
                    name: "Console"
                  });
                } else {
                  contex.root.$message.error(result.message);
                  return;
                }
              }).catch( ()=>{
                contex.root.$message.error("error");
              });
          } else {
            Register(requestData)
              .then(response => {
                let result = response.data;
                if (result.resCode == 0) {
                  context.root.$message({
                    message: result.message,
                    type: "success",
                    showClose: true
                  });
                } else {
                  contex.root.$message.error(result.message);
                  return;
                }
              })
              .catch(error => {});
          }
        } else {
          context.root.$message.error("有输入框为空,请检查");
          return false;
        }
        //为给定 ID 的 user 创建请求
      });
    };
    /**在切换登陆注册按钮时重置页面数据 */
    const resetForm = () => {
      context.refs.ruleForm.resetFields(); //输入信息重置
      VcodeData.VcodeStatus = false; //验证码按钮重置
      VcodeData.VcodeContext = "验证码";
      clearInterval(TimeDown.timer); //清掉倒计时
      TimeDown.timecount = 60;
      submitButtonEnable.value = true; //提交按钮不可用
    };

    /**
     * 声明生命周期
     */
    onMounted: {
      () => {};
    } // 挂载完成时

    /**
     * 数据返回的地方,声明的方法也要return出去
     */
    return {
      menutab,
      ruleForm,
      rules,
      model,
      submitButtonEnable,
      VcodeData,
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

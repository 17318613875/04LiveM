<!--
 * @Description: login
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-08-26 18:27:41
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-25 09:54:50
 -->
<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div class="page-login--layer page-login--layer-time" flex="main:center cross:center">{{time}}</div>
    <div class="page-login--layer">
      <div class="page-login--content">
        <div class="page-login--content-header">
          <p class="page-login--content-header-motto"></p>
        </div>
        <div class="page-login--content-main" flex="dir:top main:center cross:center">
          <!-- logo -->
          <img class="page-login--logo" src="./image/logo@2x.png" />
          <p class="page-login--content-header-title">{{$appTitle}}</p>
          <!-- 表单 -->
          <div class="page-login--form">
            <el-card shadow="never">
              <el-form
                ref="loginForm"
                label-position="top"
                :rules="rules"
                :model="formLogin"
                size="default"
              >
                <el-form-item prop="userAccount">
                  <el-input type="text" v-model="formLogin.userAccount" placeholder="用户名">
                    <i slot="prepend" class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="userPassword">
                  <el-input
                    type="password"
                    v-model="formLogin.userPassword"
                    placeholder="密码"
                    @keyup.enter.native="submit"
                  >
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-button size="default" @click="submit" type="primary" class="button-login">登录</el-button>
              </el-form>
            </el-card>
          </div>
          <p
            flex="main:justify cross:center"
            class="page-login--options-tips"
          >Tips：如需申请账号、权限变更请登录OA系统提交申请</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions } from "vuex";
import { InitLoad } from "@/libs/init";
export default {
  data() {
    return {
      timeInterval: null,
      time: dayjs().format("HH:mm:ss"),
      // 表单
      formLogin: {
        userAccount: "",
        userPassword: ""
      },
      // 校验
      rules: {
        userAccount: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.timeInterval = setInterval(() => {
      this.refreshTime();
    }, 1000);
    this.closeAll();
    InitLoad.bind(this)();
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
  methods: {
    ...mapActions("d2admin/account", ["login"]),
    ...mapActions("d2admin/page", ["closeAll"]),
    refreshTime() {
      this.time = dayjs().format("HH:mm:ss");
    },
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick(user) {
      this.formLogin.userAccount = user.userAccount;
      this.formLogin.userPassword = user.userPassword;
      this.submit();
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.commit("d2admin/loading/updateLoading", {
            isLoading: true
          });
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.login({
            userAccount: this.formLogin.userAccount,
            userPassword: this.formLogin.userPassword
          }).then(() => {
            // 重定向对象不存在则返回顶层路径
            this.$store.commit("d2admin/loading/updateLoading", {
              isLoading: false
            });
            this.$router.replace("index");
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  $backgroundColor: #607d8b;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 3% 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
      span {
        color: $color-text-sub;
      }
    }
  }
  // main
  .page-login--logo {
    width: 180px;
  }
  // 登录表单
  .page-login--form {
    width: 280px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }

  .page-login--content-header-title {
    font-size: 30px;
    font-weight: bold;
    color: #ffffff;
    margin-top: 5%;
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
  .page-login--options-tips {
    font-size: 13px;
    line-height: 13px;
    text-align: center;
    color: #ffffff;
  }
}
</style>

<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">A·I CLOUD</h3>
      <h3 class="title">{{text}}</h3>
      <el-form-item prop="adminid" v-if="!adminLogin">
        <span class="svg-container svg-container_login">
        </span>
        <el-input name="adminid" type="text" v-model="loginForm.adminid" autoComplete="on" placeholder="admin id" />
      </el-form-item>      
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="password"></el-input>
          <span class="show-pwd" @click="showPwd"></span>
      </el-form-item>
      <el-form-item>
        <el-row>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          login
        </el-button>        
        </el-row>
      </el-form-item>
      <el-form-item>
      </el-form-item>
      <div class="tips">
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      adminLogin: true,
      loginForm: {
        username: 'admin',
        password: 'admin',
        id: ''
      },
      text: '',
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  mounted: function() {
    /*  var adminid = this.$route.query.adminid
    if (adminid === '' || adminid === undefined) {
      this.adminLogin = true
    } else {
      this.loginForm.adminid = this.$route.query.adminid
      this.adminLogin = false
    }*/
  },
  watch: {
    $route: function() {
      /*  var adminid = this.$route.query.adminid
      if (adminid === '' || adminid === undefined) {
        this.adminLogin = true
      } else {
        this.loginForm.adminid = this.$route.query.adminid
        this.adminLogin = false
      }*/
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.loading = true
      this.$store.dispatch('Login', this.loginForm).then(() => {
        this.loading = false
        this.$router.push({ path: '/' })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
  .login-container {
    height: 100%;
    width:100%;
    background-color: #2d3a4b;
  }
  .login-container input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eee;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 80%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 80%;
      padding: 35px 35px 15px 35px;
      margin: 50px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #889aa4;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  
</style>

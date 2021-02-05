<template>
  <div class="v-login-main">
    <div class="v-main">
      <p class="v-login-title">Login Form</p>
      <el-form ref="form" :model="loginForm" label-position="left">
        <el-form-item>
          <el-input v-model="loginForm.usename">
            <span slot="prefix" class="svg-container">
              <svg-icon icon-class="user" />
            </span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" type="password">
            <span slot="prefix" class="svg-container">
              <svg-icon icon-class="password" />
            </span>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="v-login-btn" @click="loginClick"
        >Login</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        usename: "admin",
        password: "admin",
      },
    };
  },
  mounted() {},
  methods: {
    loginClick() {
      this.$load.loading();
        this.$store
          .dispatch("login/login", {
            username: this.loginForm.usename,
            password: this.loginForm.password,
          })
          .then(() => {
            this.$load.closeLoading();
             let redirect = this.$route.query.redirect;
        if (redirect) {
          this.$router.replace(redirect);
        } else {
          this.$router.replace("/");
        }
          })
          .catch(() => {
            this.$load.closeLoading();
          });

       
    },
  },
};
</script>
<style   lang="scss" scoped>
.v-login-main {
  width: 100%;
  height: 100%;
  background-color: $menuBg;
  display: flex;
  align-items: center;
  justify-content: center;
  .v-main {
    width: 520px;
    padding: 50px;
    .v-login-title {
      text-align: center;
      padding: 20px 0px;
      font-size: 26px;
      font-weight: bold;
      color: #eee;
    }
    .svg-container {
      padding-top: 8px;
      padding-right: 10px;
      color: #889aa4;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .v-login-btn {
      width: 100%;
    }
  }
}
</style>
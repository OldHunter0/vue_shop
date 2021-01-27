<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar-box">
        <img src="../assets/logo.png"
             alt="" />
      </div>
      <el-form label-width="0px"
               class="login_form"
               :model="loginForm"
               :rules="loginRule"
               ref="loginFormRef">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"
                    prefix-icon="el-icon-user"
                    placeholder="username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"
                    prefix-icon="iconfont icon-3702mima"
                    placeholder="password"
                    type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary"
                     @click="checkLoginForm">登录</el-button>
          <el-button type="info"
                     @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRule: {
        username: [
          // 验证用户名是否合法
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在3到10个之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '密码长度应在3到15之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置登录表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    checkLoginForm () {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const { data: result } = await this.$http.post('login', this.loginForm)
          if (result.meta.status !== 200) this.$message.error('登录失败')
          else {
            this.$message.success('登录成功')
            console.log(result)
            window.sessionStorage.setItem('token', result.data.token)
            this.$router.push('/home')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar-box {
  height: 100px;
  width: 100px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  padding: 10px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  top: 30%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>

<template>
  <div class="login_container">
    <div class="login_box">
        <div class = "select">
           <a class="ant" v-bind:class ="{active:isact}" @click="sele" >用户</a>
           <a class="ant" v-bind:class ="{active:!isact}" @click="sele" >管理员</a>
           <div class="clear"></div>
           <div class="s_hr"></div>
           <div class="ss_hr"></div>
         </div>
      <!--登录表单区域 -->
      <div  v-show="isact">
      <el-form :model="loginform" :rules="loginrule" label-width="80px"  class="login_form" ref="logincheck">
         <el-form-item label="邮箱" prop="email">
             <el-input v-model="loginform.email"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
             <el-input v-model="loginform.password" type="password"></el-input>
          </el-form-item>

          <el-form-item style="center">
                <el-button type="primary" plain class="bts" @click="login">登录</el-button>
                  <span>
                     <router-link to= "/register" class="tishi">注册一个？</router-link>
                  </span>
          </el-form-item>
      </el-form>
     </div>
     <!--注册表单区域 -->
      <div v-show="!isact" class="reg">
      <el-form :model="regform" :rules="regrule" label-width="80px"  class="regos_form" ref="regcheck" >

         <el-form-item label="邮箱" prop="email">
             <el-input v-model="regform.email" type="text"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
             <el-input v-model="regform.password" type="password"></el-input>
          </el-form-item>

          <el-form-item style="center">
                <el-button type="primary" plain class="bts"  @click="regbut">登录</el-button>
                <span>
                  <router-link to= "/register" class="tishi">注册一个？</router-link>
                </span>
          </el-form-item>
      </el-form>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('名字不能为空'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else {
        // eslint-disable-next-line no-useless-escape
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/

        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('邮箱格式不对'))
        }
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginform: {
        email: '1045316314@qq.com',
        password: '123'
      },
      loginrule: {
        email: [
          { validator: validateEmail, trigger: 'blur' },
          { max: 64, message: '长度在 64 个字符以下', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' },
          { max: 64, message: '长度在 64 个字符以下', trigger: 'blur' }
        ]
      },
      regform: {
        name: '',
        email: '',
        password: ''
      },
      regrule: {
        name: [
          { validator: validateName, trigger: 'blur' },
          { max: 64, message: '长度在 64 个字符以下', trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' },
          { max: 64, message: '长度在 64 个字符以下', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' },
          { max: 64, message: '长度在 64 个字符以下', trigger: 'blur' }
        ]
      },
      isact: true
    }
  },
  methods: {
    login () {
      // this.$refs.logincheck.validate(async valid => {
      //   console.log(valid)
      //   if (!valid) return
      //   // console.log(this.loginform)
      //   try {
      //     var yy = ''
      //     for (const i in this.loginform) {
      //       yy += encodeURIComponent(i) + '=' + encodeURIComponent(this.loginform[i]) + '&'
      //     }
      //     console.log(yy)
      //     const res = await this.$http.post(
      //       '/aa/api/login', yy)
      //     console.log(res)
      //     if (res.status === 200) {
      //       console.log('登陆成功')
      //       window.sessionStorage.setItem('token', this.loginform.email)
      //       this.$router.push('/welcome')
      //     } else {
      //       console.log('密码错误！')
      //     }
      //   } catch (err) {
      //     alert('密码或者账号错误！')
      //   }
      // })
      this.$router.push('/home')
    },
    regbut () {
      this.$refs.regcheck.validate(async valid => {
        console.log(valid)
        if (!valid) return
        try {
          var yy = ''
          for (const i in this.regform) {
            yy += encodeURIComponent(i) + '=' + encodeURIComponent(this.regform[i]) + '&'
          }
          console.log(yy)
          const res = await this.$http.post(
            '/aa/api/login', yy) // 登录地址
          console.log(res)
          if (res.message === '登录成功！') {
            alert('登陆成功')
            this.$router.push('/welcome')
          }
        } catch (err) {
          alert('密码或者账号错误！')
        }
      })
    },
    sele () {
      this.isact = !this.isact
      this.tran()
    },
    tran () {
      const yidong = document.getElementsByClassName('ss_hr')[0]
      if (this.isact) {
        yidong.style.transform = 'translate(0px,0px)'
      } else {
        yidong.style.transform = 'translate(305px,0px)'
      }
    }
  }
}
</script>

<style lang = "less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-size: cover;
  background-image: url(../assets/image/try1.jpg);
  padding-bottom: 2px;
}
.login_box{
  width: 450px;
  height: 310px;
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.bts{
  width: 100%;
}
/* 登录表单 */
.login_form,.regos_form{
  margin-top: 29px;
  margin-bottom: 30px;
  box-sizing: border-box;
  padding-right: 48px;
}
ra_right{
  margin-left:100px;
}
/* 选择 */
.select {
  width: 400px;
  margin: 0  auto;
  position: relative;
  margin-top: 20px;
}
.ant{
  display: block;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  font-weight: 700;
  letter-spacing: 0.5em;
  font-size: 20px;
  color: #CCCCCC;
  cursor: pointer;
}
.ant:nth-child(1){
  float: left;
}
.ant:nth-child(2){
  float: right;
}
.clear{
  clear: both;
}
.s_hr{
  width: 400px;
  margin: 0 auto;
  border: #CCCCCC solid 2px;
  border-radius: 20px;
  margin-top:10px;
}
.ss_hr{
  width: 80px;
  margin-left: 5px;
  border: #3B99FC solid 3px;
  margin-top:-5px;
  transition: 0.3s  linear ;
}
.active{
  color: #3B99FC;
  display: block;
}
/* 管理员表单 */
.reg{
  background-color: #fff;
  border-radius: 0 0 10px 10px;
}
.el-form-item.is-required .el-form-item__label:before{
content:none;
}
.tishi{
  font-size: small;
  float: right;
  color: #6206A6;
}

</style>

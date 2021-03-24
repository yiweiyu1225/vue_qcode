<template>
<div class="box">
    <div class="all">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" >
         <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
         </el-form-item>
         <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
         </el-form-item>
         <el-form-item label="确认密码" prop="again" >
            <el-input v-model="form.again" type="password"></el-input>
         </el-form-item>
         <el-form-item label="注册身份" prop="identity">
            <el-radio-group  v-model="form.identity">
              <el-radio label="用户"></el-radio>
              <el-radio label="管理员"></el-radio>
            </el-radio-group>
        </el-form-item>
         <el-form-item label="邮箱"  prop="email">
            <el-input v-model="form.email"></el-input>
         </el-form-item>
         <el-form-item label="获取验证码" >
            <div class="out" >
              <div class="in"  :class="rangeStatus?'success':''">
                  <li  @mousedown="rangemove" :class="rangeStatus?successIcon:startIcon" id = "moveli" ></li>
                   {{rangeStatus?successText:startText}}
                   <div id="changecolor">123</div>
              </div>
            </div>
         </el-form-item>
        <el-form-item label="邮箱验证码" prop="pass">
            <el-input v-model="form.pass"></el-input>
         </el-form-item>
         <el-form-item class="butt">
           <el-button type="primary" plain class="bts" @click="resbutton">注册</el-button>
           <el-button type="primary" plain class="bts" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <span>
              <router-link to= "/login" class="tishi">返回登录</router-link>
          </span>
    </el-form>
    </div>
</div>
</template>

<script>
export default {
  props: {
    successIcon: {
      type: String,
      default: 'el-icon-success'
    },
    startIcon: {
      type: String,
      default: 'el-icon-d-arrow-right'
    },
    successText: {
      type: String,
      default: '验证成功'
    },
    startText: {
      type: String,
      default: '拖动滑块到最右边'
    },
    status: {
      type: String
    }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      // eslint-disable-next-line no-useless-escape
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/

      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('邮箱格式不对'))
      }
    }
    var validatema = (rule, value, callback) => {
      console.log(value)
      console.log(this.yz)
      console.log(typeof (value))
      console.log(typeof (this.yz))
      const xx = this.yz.toString()
      console.log(typeof (xx))
      if (value === xx) {
        callback()
      } else {
        return callback(new Error('验证码不对'))
      }
    }
    return {
      form: {
        name: '123',
        password: '123',
        again: '123',
        email: '2304255228@qq.com',
        pass: '',
        identity: ''
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { max: 64, message: '长度在64个字符以下', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { max: 64, message: '长度在64个字符以下', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空不能为空', trigger: 'blur' },
          { max: 64, message: '长度在64个字符以下', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        again: [
          { validator: validatePass, trigger: 'blur' },
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { max: 64, message: '长度在64个字符以下', trigger: 'blur' }
        ],
        pass: [
          { validator: validatema, trigger: 'blur' },
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码错误', trigger: 'blur' }
        ],
        identity: [
          { required: true, message: '请选择身份', trigger: 'change' }
        ]
      },
      rangeStatus: false,
      dis: 0,
      yz: 0
    }
  },
  mounted () {
    this.ren()
  },
  methods: {
    // 滑块渲染
    ren () {
      const changecolor = document.getElementById('changecolor')
      const inbox = document.getElementsByClassName('in')[0]
      const inboxheight = inbox.offsetHeight
      console.log(inboxheight)
      changecolor.style.height = inboxheight + 'px'
      changecolor.style.marginTop = '-' + inboxheight + 'px'
      changecolor.style.width = '0px'
    },
    // 重置函数
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    rangemove (e) {
      // 颜色改变
      // const changecolor = document.getElementById('changecolor')

      const ele = e.target
      const startX = e.clientX
      const elewidth = ele.offsetWidth
      const parewidth = ele.parentElement.offsetWidth
      const maxx = parewidth - elewidth
      if (this.rangeStatus) {
        return false
      }

      // console.log(maxx)
      document.onmousemove = (e) => {
        const endX = e.clientX
        this.dis = endX - startX
        // console.log(this.dis)
        if (this.dis <= 0) {
          this.dis = 0
        }
        if (this.dis >= maxx) {
          this.dis = maxx
        }
        // changecolor.style.width = this.dis + 'px'
        ele.style.transition = '.1s all'
        ele.style.transform = 'translateX(' + this.dis + 'px)'
        e.preventDefault()
      }
      document.onmouseup = () => {
        if (this.dis !== maxx) {
          ele.style.transition = '.5s all'
          ele.style.transform = 'translateX(0)'
          // 执行失败的函数
          this.errorFun && this.errorFun()
        } else {
          this.rangeStatus = true
          if (this.status) {
            this.$parent[this.status] = true // 调用父级组件
          }
          // 执行成功的函数
          document.onmousemove = null
          this.yanzhenma()
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    // 验证码
    yanzhenma () {
      while (this.yz < 1000) {
        this.yz = Math.floor(Math.random() * 10000)
      }
      alert(this.yz)
      console.log(this.yz)
      this.emailApi()
    },
    // 注册函数
    resbutton () {
      this.$refs.ruleForm.validate(async valid => {
        console.log(valid)
        if (!valid) return
        var yy = 'name' + '=' + this.form.name + '&' + 'email' + '=' + this.form.email + '&' + 'password' + '=' + this.form.password
        console.log(yy)
        const res = await this.$http.post(
          '/aa/api/register', yy) // 注册地址
        console.log(res)
        if (res.status === 200) {
          alert('注册成功！')
          this.$router.push('/login')
        }
        // } catch (err) {
        //   console.log(err)
        //   alert('密码或者账号错误！')
        // }
      })
    },
    // 邮箱api
    async emailApi () {
      var yy = 'email' + '=' + this.form.email + '&' + 'pass' + '=' + this.form.yz
      console.log(yy)
      const res = await this.$http.post(
        '/aa/api/register_send_email', yy) // 注册地址
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>

.box{
   height: 100vh;
   width: 100vw;
   background-position: center;
   background-size: cover;
   background-image: url(../assets/image/email_3.jpg);
}
.all{
   width: 960px;
   // border: 5px solid #ccc;
   margin: 0 auto;
   padding-top: 40px;
   padding-bottom: 30px;
   box-shadow: 0px 0px 50px 15px rgba(0,0,0,0.9);
   background-color: rgba(255,255,255, 0.9);
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%,-50%);
}
.el-input{
   width: 95%;
}
.butt{
   padding-right: 100px; //原element自带样式中和
   text-align: center;
}
element.style {
   margin: 0;
}
// 滑块
.out{
  overflow: hidden;
}
.in{
  position: relative;
  width: 30em;
  height: 100%;
  border: 1px solid #8691A8;
  text-align: center;
  border-radius: 20px;
  overflow: hidden;
}
.in li{
  position: absolute;
  left:0;
  border: 1px solid #bbb;
  width: 50px;
  height: 100%;
  line-height: 100%;
  text-align: center;
  list-style: none;
  background-color: #F1F1F1;
  cursor: pointer;
  font-size: 2em;
  color: #8691A8;
}
#changecolor{
  color: #409EFF;
  background-color: #B4E3FA;
}
.success{
  background-color: #B4E3FA ;
}
.tishi{
  font-size: small;
  float: right;
  color: #6206A6;
  padding-right:5%;
}
</style>

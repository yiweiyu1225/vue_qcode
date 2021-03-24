<template>
    <div class="box">
        <el-container>
            <el-header>
                <div>
                   <div class="left">邮箱验证</div>
                   <div class="right"><p id = "timer"></p></div>
                   <div class="clear"></div>
                </div>
            </el-header>
            <el-main>
                 <div class="block">
                    <el-carousel height="300px">
                        <el-carousel-item v-for="item in 3" :key="item">
                         </el-carousel-item>
                    </el-carousel>
                </div>
                <div>
                    <div class="te">
                       <p>恭喜你！成功注册</p>
                       <p>赶紧返回页面登录吧</p>
                    </div>
                    <div class="last">
                        <router-link to="/login">返回登录页面</router-link>
                    </div>
                </div>

            </el-main>
       </el-container>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.time()
  },
  methods: {
    time () {
      const p = document.getElementById('timer')
      const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      console.log(p)

      // eslint-disable-next-line no-unused-vars
      const timechange = setInterval(function () {
        const x = new Date()
        const wed = x.getDay()
        const year = x.getFullYear()
        const month = x.getMonth() + 1
        const data = x.getDate()

        let hour = x.getHours()
        let min = x.getMinutes()
        let sec = x.getSeconds()
        if (hour < 10) hour = '0' + hour
        if (min < 10) min = '0' + min
        if (sec < 10) sec = ' 0' + sec
        p.innerHTML = year + '/' + month + '/' + data + '&nbsp;' + hour + ':' + min + ':' + sec + '&nbsp;' + '&nbsp;' + weekday[wed]
      }, 200)
    }
  }
}
</script>

<style lang="less" scoped>
.box{
    width: 100vw;
    height: 100vh;
    background-color: #E7EAEF;
}
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 10vh;
    width: 1000px;
    margin: 0 auto;
  }
  .el-main {
    background-color: #B3C0D1;
    color: #333;
    height: 90vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    padding: 0;
    width: 1000px;
    margin: 0 auto;
  }
  .left{
      float: left;
  }
  .right{
      float: right;
  }
   .right p{
       margin: 0;
       font-size: 1.1em;
       color:#000;
   }

  .te{
     // width: 700px;
     // border: 1px solid #000;
      margin:0 auto;
      border-radius: 20px;
      background-color: rgba(255, 255,255, 0.5);
      padding: 20px;
  }
  .te p{
      text-align: left;
  }

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}
 .el-carousel__item:nth-child(5) {
    background: url(../assets/image/email_3.jpg);
    background-position: center;
    background-size:  cover;
    background-color: white;
 }

 .el-carousel__item:nth-child(3) {
    background: url(https://cdn.dribbble.com/users/594158/screenshots/3552626/attachments/791037/wotip__4_freelancers_2.jpg);
    background-position: center;
    background-size:  cover;
 }

 .el-carousel__item:nth-child(4) {
    background: url(../assets/image/email_2.jpg);
    background-position: center;
    background-size:  cover;
 }

  .last{
      text-align: right;
      padding: 20px;
      color: #000;
      padding-top:50px;
  }
  .last a{
     color: #000;
  }
</style>

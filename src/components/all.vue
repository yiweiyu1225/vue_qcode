<template>
   <div>
    <!-- 头部区 -->
    <el-container class="home_con">
       <el-header>
           <div class="hear_left">NFC标签</div>
           <div class="hear_right">
              <el-button type="info" @click="clearToken">退出</el-button>
           </div >
        </el-header>
      <!--主体区 -->
      <el-container>
         <!--侧边栏-->
         <el-aside :width="iscllsapse ? '64px' :'200px'">
            <div class="toggle" @click="tog">|||</div>
             <el-menu default-active="/welcome" class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#373d41"
      text-color="#fff"
      active-text-color="#94D3F7"
      :collapse-transition="false"
      :collapse="iscllsapse"
      router
      >
      <!-- <el-menu-item index="/one">
          <i class="el-icon-location"></i>
          <span>NFC编号</span>
      </el-menu-item> -->
      <el-menu-item index="/text">
        <i class="el-icon-menu"></i>
        <span slot="title">测试：生成二维码</span>
      </el-menu-item>
      <el-menu-item index="/two">
        <i class="el-icon-menu"></i>
        <span slot="title">识别NFC图片</span>
      </el-menu-item>
      <el-menu-item index="/third" >
        <i class="el-icon-document"></i>
        <span slot="title">扫描NFC</span>
      </el-menu-item>
       <el-submenu index="/good">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/agent">代理人</el-menu-item>
          <el-menu-item index="/allgood">商品信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/add">
        <i class="el-icon-menu"></i>
        <span slot="title">添加商品</span>
      </el-menu-item>
        <el-menu-item index="/email">
        <i class="el-icon-menu"></i>
        <span slot="title">邮箱</span>
      </el-menu-item>
    </el-menu>

         </el-aside>

         <el-container>
             <!--主体 -->
           <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
           </el-main>
            <!--尾部 -->
           <el-footer>
               Footer
            </el-footer>
       </el-container>
    </el-container>
</el-container>

   </div>
</template>

<script>
// import er_imageVue from './user/er_image.vue'

export default {
  data () {
    return {
      index: 1,
      iscllsapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    tog () {
      this.iscllsapse = !this.iscllsapse
    },
    clearToken () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.el-header,.el-aside{
   background-color: #373d41;
}
.el-main{
   background-color: #eaedf1;
}
.home_con{
   height: 100vh;
}
.el-header{
   color: #fff;
}
.el-aside{
   .el-menu{
      border-right: none;
   }
}
.hear_left{
   float: left;
   font-size: 1.5em;
   height: 60px;
   line-height: 60px;
}
.hear_right{
   float:right;
   height: 60px;
   line-height: 60px;
   color: #fff;
}
.hear_right a{
   color: #fff;
}
.toggle{
   background-color: #4A5064;
   font-size: 10px;
   line-height: 24px;
   color: #fff;
   text-align: center;
   letter-spacing: 0.2em;
   cursor: pointer;
}
</style>

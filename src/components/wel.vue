<template>
    <div>
        <div>
             <el-carousel :interval="4000" type="card" height="300px">
                 <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="medium">{{ item }}</h3>
                 </el-carousel-item>
             </el-carousel>
        </div>
        <div class="we">
            <h1>welcome!</h1>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

 .el-carousel__item:nth-child(3) {
    background: url(https://cdn.dribbble.com/users/594158/screenshots/3552626/attachments/791037/wotip__4_freelancers_2.jpg);
    background-position: center;
    background-size:  cover;
 }

.el-carousel__item:nth-child(4) {
    background: url(https://cdn.dribbble.com/users/9112/screenshots/3223222/clicboutic.png);
    background-position: center;
    background-size:  cover;
 }

 .el-carousel__item:nth-child(5) {
    background: url(../assets/image/wel2.jpg);
    background-position: center;
    background-size:  cover;
    background-color: white;
 }

  .el-carousel__item:nth-child(6) {
    background: url(../assets/image/new1.jpg);
    background-position: center;
    background-size:  cover;
 }

.we h1{
    text-align: center;
    font-size: 5em;
    margin: 0;
}
</style>

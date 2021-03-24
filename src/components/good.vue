<template>
    <div>
    <!-- 面包屑导航条 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
       <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
       <el-breadcrumb-item>商品信息</el-breadcrumb-item>
       <el-breadcrumb-item >商品编号：{{id}}</el-breadcrumb-item>
     </el-breadcrumb>
    <!-- 卡片视图 -->
  <el-card>
      <el-row>
        <el-col :span="12">商品编号：{{goodDetail.id}}</el-col>
        <el-col :span="12">商品名：{{goodDetail.name}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">是否为真:
            <el-switch
              v-model="realValue" disabled>
            </el-switch>
           </el-col>
        <el-col :span="12">是否卖出：
            <el-switch
              v-model="goodDetail.sold" disabled>
            </el-switch>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">生产时间：{{goodDetail.production_date}}</el-col>
        <el-col :span="12">保质期：{{goodDetail.shelf_life}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">销售时间：{{goodDetail.sold_time}}</el-col>
        <el-col :span="12">销售地点：{{goodDetail.sold_location}}</el-col>
      </el-row>

      <div class="intrduct">
        <p>商品简介：{{goodDetail.gender}}</p>
      </div>
    </el-card>
    <el-card class="secondCard">
      <div class="imageTitle">详细信息</div>
      <div class="demo-image__lazy">
        <el-image v-for="url in goodImageUrl" :key="url" :src="url" lazy></el-image>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodDetail: {},
      goodImage: [],
      goodImageUrl: [],
      imgbastBastUrl: 'http://47.101.59.24:5000/static/goods_image/',
      allurl: '/aa/api/goods/',
      realValue: true
    }
  },
  created () {
    this.getgoodContent()
  },
  methods: {
    getgoodContent () {
      this.id = parseInt(this.$route.params.id)
      // console.log(this.id)
      this.allurl = '/aa/api/goods/' + this.id
      const that = this
      this.$http.get(this.allurl)
        .then(function (res) {
          console.log(res)
          that.goodDetail = res.data
          that.goodImage = res.data.image
          console.log(typeof (that.goodDetail.production_date))
          var len = that.goodImage.length
          for (let i = 0; i < len; i++) {
            var str = that.goodImage[i].path
            console.log(str)
            // var str = '/root/flask_project/app/static/goods_image/OSEEGsoApe.png'
            var stand = /(?<=(static\/goods_image\/))[\S\s]+/
            var ans = str.match(stand)
            console.log(ans[0])
            var imageUrl = that.imgbastBastUrl + ans[0]
            // console.log(imageUrl)
            that.goodImageUrl.push(imageUrl)
            console.log(that.goodImageUrl)
          }
        })
        .catch(function (res) {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-row{
  height: 3em;
  line-height: 3em;
  border-bottom: dashed 1px #1E1E1E;
}
.intrduct p{
  border-bottom: dashed 1px #1E1E1E;
  padding-bottom: 15px;
  line-height: 2em;
}
.secondCard{
  margin-top:20px;
}
.imageTitle{
  margin-bottom: 20px;
  border-radius: 5px  20px 20px 5px;
  background-color: #E7EAEE;
  height: 2em;
  line-height: 2em;
  padding-left: 20px;
  cursor: pointer;
  transition: all 0.5s;
}
.imageTitle:hover{
  margin-left: 10px;
}
.el-image{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
</style>

<template>
    <div>
    <!-- 面包屑导航条 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
       <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
       <el-breadcrumb-item>商品信息</el-breadcrumb-item>
       <el-breadcrumb-item>所有商品</el-breadcrumb-item>
     </el-breadcrumb>

     <!-- 卡片视图 -->
     <div>
       <el-card v-for="(x, index) in showing" :key='index' shadow="hover">
          <el-row  class="vcenter">
            <el-col :span="1">
              <div>
                 <p class="goodIndex">{{index+1}}</p>
              </div>
            </el-col>
            <el-col :span="6" >
              <el-image :src="x.src"></el-image>
            </el-col>
            <el-col :span="12" :push = '1'>
              <el-row>
                <p>商品名字：{{x.name}}</p>
                <p>商品编号：{{x.number}}</p>
                <router-link :to ="'/good/'+x.number">信息链接</router-link>
              </el-row>

            </el-col>
          </el-row>
       </el-card>
     </div>
     <!-- 分页 -->
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="qurryInfo.pagenum"
      :page-sizes="[1, 2, 3, 4, 5]"
      :page-size="qurryInfo.pagesize"
      layout=" sizes, prev, pager, next, jumper"
      :total='total'>
    </el-pagination>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      // 分页参数
      qurryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 2 // 每页大小
      },
      total: 3,
      showing: '',
      goodList: [
        {
          number: '001',
          name: '茅台',
          src: 'https://img.alicdn.com/imgextra/i1/3538683476/O1CN01q1vzSW1bY3JsWNZf3_!!3538683476.jpg'
        },
        {
          number: '001',
          name: '茅台',
          src: 'https://img.alicdn.com/imgextra/i1/3538683476/O1CN01q1vzSW1bY3JsWNZf3_!!3538683476.jpg'
        },
        {
          number: '001',
          name: '茅台',
          src: 'https://img.alicdn.com/imgextra/i1/3538683476/O1CN01q1vzSW1bY3JsWNZf3_!!3538683476.jpg'
        }
      ]
    }
  },
  created () {
    this.handleSizeChange(this.qurryInfo.pagesize)
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.qurryInfo.pagesize = val
      this.showing = []
      val = Math.min(val, this.goodList.length)
      for (let i = 0; i < val; i++) {
        this.showing[i] = this.goodList[i]
      }
      this.qurryInfo.pagenum = 1
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.qurryInfo.pagenum = val
      this.showing = []
      let y = (this.qurryInfo.pagesize * val) - 1
      console.log(y)
      if (this.goodList.length - 1 <= y) y = this.goodList.length - 1
      console.log(y)
      let x = (val - 1) * this.qurryInfo.pagesize
      if (x < 0) x = 0
      console.log(x)
      let k = 0
      for (let i = x; i <= y; i++) {
        this.showing[k] = this.goodList[i]
        console.log(k)
        console.log(this.showing[k])
        k++
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goodIndex{
  display: flex;
  align-items: center;
}
.vcenter{
  display: flex;
  align-items: center;
}
</style>

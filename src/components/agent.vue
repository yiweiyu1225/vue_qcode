<template>
<div>
    <!-- 面包屑导航条 -->
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>代理管理</el-breadcrumb-item>
  <el-breadcrumb-item >商品编号：{{number}}</el-breadcrumb-item>
</el-breadcrumb>
<!--时间戳 -->
<el-card>
   <div class="block">
    <el-timeline>
     <el-timeline-item
      v-for="x in agentList"
      :key="x.index"
      :timestamp="x.agentTime"
     placement='top'
     :boolean='false'
      color = '#B2B2B2'>
        <p>代理人：{{x.agentName}}</p>
        <p>接收地点：{{x.agentLocation}}</p>
        <p>代理人邮箱：{{x.agentEmail}}</p>
      </el-timeline-item>
    </el-timeline>
   </div>
   </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      number: '0001',
      agentList: [
        {
          agentName: '张三',
          agentTime: '2020-7-7 13:00',
          agentLocation: '广州',
          agentEmail: '101@qq.com'
        }, {
          agentName: '李四 ',
          agentTime: '2020-7-7 14:00',
          agentLocation: '深圳',
          agentEmail: '102@qq.com'
        }, {
          agentName: '王五',
          agentTime: '2020-7-7 15:00',
          agentLocation: '珠海',
          agentEmail: '103@qq.com'
        }, {
          agentName: '赵六',
          agentTime: '2020-7-7 16:00',
          agentLocation: '惠州',
          agentEmail: '104@qq.com'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .el-card{
      box-shadow: 0 1px 1px rgba(0, 0,0, 0.15);
  }
.block p{
   font-size: small;
}
</style>

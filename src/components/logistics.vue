<template>
<div>
    <!-- 面包屑导航条 -->
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>订单列表</el-breadcrumb-item>
</el-breadcrumb>

<!-- 卡片视图 -->
<el-card class="box-card">
    <el-row :gutter="20">
       <el-col :span="8">
           <!-- 搜索与添加 -->
           <div >
              <el-input placeholder="请输入内容" v-model="qurryInfo.query" clearable >
              <el-button slot="append" icon="el-icon-search" @click="shearch"></el-button>
              </el-input>
           </div>
       </el-col>
    </el-row>

    <!-- 订单表格 -->
    <el-table
      :data="showing"
      stripe
      border
      style="width: 100%">
      <el-table-column
       type="index"
        label="#">
      </el-table-column>
      <el-table-column
        prop="number"
        label="商品编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名">
      </el-table-column>
      <el-table-column
        prop="deliveryTime"
        label="发货时间">
      </el-table-column>
      <el-table-column
        prop="position"
        label="位置">
      </el-table-column>
      <el-table-column
        prop="shippingAdd"
        label="收货地址">
      </el-table-column>
      <el-table-column
        label="签收">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.sign" @change="signChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="qurryInfo.pagenum"
      :page-sizes="[1, 2, 3, 4, 5]"
      :page-size="qurryInfo.pagesize"
      layout=" sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>

</el-card>

<!-- 修改物流 -->
<el-dialog
  title="修改订单信息"
  :visible.sync="dialogVisible"
  width="30%"
 >
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

</div>
</template>

<script>
export default {
  data () {
    return {
    // 参数
      qurryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 4 // 每页大小
      },
      goodList: [
        {
          number: '0001',
          name: '口罩',
          deliveryTime: '2020-7-7',
          position: '到达广州',
          shippingAdd: '湖南长沙岳麓区',
          sign: false
        }, {
          number: '0002',
          name: '消毒水',
          deliveryTime: '2020-7-7',
          position: '到达广州',
          shippingAdd: '湖南长沙雨花区',
          sign: false
        }, {
          number: '0003',
          name: '酒精',
          deliveryTime: '2020-7-7',
          position: '到达广州',
          shippingAdd: '湖南长沙芙蓉区',
          sign: false
        }, {
          number: '0004',
          name: '洗手液',
          deliveryTime: '2020-7-7',
          position: '到达湖南长沙',
          shippingAdd: '湖南长沙天心区',
          sign: true
        }, {
          number: '0005',
          name: '板蓝根',
          deliveryTime: '2020-7-7',
          position: '到达湖南长沙',
          shippingAdd: '湖南长沙开福区',
          sign: true
        }
      ],
      total: 5,
      showing: [],
      dialogVisible: false,
      editform: {}
    }
  },
  created () {
  //   this.getGoodList()
    this.show()
  },
  methods: {
    // getGoodList () {
    //   this.$hppt.get('goods', { params: this.qurryInfo })
    // }
    show () {
      for (let i = 0; i < 4; i++) {
        this.showing[i] = this.goodList[i]
      }
      this.total = this.goodList.length
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.qurryInfo.pagesize = val
      this.showing = []
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
    },
    signChange (val) {
      console.log(val)
      let x
      for (let i = 0; i < this.goodList.length; i++) {
        if (this.goodList[i].number === val.number) {
          x = i
          break
        }
      }
      this.goodList[x].sign = val.sign
      alert('更新状态成功')
    },
    shearch () {
      let k = 0
      if (this.qurryInfo.query === '') return
      this.showing = []
      var reg = new RegExp(this.qurryInfo.query)
      console.log(reg)
      for (var i = 0; i < this.goodList.length; i++) {
        if (reg.test(this.goodList[i].number)) {
          this.showing[k] = this.goodList[i]
          k++
          continue
        }
        if (reg.test(this.goodList[i].name)) {
          this.showing[k] = this.goodList[i]
          k++
          continue
        }
        if (reg.test(this.goodList[i].deliveryTime)) {
          this.showing[k] = this.goodList[i]
          k++
          continue
        }
        if (reg.test(this.goodList[i].position)) {
          this.showing[k] = this.goodList[i]
          k++
          continue
        }
        if (reg.test(this.goodList[i].shippingAdd)) {
          this.showing[k] = this.goodList[i]
          k++
          continue
        }
      }
      this.qurryInfo.pagenum = 1
      this.total = this.showing.length
      this.pagesize = this.showing.length
    },
    showEdit (val) {
      this.dialogVisible = true
      console.log(val)
      for (let i = 0; i < this.goodList[i].length; i++) {
        if (this.goodList[i] === val) {
          this.editform = this.goodList[i]
          break
        }
      }
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
</style>

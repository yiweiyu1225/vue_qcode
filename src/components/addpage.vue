<template>
    <div>
        <!-- 面包屑导航条 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品信息</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
             <el-alert
                title="添加商品信息"
                type="info"
                center
                :closable="false"
                show-icon>
            </el-alert>
            <!-- 步骤图 -->
                <el-steps :space="400" :active="activeIndex -0" finish-status="success" align-center>
                    <el-step title="基本信息"></el-step>
                    <el-step title="商品图片"></el-step>
                    <el-step title="商品内容"></el-step>

                    <el-step title="完成"></el-step>
                </el-steps>
                <!-- Tab -->
            <el-form :model="addForm" :rules="addrules" ref="ruleForm" label-width="100px" label-position="top">
                <el-tabs :tab-position="'left'"  v-model="activeIndex" :before-leave="tabchange">
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item label="商品名" prop="name">
                            <el-input v-model="addForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品编号" prop="number">
                            <el-input v-model="addForm.number"></el-input>
                        </el-form-item>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="生产日期" prop="production_date">
                                        <el-date-picker
                                            v-model="addForm.production_date"
                                            type="date"
                                            placeholder="选择日期时间">
                                        </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="销售时间" prop="sold_time">
                                        <el-date-picker
                                            v-model="addForm.sold_time"
                                            type="date"
                                            placeholder="选择日期时间">
                                        </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="保质期" prop="shelf_life">
                            <el-input v-model="addForm.shelf_life"></el-input>
                        </el-form-item>
                        <el-form-item label="销售地点" prop="sold_location">
                            <el-input v-model="addForm.sold_location"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="1">
                        <el-upload
                            class="upload-demo"
                            action=""
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-change="imageChange"
                            :auto-upload="false"
                            list-type="picture">
                            <el-button size="small" type="primary">选择文件</el-button>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="2">
                      <quill-editor v-model="addForm.gender"></quill-editor>
                      <div class="addbut">
                         <el-button type="primary" round @click="add" >添加商品</el-button>
                      </div>
                    </el-tab-pane>
                </el-tabs>
           </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '0',
      addForm: {
        name: '123',
        number: '123',
        production_date: '',
        shelf_life: '12个月',
        sold_time: '',
        sold_location: '1',
        files: [],
        gender: '123'
      },
      addrules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入商品编号', trigger: 'blur' }
        ],
        production_date: [
          { required: true, message: '请输入生产日期', trigger: 'blur' }
        ],
        shelf_life: [
          { required: true, message: '请输入保质期', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    tabchange (val, oldval) {
      console.log(this.addForm.production_date)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    imageChange: function (file, fileList) {
      this.addForm.files.push(file)
      console.log(this.addForm.files)
    },
    add () {
      this.$refs.ruleForm.validate(
        valid => {
          if (!valid) {
            alert('请输入必要消息')
          } else {
            this.postAll()
          }
        }
      )
    },
    postAll: function () {
      const that = this
      this.$http.post(
        '/aa/api/admin_add_goods', this.addForm, {
          'Content-Type': 'multipart/form-data'
        }).then(function (res) {
        console.log(res)
        if (res.status === 200) {
          that.activeIndex = '4'
          alert('上传成功')
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-step__title {
    font-size: 14px;
}
.addbut{
  margin: 0 auto;
  margin-top:20px;
  text-align: center;
}
</style>

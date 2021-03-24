<template>
  <div class="box">
    <div>
      <input id="textcontext"  v-model="massege" type="text" on:keyup.enter='submit' placeholder="请输入..."/>
      <p>{{massege}}</p>
      <div id="qrcode"></div> <!-- 创建一个div，并设置id为qrcode -->
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  data () {
    return {
      massege: '',
      myqrcode: null
    }
  },
  mounted () {
    this.qrcode()
  },
  methods: {
    qrcode (context) {
      // eslint-disable-next-line no-unused-vars
      this.myqrcode = new QRCode('qrcode', {
        width: 132,
        height: 132,
        text: '', // 二维码地址
        colorDark: '#000',
        colorLight: '#fff'
      })
    },
    newcode (context) {
      if (context) {
        this.myqrcode.clear()
        this.myqrcode.makeCode(context)
      }
    }
  },
  watch: {
    massege: function (newval) {
      return this.newcode(newval)
    }
  }
}
</script>

<style scoped>
.box{
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 100px;
}
</style>

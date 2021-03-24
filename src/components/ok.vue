<template>
  <div class="ccc">
    <div>
      <div class="two">
        <div class="real">
          <input type="file"  id="pictureChange" v-on:change="filemassage" />
        </div>
        <div class="tubiao" @click="afile">
         <div class="first"> <i class="el-icon-folder-opened"></i>选择图片</div>
         <div class="second">{{message}}</div>
        </div>
      </div>
    </div>
    <div class="clear"></div>
     <div class="three">
       <div id="beijing">
        <li class="el-icon-folder"></li>
       </div>
       <div id = "nobeijing">
         <h3 >识别结果：</h3>
         <div id="result">
          <canvas id="qrcanvas" width="400px" height="400px"></canvas>
         </div>
         <div id = "qrcode">
         </div>
         <p id = "ans"></p>
       </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import jsQR from 'jsqr'
// WebRTC适配器
// import adapter from 'webrtc-adapter'
import QRCode from 'qrcodejs2'

export default {
  data () {
    return {
      flag: true,
      message: ''
    }
  },
  mounted () {
    this.ccc()
  },
  methods: {
    afile () {
      const real = document.getElementById('pictureChange')
      console.log(real)
      real.click()
    },
    filemassage () {
      this.message = document.querySelector('input[type=file]').files[0].name
    },
    ccc () {
      const pictureChange = document.getElementById('pictureChange')

      var qrcode = new QRCode(document.getElementById('qrcode'), {
        width: 132,
        height: 132,
        colorDark: '#000',
        colorLight: '#fff'
      })

      // 读取文件
      pictureChange.onchange = function () {
        var file = document.querySelector('input[type=file]').files[0]

        if (window.FileReader) {
          var fr = new FileReader()
          fr.readAsDataURL(file)
          fr.onloadend = function (e) {
            var base64Data = e.target.result
            console.log(base64Data)
            base64ToqR(base64Data)
          }
        }
      }

      function base64ToqR (data) {
        var c = document.getElementById('qrcanvas')

        var ctx = c.getContext('2d')

        var img = new Image()
        img.src = data
        console.log(1)
        console.log(data)

        img.onload = function () {
          // 将图片绘制出来
          console.log(img.width)
          console.log(img.height)

          c.style.width = img.width + 'px'
          c.style.height = img.height + 'px'

          // 识别二维码
          ctx.drawImage(img, 0, 0, img.width, img.height)
          var imageData = ctx.getImageData(0, 0, img.width, img.height)
          console.log(imageData.data)
          console.log(imageData.width)
          console.log(imageData.height)
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert'
          })

          if (code) {
            showCode(code.data)
            console.log(code.data)
          } else {
            alert('识别错误')
          }
        }
      }

      function showCode (code) {
        const p = document.getElementById('ans')
        p.innerHTML = code
        const beijing = document.getElementById('beijing')
        const nobeijing = document.getElementById('nobeijing')
        beijing.style.display = 'none'
        nobeijing.style.display = 'block'
        makeqrcode(code)
      }

      function makeqrcode (code) {
        qrcode.clear()
        qrcode.makeCode(code)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ccc{
  width: 1080px;
}
#pictureChange{
  border: #000 solid;
}
.tubiao{
  height: 3em;
  line-height: 3em;
  border:#373D41 3px solid;
  border-radius: 30px;
  width: 60%;
  margin: 0 auto;
  overflow: hidden;
}
.el-icon-folder-opened{
  font-size: 2em;
}
.real{
  display: none;
}
 .first{
   float: left;
   width: 7em;
   background: #373D41;
   padding-left: 0.8em;
   color: #fff;
   cursor: pointer;
 }
 .second{
   float: left;
   padding: 0.5em;
   font-size: 1.2em;
   overflow: hidden;
 }
.intext{
  border: #000 solid 1px;
}
.one{
   border: #000 solid;
}
.two{
  margin-top: 50px;
}
// 结果样式
.three{
  width: 70%;
  height: 300px;
  text-align: center;
  border: dashed 2px #373D41;
  margin: 0 auto;
  margin-top: 50px;
}
#result{
  display: none;
}
#qrcode{
  width: 150px;
  height: 150px;
  margin: 0 auto;
}
#beijing{
  font-size: 15em;
  color: #373D41;
  font-weight: 10;
}
#nobeijing{
  display: none;
}
</style>

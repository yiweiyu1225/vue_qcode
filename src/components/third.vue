<template>
    <!-- 内容部分 -->
    <div class="demo-wrapper">

    <!--
       Ideally these elements aren't created until it's confirmed that the
       client supports video/camera, but for the sake of illustrating the
       elements involved, they are created with markup (not JavaScript)
   --><div class="box">
         <video id="video" autoplay="" playsinline muted style="width= 100%; height=100%; object-fit: fill"></video>
         <p class="tishi">请将NFC对准摄像头</p>
     </div>
     <div class='camera'>
        <canvas id="mycanvas" hidden></canvas>
        <el-tooltip content="关闭摄像头" placement="bottom" effect="light">
          <el-button icon="el-icon-video-play"  @click="cancalCloseVideo" type="primary"  ></el-button>
        </el-tooltip>
     </div>

    </div>
</template>

<script>
import jsQR from 'jsqr'
export default {
  props: {
  },
  data () {
    return {
      flag: true
    }
  },
  mounted () {
    this.scan()
    this.freshen()
  },
  methods: {
    // 打开后再刷新一次
    freshen () {
      if (location.href.indexOf('#reloaded') === -1) {
        location.href = location.href + '#reloaded'
        location.reload()
      }
    },
    cancalCloseVideo () {
      navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'user' } })
        .then(mediaStream => {
          document.querySelector('video').srcObject = mediaStream
          // Stop the stream after 5 seconds
          setTimeout(() => {
            const tracks = mediaStream.getTracks()
            tracks[0].stop()
          }, 3000)
        })
      this.clearer()
    },
    // 清理定时器
    clearer () {
      clearTimeout(this.timer)
    },
    scan () {
      navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        .then(mediaStream => {
          document.querySelector('video').srcObject = mediaStream
        })
      window.addEventListener('DOMContentLoaded', function () {
        if (navigator.mediaDevices === undefined) {
          var div = document.createElement('div')
          div.innerHTML = 'mediaDevices not supported'
          document.body.appendChild(div)
        }

        navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia

        if (navigator.getUserMedia) {
          navigator.getUserMedia({
            audio: true,
            video: {
              width: 1000,
              height: 720
            }
          },

          function (stream) {
            var video = document.querySelector('video')
            video.srcObject = stream
            console.log(stream)
            video.onloadedmetadata = function (e) {
              video.play()
            }
          },
          function (err) {
            alert('The following error occurred: ' + err.name)
          }
          )
        } else {
          var divv = document.createElement('div')
          div.innerHTML = 'getUserMedia not supported'
          document.body.appendChild(divv)
          alert('getUserMedia not supported')
        }
      }, false)
      this.timer()
    },
    timer () {
      setInterval(this.vidpas, 3000)
    },
    // 捕获镜头
    vidpas () {
      var video = document.querySelector('video')
      var c = document.getElementById('mycanvas')
      var ctx = c.getContext('2d')
      var img = new Image()
      // var ss = video.srcObject
      //  console.log(ss.id)
      var base
      img.onload = function () {
        ctx.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight / 2)
        var imageData = ctx.getImageData(0, 0, img.width, img.height)
        console.log(img.width)
        console.log(img.height)
        base = imageData.data
        // console.log(base)
        change()// 转化为二维码
        // console.log(1)
      }
      img.src = c.toDataURL('image/png')

      // 转换函数
      const cancalCloseVideo = this.cancalCloseVideo
      var change = function () {
        const code = jsQR(base, video.offsetWidth, video.offsetHeight / 2, {
          inversionAttempts: 'dontInvert'
        })

        if (code) {
          cancalCloseVideo()
          alert(code.data)
          console.log(code.data)
        } else {
          console.log('识别错误')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box{
  width: 300px;
  margin: 0 auto;
}
#video,#mycanvas{
  width: 300px;
  height: 300px;
}
// 手机屏幕200px;
@media (min-width: 100px) and (max-width: 375px) {
  #video,#mycanvas{
     width: 200px;
     height: 200px;
  }
}
.tishi{
  text-align: center;
  font-size: small;
}
.camera{
  margin: 0 auto;
  text-align: center;
}
.el-button{
  margin: 10px;
}
</style>

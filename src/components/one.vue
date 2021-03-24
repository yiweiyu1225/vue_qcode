<template>
    <div class ="box">
        <div class = "in">
          <div class="inbox">
             <div class="infirst"><input v-model="message"></div>
             <div class="insed">
                <button @click="sumit" class="inbut">确定</button>
             </div>
             <div class="clear"></div>
        </div>
         <!-- <p>{{message}}</p> -->
        </div>
    </div>
</template>
<script>
export default {
  // props: ['num'],
  data () {
    return {
      message: '请输入商品编号'
    }
  },
  mounted () {
    this.freshen()
  },
  methods: {
    freshen () {
      if (location.href.indexOf('#reloaded') === -1) {
        location.href = location.href + '#reloaded'
        location.reload()
      }
    },
    sumit: function () {
      this.$http.post('/user', {
        firstName: this.message
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

}

</script>

<style lang="less" scoped>
.box{
     text-align: center;
     margin-top: 50px;
     width: 1080px;
}
.inbox{
  height: 3em;
  line-height: 3em;
  border:#373D41 3px solid;
  border-radius: 30px;
  width: 60%;
  margin: 0 auto;
  overflow: hidden;
  min-width: 300px;
}
.infirst{
  float: left;
  width: 70%;
  overflow: hidden;
}
.insed{
  float: right;
  padding: 0;
  background-color: #373D41;
  text-align: left;
  cursor: pointer;
  width: 15%;
}
@media (min-width: 300px) and (max-width: 950px) {
    .infirst {
      width: 65%;
      font-size: 13px;
    }
    .insed{
      width: 25%;
      font-size: 13px;
    }
}
.infirst input{
  height: 2em;
  border: none;
  font-size: 1.2em;
  margin-left: 1em;
  outline: none;
  width: 100%;
  background-color: #EAEDF1;
}
.inbut{
  border: none;
  width: 6em;
  min-width: 6em;
  height: 100%;
  line-height: 100%;
  font-size: 1.2em;
  background: #373D41;
  color: #fff;
  cursor: pointer;
}
.infirst input:focus,.insed button:focus{
  border: none;
  outline: none;
}
</style>

<template>
  <div class="body_list" v-show="isShowFirst">
    <div class="head">
      <!-- “不忘初心 · 牢记使命” -->
  <img src="../../assets/images/百年征程.png" alt="" width="27%" srcset="">
    </div>
    <div class="main">
      <div class="left">
        <Nev @changePage4="changePage3"></Nev>
      </div>
      <div class="right">
        <Cloud></Cloud>
      </div>
    </div>
    <div class="footer">
      <Calendar></Calendar>
    </div>
  </div>
</template>

<script>
import Calendar from "./Calendar.vue";
import Cloud from "./Main_Cloud.vue";
import Nev from "./Main_Nev.vue";
export default {
  name: "Main",
  components: {
    Calendar,
    Cloud,
    Nev,
  },
  props: {
    isShowFirst:Boolean
  },
  methods: {
    changePage3(id) {
      this.$emit('changePage2',id)
    },
  },
};
</script>

<style scoped>
.body_list {
  height: 960px !important;
  width: 100%;
  /* margin: 0;
  padding: 0; */
  background-image: url("../../assets/主页背景1.jpg") ;
  background-repeat: no-repeat !important;
  background-size: 100% 100% !important;
}

.main {
  height: 50%;
  margin: 0 auto;
}

.head {
  height: 10%;
  margin: 0 auto;
  text-align: center;
  font-size: 45px;
  line-height: 100px;
  /* background: #9CF */
}

.footer {
  height: 40%;
  /* width: 300px; */
  margin: 0 auto;
  /* background: #9F9; */
  /* clear: both */
}

.left {
  width: 50%;
  height: 100%;
  /* height: 100px; */
  /* background: #ccc; */
  float: left;
}

.right {
  width: 50%;
  height: 100%;
  /* height: 100px; */
  /* background: #FCC; */
  float: right;
}

.head img{
  position: relative;
  left:-80px;
}
</style>
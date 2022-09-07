<template>
  <div class="peopleMain">
    <div class="topLeft">
      <!-- <img src="./images/党徽1.png" alt="" class="symbol"> -->
      <span class="people_span1">领袖人物</span>
      <Leaders></Leaders>
    </div>
    <div class="topRight">开国将帅</div>
    <div class="bottomLeft">革命先辈</div>
    <div class="bottomRight">
      <span class="people_span1">时代楷模</span>
      <img src="./images/榜样.webp" alt="" @click="openSun" title="点我了解更多">
      <Sunburst
        :isShowSun="isShowSun"
      ></Sunburst>
    </div>
  </div>
</template>

<script>
// import dialogEl from '../dialog.vue'
import Leaders from './Leaders.vue'
import Sunburst from './Sunburst.vue'
export default {
  name: "PeopleList",
  components:{
    Leaders,
    Sunburst
  },
  data() {
    return {
      isShowSun: false,
    };
  },
  methods: {
    openSun() {
      this.isShowSun=true;
      console.log(1);
    },
  },
};
</script>

<style>
.symbol {
  width: 100px;
  height: 100px;
  display: inline-block;
  position: relative;
  top: 360px;
  left: 730px;
  background: transparent;
  border: 1px solid gold;
}
.peopleMain {
  height: 800px;
  width: 1500px;
  margin: auto;
  background-color: skyblue;
  border: 3px solid gold;
  border-radius: 10px;
}
.topLeft {
  width: 780px;
  height: 440px;
  float: left;
  /* background-color: #fff; */
  padding:8px;
    border-radius: 5px;
  border:2px solid salmon
}
.topRight {
  width: 700px;
  height: 360px;
  background-color: pink;
  float: right;
  position: relative;
  /* top: -65px; */
}
.bottomLeft {
  width: 900px;
  height: 340px;
  float: left;
  background-color: greenyellow;
}
.bottomRight {
  position: relative;
  height: 420px;
  width: 580px;
  float: right;
  top: -100px;
  padding: 8px;
  /* background-color: red; */
  border:2px solid salmon;
    border-radius: 5px;
   
}
.people_span1{
  display: inline-block;
  width: 200px;
  height: 30px;
  font-size: 20px;
  line-height: 30px;
  margin:auto;
  text-align: center;
}
.bottomRight img{
  width: 100%;
  height: 390px;
  cursor: pointer;
}

</style>
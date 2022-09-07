<template>
  <div class="embody" v-show="isShowMain">
    <div class="nev">
      <div class="navigation">
        <ul>
          <li class="list" @click="changeClass(0)" :class="pageId===0?'active':''">
            <router-link to="/Knowledge">
              <span class="icon">
                <ion-icon name="earth-outline"></ion-icon>
              </span>
              <span class="text">党史图谱</span>
            </router-link>
          </li>
          <li class="list" @click="changeClass(1)" :class="pageId===1?'active':''">
            <router-link to="/PeopleList">
              <span class="icon"
                ><ion-icon name="ribbon-outline"></ion-icon
              ></span>
              <span class="text">人物长廊</span>
            </router-link>
          </li>
          <li class="list" @click="changeClass(2)" :class="pageId===2?'active':''">
            <router-link to="/RedPlace">
              <span class="icon">
                <ion-icon name="golf-outline"></ion-icon>
              </span>
              <span class="text">红色圣地</span>
            </router-link>
          </li>
          <li class="list" @click="changeClass(3) " :class="pageId===3?'active':''">
            <router-link to="/HistoryWords">
              <span class="icon">
                <ion-icon name="newspaper-outline"></ion-icon>
              </span>
              <span class="text">资料荟萃</span>
            </router-link>
          </li>
          <div class="indicator"></div>
        </ul>
      </div>
    </div>
    <div class="main_content">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainFrame",
  computed: {
    // WhatPage() {
    //   return this.pageId;
    // },
  
  },
  props:{
    isShowMain:Boolean,
    pageId:Number
  },
  methods: {
    changeClass(id) {
      this.pageId=id;
    },
  },
};
</script>

<style scoped>
.embody {
  height: 960px !important;
  width: 100%;
    background-image: url("../assets/主页背景1.jpg") ;
  background-repeat: no-repeat !important;
  background-size: 100% 100% !important;
}
.nev {
  height: 100px;
}
.navigation {
  position: relative;
  width: 650px;
  height: 80px;
  /* background-color: #fff; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 15px;
  border-left: 3px solid gold;
  border-bottom: 3px solid gold;
  float: right;
}

.navigation ul {
  display: flex;
  width: 600px;
}

.navigation ul li {
  list-style: none;
  position: relative;
  width: 150px;
  height: 80px;
  z-index: 2;
}

.navigation ul li a {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  font-weight: 500;
  /* font-size: 20px; */
}

.navigation ul li a .icon {
  position: relative;
  display: block;
  line-height: 85px;
  font-size: 2em;
  transition: 0.5s;
  color: #222237;
}

.navigation ul li.active a .icon {
  transform: translateY(45px);
  color: RED;
  opacity: 0.8;
}

.navigation ul li a .text {
  position: absolute;
  background: rgb(250, 47, 47);
  color: #fff;
  padding: 2px 7px;
  border-radius: 12px;
  font-weight: 400;
  font-size: 1.5em;
  letter-spacing: 0.05em;
  transition: 0.5s;
  opacity: 0;
  transform: translateY(15px);
}

.navigation ul li.active a .text {
  transform: translateY(4px);
  opacity: 1;
}

.indicator {
  position: absolute;
  width: 90px;
  height: 90px;
  background-color: #A8BFDE;
  border-radius: 50%;
  top: 27%;
  left: 8.5%;
  z-index: 1;
  transition: 0.5s;
}

.navigation ul li:nth-child(1).active ~ .indicator {
  transform: translateX(calc(150px * 0));
}

.navigation ul li:nth-child(2).active ~ .indicator {
  transform: translateX(calc(150px * 1));
}

.navigation ul li:nth-child(3).active ~ .indicator {
  transform: translateX(calc(150px * 2));
}

.navigation ul li:nth-child(4).active ~ .indicator {
  transform: translateX(calc(150px * 3));
}
</style>
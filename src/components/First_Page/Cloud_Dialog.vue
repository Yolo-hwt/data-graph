<template>
  <transition name="slide">
    <div class="model" v-show="showModel">
      <div class="mask">
        <div class="model-dialog" @click.stop="">
        <div class="model-header">
          <span>“{{text}}”</span>
          <span id="close" @click="$emit('cancel')"></span>
        </div>
        <div class="model-body">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{describe}}
        </div>
      </div>
      </div>
    </div>
  </transition>
</template>

<script>
import App from "@/App.vue";
export default {
  components: { App },
  name: "Cloud_Dialog",
  props: {
    //是否展示弹框
    showModel: Boolean,
    describe:String,
    text:String
  },
};
</script>

<style>
.mask {
  position: fixed;
  top: 0;
  height: 100%;
  background-color: rgba(167, 165, 165, 0.2);
  opacity: 0.9;
  z-index: 100;
}
.model-dialog {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 12px;
  width: 600px;
  height: 280px;
  border: 1px solid #f5f5f5;
  z-index: 10;  
}
.model-header {
  position: relative;
  height: 50px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 25px;
  line-height: 50px;
  background-color: #f5f5f5;
  color:#8d4c28;
  border-bottom: 1px solid rgb(177, 176, 176);
}
.model-body {
    padding:10px;
  height: 230px;
  line-height: 26px;
  font-size: 17px;
  text-align: left;
  background-color: #fff;
    overflow-y: auto;
}
.icon-close {
  position: absolute;
  background-color: pink;
  right: 15px;
  top: 16px;
  width: 30px;
  height: 30px;
  z-index: 10;
  /* background: url("../assets/icon-close.png") no-repeat; */
  background-size: contain;
}
#close {
  position: absolute;
  background-color: pink;
  right: 15px;
  top: 30px;
  width: 30px;
  height: 4px;
  background: #333;
  transform: rotate(45deg);
  float: right;
}

#close::after {
  content: "";
  display: block;
  width: 30px;
  height: 4px;
  background: #333;
  transform: rotate(-90deg);
}
.model {
  z-index: 10;
  transition: all 0s;
}
.slide-enter-active {
  top: 0;
}

.slide-leave-active {
  top: -100%;
}
.slide-enter {
  top: -100%;
}
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-thumb {
  /* background-color: linear-gradient(red 0%, orange 100%); */
  background-color: #F5F5F5;
  border-radius: 8px;
}
</style>
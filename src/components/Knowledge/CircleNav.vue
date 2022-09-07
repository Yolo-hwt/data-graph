<template>
  <ul class="menu">
    <div class="toggle" @click="changeCircleFrom">
      <ion-icon name="add-outline"></ion-icon>
    </div>
    <li style="--i: 0" class="active a" @click="changeLiFrom(0)">
      <a @click.prevent="">
        <ion-icon name="home-outline"></ion-icon>
      </a>
    </li>
    <li style="--i: 1" @click="changeLiFrom(1)" class="a">
      <a @click.prevent="">
        <ion-icon name="home-outline"></ion-icon>
      </a>
    </li>
    <li style="--i: 2" @click="changeLiFrom(2)" class="a">
      <a @click.prevent="">
        <ion-icon name="home-outline"></ion-icon>
      </a>
    </li>
    <li style="--i: 3" @click="changeLiFrom(3)" class="a">
      <a @click.prevent="">
        <ion-icon name="home-outline"></ion-icon>
      </a>
    </li>
    <li style="--i: 4" @click="changeLiFrom(4)" class="a">
      <a @click.prevent="">
        <ion-icon name="home-outline"></ion-icon>
      </a>
    </li>
    <li style="--i: 5" @click="changeLiFrom(5)" class="a">
      <a @click.prevent="">
        <ion-icon name="home-outline"></ion-icon>
      </a>
    </li>
    <li style="--i: 6" @click="changeLiFrom(6)" class="a">
      <a @click.prevent="">
        <ion-icon name="home-outline"></ion-icon>
      </a>
    </li>
    <li style="--i: 7" @click="changeLiFrom(7)" class="a">
      <a @click.prevent=""> 成就 </a>
    </li>
    <div class="indicator"></div>
  </ul>
</template>

<script>
export default {
  name: "CircleNav",
  data() {
    return {
      liList: document.getElementsByClassName("a"),
    };
  },
  methods: {
    changeCircleFrom() {
      let menuToggle = document.querySelector(".toggle");
      let menu = document.querySelector(".menu");
      menu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    },
    changeLiFrom(index) {
        this.$emit('getAttributeId',index)
      for(var i=0;i<=7;i++){
          if(i!==index){
            this.liList[i].classList.remove("active");
          }
      }
     this.liList[index].classList.add("active");
    },
  },
};

</script>

<style scoped>
.menu {
  position: absolute;
  width: 300px;
  height: 300px;
  /* background-color: #fff; */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.menu .toggle {
  position: absolute;
  width: 75px;
  height: 75px;
  color: #222237;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  cursor: pointer;
  transition: 0.5s;
  border:2px solid red;
}

.menu .toggle.active {
  transform: rotate(315deg);
  box-shadow: 0 0 0 68px skyblue;
  background-color: #222237;
  color: #fff;
}

.menu li {
  position: absolute;
  list-style: none;
  left: 10px;
  transform: rotate(calc(360deg / 8 * var(--i))) translateX(40px);
  transform-origin: 140px;
  visibility: hidden;
  opacity: 0;
  transition: 0.5s;
  z-index: 10;
}

.menu.active li {
  visibility: visible;
  opacity: 1;
}

.menu li a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  font-size: 1.25em;
  color: #222237;
  transform: rotate(calc(360deg / -8 * var(--i)));
  /* background-color: #ccc; */
  border-radius: 50%;
  text-decoration: none;
}

.menu.active li.active {
  transform: rotate(calc(360deg / 8 * var(--i))) translateX(12px);
}

.indicator {
  position: absolute;
  left: calc(50% + 2.5px);
  transform-origin: right;
  width: 100px;
  height: 1px;
  background-color: transparent;
  pointer-events: none;
  transition: 0.5s;
}

.indicator::before {
  content: "";
  position: absolute;
  top: -27.5px;
  width: 55px;
  left: 72px;
  height: 55px;
  background-color: #222237;
  box-shadow: 0 0 0 6px #29fd53;
  border-radius: 50%;
  transition: 0.5s;
  opacity: 0;
}

.menu.active .indicator::before {
  opacity: 1;
  top: -27.5px;
  left: -27.5px;
  background-color: #29fd53;
  box-shadow: 0 0 0 6px #222237;
}

.menu li:nth-child(2).active ~ .indicator {
  transform: translateX(-103px) rotate(0deg);
}

.menu li:nth-child(3).active ~ .indicator {
  transform: translateX(-103px) rotate(45deg);
}

.menu li:nth-child(4).active ~ .indicator {
  transform: translateX(-103px) rotate(90deg);
}

.menu li:nth-child(5).active ~ .indicator {
  transform: translateX(-103px) rotate(135deg);
}

.menu li:nth-child(6).active ~ .indicator {
  transform: translateX(-103px) rotate(180deg);
}

.menu li:nth-child(7).active ~ .indicator {
  transform: translateX(-103px) rotate(225deg);
}

.menu li:nth-child(8).active ~ .indicator {
  transform: translateX(-103px) rotate(270deg);
}

.menu li:nth-child(9).active ~ .indicator {
  transform: translateX(-103px) rotate(315deg);
}
</style>
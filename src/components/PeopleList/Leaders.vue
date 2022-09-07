<template>
  <div class="autob">
    <ul class="bz">
      <li>
        <img
          src="./images/毛主席.webp"
          height="470px"
          title="点我了解更多"
          @click="show = true"
        />
      </li>
      <li>
        <img
          src="./images/周恩来.webp"
          height="470px"
          title="点我了解更多"
          @click="show = true"
        />
      </li>
      <li>
        <img
          src="./images/朱德.webp"
          height="470px"
          title="点我了解更多"
          @click="show = true"
        />
      </li>
      <li>
        <img
          src="./images/刘少奇.webp"
          height="470px"
          title="点我了解更多"
          @click="show = true"
        />
      </li>
      <li>
        <img
          src="./images/邓小平.webp"
          height="470px"
          title="点我了解更多"
          @click="show = true"
        />
      </li>
      <li>
        <img
          src="./images/陈云.webp"
          height="470px"
          title="点我了解更多"
          @click="show = true"
        />
      </li>
    </ul>
    <dialog-el :showWin.sync="show" width="1400" height="760">
      <div slot="title">人物迁徙图</div>
      <div slot="content">
          <Flight></Flight>
      </div>
    </dialog-el>
  </div>
</template>

<script>
import dialogEl from "./dialog.vue";
import Flight from "./Flight.vue"
export default {
  name: "Leaders",
  components: {
    dialogEl,
    Flight
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style>
.autob {
  width: 100%;
  height: 420px;
  /* background-color: rgba(104, 18, 18, 0.473); */
}

.bz {
  width:780px;
  height: 410px;
  overflow: hidden;
  display: flex;
  flex: auto;
}

.bz li {
  position: relative;
  float: left;
  width: 16%;
  height: 420px;
  background-size: cover;
  transition: 0.4s;
}

.bz:hover li {
  width: 5%;
  cursor: pointer;
}

.bz li:hover {
  width: 600px;
}

</style>
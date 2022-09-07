<template>
  <div class="search">
    <div class="search-box" @mouseover="searchBoxOver" @mouseout="searchBoxOut">
      <input
        class="search-txt"
        id="inputText"
        type="text"
        placeholder="Type to search"
        v-model="searchContent"
      />
      <a class="search-btn" @click.prevent="">
        <i
          class="fas fa-search"
          id="btn-i"
          @click="$emit('getSearchText', searchContent)"
        ></i>
      </a>
    </div>
    <ul class="searchTips" id="searchUl">
      <li
        class="tipItem"
        :id="`tip-${response.id}`"
        v-for="response in responseList"
        :key="response.index"
        :tipName="`${response.id}`"
        @click="$emit('responseToGraph', response.id)"
        @mouseover="changeBgColor($event)"
        @mouseleave="restoreBgColor($event)"
      >
        <svg
          v-if="response.id.length > 3"
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="20"
          fill="currentColor"
          class="bi bi-layout-text-sidebar"
          viewBox="0 0 16 16"
        >
          <path
            d="M3.5 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM3 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"
          />
          <path
            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm12-1v14h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 0H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9V1z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-person"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
          />
        </svg>
        <!-- 最多显示16个字符id -->
        {{ response.id.slice(0, 13) }}
        <span v-if="response.description.length && response.id.length <= 5">{{
          response.description.slice(0, 10) + "..."
        }}</span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.inactive {
  display: none !important;
  opacity: 0;
}
.searchTips {
  /* opacity: 0.9; */
  cursor: pointer;
  position: absolute;
  display: block;
  /* margin-top: 163px;
  margin-left: 56px; */
  margin-top: 107px;
  margin-left: 164px;
}
.searchTips li {
  display: block;
  width: 260px;
  height: 35px;
  line-height: 35px;
  text-align: left;
  padding-left: 5px;
  background: #f1f2f6;
  color: black;
  font-size: 14px;
  border-left: 6px solid #ffd16d;
  border-right: 6px solid #ffd16d;
  border-bottom: 3px solid #e84118;
}
.searchTips li span {
  font-size: 13px;
  opacity: 0.7;
}
/* .searchTips li:nth-of-type(even) {
  background: #b2bec3;
}*/
.searchTips li:last-child {
  border-radius: 0 0 10px 10px;
  border-bottom: 8px solid #ffd16d;
}
.search-box {
  position: absolute;
  /* top: 14%;
  left: 12%; */
  top: 8%;
  left: 18%;
  transform: translate(-50%, -50%);
  background: #ffd16d;
  height: 40px;
  border-radius: 40px;
  padding: 10px;
  z-index: 1000;
}
.search-btn {
  color: #e84118;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  text-decoration: none;
}
.search-txt {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: black;
  font-size: 16px;
  transition: 0.4s;
  line-height: 40px;
  width: 0;
  border-radius: 15px;
}
#btn-i {
  cursor: pointer;
}
</style>
<script>
import * as $ from "./jquery2.2.4";
export default {
  name: "Search",
  props: {
    responseList: Array,
    searchIsClicked: Boolean,
  },
  data() {
    return {
      searchContent: "",
    };
  },
  watch: {
    responseList: function () {
      $("li").attr("class", "tipItem");
      console.log("!!search response:", this.responseList);
    },
  },
  methods: {
    //     .search-box:hover > .search-txt {
    //   width: 240px;
    //   padding: 0 6px;
    // }
    // .search-box:hover > .search-btn {
    //   background: white;
    // }
    changeBgColor(e) {
      if (e.stopPropagation) {
        //这是取消冒泡
        e.stopPropagation();
      }
      $("#" + e.target.id).css("background", "#ffd16d");
    },
    restoreBgColor(e) {
      if (e.stopPropagation) {
        //这是取消冒泡
        e.stopPropagation();
      }
      $("#" + e.target.id).css("background", "#f1f2f6");
    },
    searchBoxOver() {
      if (!this.searchIsClicked) {
        $(".search-txt").css({
          width: "260px",
          padding: "0 6px",
          background: "white",
        });
        $(".search-btn").css({
          background: "white",
        });
      }
    },
    searchBoxOut() {
      if (!this.searchIsClicked) {
        $(".search-txt").css({
          width: "0",
          padding: "0",
          // background: "white",
        });
        $(".search-btn").css({
          background: "white",
        });
      }
    },
  },
};
</script>


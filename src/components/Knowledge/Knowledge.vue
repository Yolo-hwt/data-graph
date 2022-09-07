<template>
  <!-- height="1920" width="1080" -->
  <div class="main_body1">
    <div class="main_content" id="main_c">
      <!-- :height="mainHeight"
      :width="mainWidth" -->
      <img class="logo" src="../../assets/logo.png" />
      <Search
        :responseList="responseList"
        @getSearchText="getSearchText"
        @responseToGraph="responseToGraph"
        :key="SearchKey"
        :searchIsClicked="searchIsClicked"
      ></Search>
      <!-- <button @click="screen()" class="full_button">点我全屏</button> -->
      <!-- :secVisableNodeList="secShowNodes" -->
      <div class="main_graph">
        <DataGraph
          :nodeTypeKey="nodeTypeKey"
          :nodeList="nodes"
          :linkList="links"
          :visableNodeList="showNodes"
          @changeContentId="changeContentId"
          :svgSize="svgSize"
          :key="DataGraphKey"
          :nodeTextFontSize="nodeTextFontSize"
          :nodeSize="nodeSize"
          :secTargetNId="secTargetNId"
          :searchForOpenNodeName="searchForOpenNodeName"
          @pullRequest="pullRequestFromDataGraph"
          :requetNodeData="requetNodeData"
          :requestRelaData="requestRelaData"
        >
        </DataGraph>
      </div>
      <!-- :heigth="footerHeight" :width="footerWidth" -->
      <div class="main_footer">
        <TimeLine @changePeriod="changePeriod"></TimeLine>
      </div>
    </div>
  </div>
</template>
<style scoped>
.logo {
  position: fixed;
  left: 10px;
  top: 20px;
  width: 120px;
  z-index: 999;
  cursor: pointer;
}
.inactive {
  display: none !important;
  opacity: 0;
}
.main_body1 {
  background-image: url("../../assets/主页背景1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 960px;

  /* width: 100%;
  height: 100%; */
  /* opacity: 0.6; */
}
.main_content {
  /* height: 695px;
  width: 98%; */
  /* height: 1920;
  width: 1080; */
  /* border-radius: 10px; */
}
.main_graph {
  height: 100%;
  /* float: left; */
  width: 100%;
}
.main_img {
  height: 200px;
  margin-top: 10px;
}
.main_img img {
  height: 100%;
  width: 100%;
}
.main_footer {
  position: fixed;
  bottom: 0;
  height: 190px;
  width: 1100px;
  /* background-color: ; */
  /* margin: 0 auto; */
  margin-left: 30px;
  /* margin-bottom: 60px;造成了全屏无法显示完整 */
  text-align: center;
}
</style>
<script>
import Search from "./Searchs.vue";
import TimeLine from "./Timeline.vue";
import DataGraph from "./DataGraph.vue";
import axios from "axios";
import * as $ from "./jquery2.2.4";
import * as d3 from "./d3.v4.js";
export default {
  name: "Knowledge",
  components: {
    Search,
    DataGraph,
    TimeLine,
  },
  data() {
    return {
      timeId: 0,
      searchText: "",
      attributeId: -1,
      detailTitle: "建党百年",
      detailImg: require("../../assets/百年.jpg"),
      detailDesc: `2021年是中国共产党百年华诞。中国站在“两个一百年”的历史交汇点，全面建设社会主义现代化国家新征程即将开启。世界将更多目光投向中国，聚焦中国共产党矢志不渝为人民谋幸福，为民族谋复兴，为世界谋大同。`,
      allNodes: [], //所有结点
      allLinks: [], //所有连接关系
      //显示的结点，关系
      showNodes: [], //一级节点
      secShowNodes: [], //二级结点
      dataNodes: [],
      nodeIds: [],
      dataLinks: [],
      nodeTextFontSize: 12,
      nodeSize: 15,
      responseList: [],
      rightContentId: null,
      fullscreen: false,
      svgSize: {
        width: window.innerWidth - 200,
        height: 900,
      },
      footerWidth: window.innerWidth * (3 / 5),
      footerHeight: window.innerHeight / 5,

      DataGraphKey: 0, //用来强制刷新dataGraph
      SearchKey: 0,
      searchIsClicked: false,
      localPort: 8080,
      //拥有三级结点的特殊二级节点
      specialSecNodesList: ["鲁迅"],
      secTargetNId: [],

      //战役列表
      warList: [],
      // 设置展开的结点
      searchForOpenNodeName: "",

      //当前已经准备好的图谱页面
      praparedGraphId: ["1", "2", "3", "4", "12"],

      //知识图谱请求数据返回
      requetNodeData: [],
      requestRelaData: [],
    };
  },
  computed: {
    nodes() {
      // 去重dataNodes
      let nodes = this.dataNodes.slice();
      // console.log("&&&&去重之前", nodes, this.dataNodes);
      let nodeIds = [];
      nodes = nodes.filter((node) => {
        if (nodeIds.indexOf(node.id) === -1) {
          nodeIds.push(node.id);
          return true;
        } else {
          return false;
        }
      });
      this.nodeIds = nodeIds;
      // console.log("@@@去重之后nodes", nodes);
      return nodes;
    },
    // secNodes() {
    //   let secNodes = this.secShowNodes.slice();
    //   let nodeIds = [];
    //   secNodes = secNodes.filter((node) => {
    //     if (nodeIds.indexOf(node) === -1) {
    //       nodeIds.push(node);
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   });
    //   return secNodes;
    // },
    links() {
      // let links = this.dataLinks.slice();
      // console.log(links, this.dataLinks);
      // links=links.filter((link)=>{
      //   return true
      // })
      return this.dataLinks.slice();
    },
    nodeTypeKey() {
      // 去重nodeList
      let allnodes = this.nodes.slice();
      // let nodeIds = [];
      let types = [];
      // allnodes = allnodes.filter((node) => {
      //   if (nodeIds.indexOf(node.id) === -1) {
      //     nodeIds.push(node.id);
      //     return true;
      //   } else {
      //     return false;
      //   }
      // });
      for (var i = 0; i < allnodes.length; i++) {
        types.push(allnodes[i].group);
      }
      // console.log(types);
      return types;
    },
    button_content() {
      return this.fullscreen === false ? "进入全屏" : "退出全屏";
    },
    icon_name() {
      return this.fullscreen === false ? "scan-outline" : "contract-outline";
    },
  },
  methods: {
    //搜索后选择确切标签
    responseToGraph(response) {
      $(".search-txt").css({
        width: "0",
        padding: "0",
        // background: "white",
      });
      $(".search-btn").css({
        background: "white",
      });
      // $("#tip-" + response).remove();
      // console.log($("#searchUl"));
      $("#inputText").val("");
      this.searchIsClicked = false;
      $(".searchTips li").attr("class", "inactive");
      console.log("%%%%", response);
      var responseList = [];
      responseList.push(response);
      this.showNodes = responseList;
      var that = this;
      var cx = d3.select("#circle-" + response).attr("cx");
      var cy = d3.select("#circle-" + response).attr("cy");
      var tx = d3.select("#text-" + response).attr("x");
      var ty = d3.select("#text-" + response).attr("y");
      d3.select("#circle-" + response).attr("cx", function (d) {
        d.fx = that.svgSize.width / 2;
        return that.svgSize.width / 2;
      });
      d3.select("#circle-" + response).attr("cy", function (d) {
        d.fy = that.svgSize.height / 2 - 80;
        return that.svgSize.height / 2 - 80;
      });

      // d3.select("#circle-" + response).attr("transform", function (d) {
      //   d.fx=that.svgSize.width / 2
      //   d.fy=that.svgSize.height / 2
      //   return `translate(${
      //     that.svgSize.width / 2 - cx
      //   }, ${that.svgSize.height / 2 - cy})`;
      // });

      // d3.select("#text-" + response).attr("transform", function () {
      //   return `translate(${
      //     that.svgSize.width / 2 -
      //     0.5 * response.length * that.nodeTextFontSize -
      //     tx
      //   }, ${that.svgSize.height / 2 + 1.3 * that.nodeSize - ty})`;
      // });
      //标示，到DataGraph里面展开specialSecNodesList
      this.specialSecNodesList = response;
      //更新svg
      this.forceDataGraph;
    },
    forceSearch() {
      this.SearchKey += 1;
    },
    forceDataGraph() {
      this.DataGraphKey += 1;
    },
    changeTimeId(id) {
      this.timeId = id;
      console.log(id);
    },
    //获取搜索关键字返回结果
    getSearchText(content) {
      this.searchText = content;
      this.searchIsClicked = true;
      // console.log("??getsearch", this.searchText);
      let newListData = [];
      //搜索本页面
      if (this.searchText) {
        this.nodes.filter((item) => {
          if (item.id.toLowerCase().indexOf(this.searchText) !== -1) {
            newListData.push(item);
          }
        });
      }

      //测试，搜索战争
      if (this.searchText) {
        this.warList.filter((item) => {
          if (item.id.toLowerCase().indexOf(this.searchText) !== -1) {
            newListData.push(item);
          }
        });
      }
      this.responseList = newListData;
      // console.log("!!know response:", this.responseList);
    },
    getAttributeId(id) {
      this.attributeId = id;
      console.log(id);
    },
    changeContentId(id) {
      this.rightContentId = id;
      console.log(this.rightContentId);
    },
    getPeriodByTimeId(id) {
      let choice = parseInt(id);
      var Period;
      switch (choice) {
        case 1: {
          Period = [1, 2];
          break;
        }
        case 2: {
          Period = [3, 3];
          break;
        }
        case 3: {
          Period = [4, 6];
          break;
        }
        case 4: {
          Period = [7, 8];
          break;
        }
        case 5: {
          Period = [9, 10];
          break;
        }
        case 6: {
          Period = [11, 12];
          break;
        }
        case 7: {
          Period = [13, 14];
          break;
        }
        case 8: {
          Period = [15, 16];
          break;
        }
        case 9: {
          Period = [17, 18];
          break;
        }
        case 10: {
          Period = [19, 21];
          break;
        }
        case 11: {
          Period = [22, 24];
          break;
        }
        case 12: {
          Period = [25, 26];
          break;
        }
        case 13: {
          Period = [27, 29];
          break;
        }
        case 14: {
          Period = [30, 31];
          break;
        }
        case 15: {
          Period = [32, 32];
          break;
        }
        case 16: {
          Period = [33, 35];
          break;
        }
        case 17: {
          Period = [36, 38];
          break;
        }
        case 18: {
          Period = [39, 42];
          break;
        }
        case 19: {
          Period = [43, 46];
          break;
        }
        case 20: {
          Period = [47, 49];
          break;
        }
        case 21: {
          Period = [50, 51];
          break;
        }
        case 22: {
          Period = [52, 54];
          break;
        }
        case 23: {
          Period = [55, 57];
          break;
        }
        case 24: {
          Period = [58, 59];
          break;
        }
        case 25: {
          Period = [60, 62];
          break;
        }
        case 26: {
          Period = [63, 65];
          break;
        }
        case 27: {
          Period = [66, 70];
          break;
        }
        default: {
          Period = [1, 2];
          // break;
        }
      }
      return Period;
    },
    //根据id获取限制显示数目
    getlimitNumByTimeId(id) {
      let choice = parseInt(id);
      var limitNum;
      switch (choice) {
        case 1: {
          limitNum = 22;
          break;
        }
        case 2: {
          limitNum = 26;
          break;
        }
        case 3: {
          limitNum = 33;
          break;
        }
        case 4: {
          limitNum = 20;
          break;
        }
        case 5: {
          limitNum = 100;
          break;
        }
        case 6: {
          limitNum = 100;
          break;
        }
        case 7: {
          limitNum = 100;
          break;
        }
        case 8: {
          limitNum = 100;
          break;
        }
        case 9: {
          limitNum = 100;
          break;
        }
        case 10: {
          limitNum = 100;
          break;
        }
        case 11: {
          limitNum = 100;
          break;
        }
        case 12: {
          limitNum = 30;
          break;
        }
        case 13: {
          limitNum = 100;
          break;
        }
        case 14: {
          limitNum = 100;
          break;
        }
        case 15: {
          limitNum = 100;
          break;
        }
        case 16: {
          limitNum = 100;
          break;
        }
        case 17: {
          limitNum = 100;
          break;
        }
        case 18: {
          limitNum = 100;
          break;
        }
        case 19: {
          limitNum = 100;
          break;
        }
        case 20: {
          limitNum = 100;
          break;
        }
        case 21: {
          limitNum = 100;
          break;
        }
        case 22: {
          limitNum = 100;
          break;
        }
        case 23: {
          limitNum = 100;
          break;
        }
        case 24: {
          limitNum = 100;
          break;
        }
        case 25: {
          limitNum = 100;
          break;
        }
        case 26: {
          limitNum = 100;
          break;
        }
        case 27: {
          limitNum = 100;
          break;
        }
        default: {
          limitNum = 100;
          // break;
        }
      }
      return limitNum;
    },
    getNodesAndLinksByPeriod(period) {
      console.log("@@@", period);
      var minIndex = period[0];
      var maxIndex = period[1];
      console.log(minIndex, maxIndex);
      if (minIndex == 1 && maxIndex == 2) {
        // this.getFirstInitData();
        this.getDataByTimeID(1, 22);
        this.forceDataGraph;
        return;
      }
      if (minIndex == 7 && maxIndex == 8) {
        this.getData7_8();
        this.forceDataGraph;
        return;
      }
      if (minIndex == 25 && maxIndex == 26) {
        this.getData25_26();
        this.forceDataGraph;
        return;
      }
      // debugger;
      // console.log("???all", this.allNodes, this.allLinks);
      var dataN = this.allNodes.slice();
      var dataL = this.allLinks.slice();
      // console.log("firstNL", dataN, dataL);
      var thirdDataL = this.allLinks.slice();
      var currentSpecialSecNode = [];
      // console.log("++++++slice", dataN, dataL);
      var showN = [];
      var nodeIds = [];
      var secTargetIds = [];
      var thirdTargetIds = [];
      dataN = dataN.filter((node) => {
        //timeType在给定范围内的结点
        if (
          (node.timeType >= minIndex && node.timeType <= maxIndex) ||
          node.timeType == -1
        ) {
          // 为第一次出现，去重
          if (nodeIds.indexOf(node.id) === -1) {
            nodeIds.push(node.id);
            showN.push(node.id);
            return true;
          } else {
            return false;
          }
          // return true;
        } else {
          return false;
        }
      });
      // console.log("*****filter-nodes", nodeIds, showN, dataN);
      // debugger;
      dataL = dataL.filter((link) => {
        if (showN.includes(link.source) || showN.includes(link.source.id)) {
          if (link.source === "党史图谱" || link.source.id === "党史图谱") {
            if (showN.includes(link.target) || showN.includes(link.target.id)) {
              return true;
            } else {
              return false;
            }
          }
          if (
            (nodeIds.indexOf(link.target) === -1 ||
              nodeIds.indexOf(link.target.id) === -1) &&
            (secTargetIds.indexOf(link.target) === -1 ||
              secTargetIds.indexOf(link.target.id) === -1)
          ) {
            let secTemp =
              typeof link.target === "object" ? link.target.id : link.target;
            if (!showN.includes(secTemp)) {
              secTargetIds.push(secTemp);
            }
            // showN.push(link.target);
          }
          return true;
        } else {
          return false;
        }
      });
      // console.log("initNLT", dataN, dataL, secTargetIds);
      // debugger;
      //查找特殊二级节点下属的三级节点及其连接关系
      thirdDataL = thirdDataL.filter((thirdL) => {
        let thirdTemp;
        if (
          (this.specialSecNodesList.includes(thirdL.source) ||
            this.specialSecNodesList.includes(thirdL.source.id)) &&
          (secTargetIds.includes(thirdL.source) ||
            secTargetIds.includes(thirdL.source.id))
        ) {
          thirdTemp =
            typeof thirdL.target === "object"
              ? thirdL.target.id
              : thirdL.target;
          // console.log("temp", thirdTemp);
          if (thirdTargetIds.includes(thirdTemp) != true) {
            thirdTargetIds.push(thirdTemp);
          }
          return true;
        } else {
          return false;
        }
      });
      // console.log("thirdL", thirdDataL);
      // console.log("thirdN", thirdTargetIds);
      //合并到主关系
      for (let i = 0; i < thirdDataL.length; i++) {
        dataL.push(thirdDataL[i]);
      }

      let targetLen = secTargetIds.length;
      let thirdTargetLen = thirdTargetIds.length;
      let tempNode = this.allNodes.slice();
      //从所有节点中提取二级,三级结点
      for (var i = 0; i < this.allNodes.length; i++) {
        if (targetLen <= 0 && thirdTargetLen <= 0) {
          break;
        }
        if (
          secTargetIds.includes(tempNode[i].id) &&
          nodeIds.indexOf(tempNode[i].id) === -1
        ) {
          dataN.push(tempNode[i]);
          nodeIds.push(tempNode[i].id);
          --targetLen;
        }
        if (
          thirdTargetIds.includes(tempNode[i].id) &&
          nodeIds.indexOf(tempNode[i].id) === -1
        ) {
          dataN.push(tempNode[i]);
          nodeIds.push(tempNode[i].id);
          --thirdTargetLen;
        }
      }
      // console.log("filter-links", dataL, dataN);
      // console.log("显示节点", showN);
      // console.log("三级节点", thirdTargetIds);

      // console.log("final-N", nodeIds);
      // let templinkid = [];
      // for (let t = 0; t < dataL.length; t++) {
      //   let tt;
      //   if (typeof dataL[t].source === "object") {
      //     tt = dataL[t].source.id + "-" + dataL[t].target.id;
      //   } else {
      //     tt = dataL[t].source + "-" + dataL[t].target;
      //   }
      //   templinkid.push(tt);
      // }
      // console.log("final-L", templinkid);
      // console.log("final-Show", showN);
      // console.log("thirdN", thirdTargetIds);
      this.nodeIds = nodeIds;
      this.dataNodes = dataN;
      this.dataLinks = dataL;
      this.showNodes = showN;
      this.secTargetNId = secTargetIds;
      this.forceDataGraph;
      // return nodes;
    },
    changePeriod(id) {
      console.log("点击了时间轴上id=" + id);
      if (this.praparedGraphId.includes(id))
        this.getDataByTimeID(id, this.getlimitNumByTimeId(id));

      // let period = this.getPeriodByTimeId(id);
      // //优先把事件结点排在前面
      // this.getNodesAndLinksByPeriod(period);
    },
    //获取本地json数据
    getLocalData() {
      this.allNodes = [];
      this.allLinks = [];
      axios
        .get("http://localhost:" + this.localPort + "/allNodes.json")
        .then((res) => {
          //用axios的方法引入地址
          this.allNodes = res.data.slice();
          // console.log("#####", res.data);
        });
      // console.log("@@@allNodes", this.allNodes);
      axios
        .get("http://localhost:" + this.localPort + "/relation.json")
        .then((res) => {
          //用axios的方法引入地址
          this.allLinks = res.data.slice();
          // console.log("#####", res.data);
        });
      // console.log("@@@allLinks", this.allLinks);
    },
    //根据时间轴对应timeid获取数据
    //limitNum限制初始显示数据数量
    getDataByTimeID(timeid, limitNum) {
      axios
        .get(
          "http://localhost:" +
            this.localPort +
            "/data/dataNodes/dataNode_" +
            timeid +
            ".json"
        )
        .then((res) => {
          this.dataNodes = res.data.slice();
          //用axios的方法引入地址
          for (var i = 0; i <= limitNum; i++) {
            // tempNodes.push(res.data[i]);
            this.showNodes.push(res.data[i].id);
          }
        });
      // this.secShowNodes=[]
      // this.secShowNodes.push("鲁迅")
      axios
        .get(
          "http://localhost:" +
            this.localPort +
            "/data/relations/relation_" +
            timeid +
            ".json"
        )
        .then((res) => {
          //用axios的方法引入地址
          this.dataLinks = res.data.slice();
        });
      this.searchForOpenNodeName = "";
    },
    //获取战役列表
    getWarList() {
      axios
        .get("http://localhost:" + this.localPort + "/data/war.json")
        .then((res) => {
          this.warList = res.data.slice();
        });
    },

    //根据结点id请求数据
    pullRequestFromDataGraph(node) {
      //请求后端数据保存
      let getNodes = [];
      let getLinks = [];
      //测试
      if (node.id === "五四运动") {
        getNodes = [
          {
            img: "",
            description: "五四运动test",
            size: 25,
            name: "test",
            personID: "10880",
            id: "test",
            group: 2,
          },
        ];
        getLinks = [
          {
            relationName: "涉及",
            source: "五四运动",
            target: "test",
          },
        ];
        this.requetNodeData = getNodes;
        this.requestRelaData = getLinks;
      }
    },
  },
  created() {
    //获取本地数据
    // this.getLocalData();
    this.getDataByTimeID(1, 22);
    // this.getFirstInitData();
    this.getWarList();
    // debugger;
  },
  // mounted() {
  //   this.changePeriod(1);
  // },
};
</script>


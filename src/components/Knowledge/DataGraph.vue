
<template>
  <!-- zoom缩放事件要加在最外层div才有最佳效果
即鼠标只要进入到div区域都可以响应滚轮缩放事件 -->
  <div id="DataGraph" class="MainDiv">
    <svg
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :width="svgSize.width"
      :height="svgSize.height"
      :style="{ 'background-color': theme.bgcolor }"
    >
      <g id="container">
        <!-- 图像绘制 -->
        <!-- 箭头 -->
        <g class="g-pointer">
          <marker
            class="pointer"
            id="resolved-person"
            markerUnits="userSpaceOnUse"
            viewBox="0 -5 10 10"
            refX="32"
            refY="0"
            :markerWidth="pointerWidth"
            :markerHeight="pointerHeight"
            orient="auto"
            stroke-eidth="1"
          >
            <path d="M0,-5L10,0L0,5" fill="#e84118"></path>
          </marker>
        </g>
        <g class="g-pointer">
          <marker
            class="pointer"
            id="resolved-event"
            markerUnits="userSpaceOnUse"
            viewBox="0 -5 10 10"
            refX="32"
            refY="0"
            :markerWidth="pointerWidth"
            :markerHeight="pointerHeight"
            orient="auto"
            stroke-eidth="1"
          >
            <path d="M0,-5L10,0L0,5" fill="#2ecc71"></path>
          </marker>
        </g>
        <g class="g-pointer">
          <marker
            class="pointer"
            id="resolved-prop"
            markerUnits="userSpaceOnUse"
            viewBox="0 -5 10 10"
            refX="32"
            refY="0"
            :markerWidth="pointerWidth"
            :markerHeight="pointerHeight"
            orient="auto"
            stroke-eidth="1"
          >
            <path d="M0,-5L10,0L0,5" fill="#3498db"></path>
          </marker>
        </g>
        <g class="g-pointer">
          <marker
            class="pointer"
            id="resolved-time"
            markerUnits="userSpaceOnUse"
            viewBox="0 -5 10 10"
            refX="32"
            refY="0"
            :markerWidth="pointerWidth"
            :markerHeight="pointerHeight"
            orient="auto"
            stroke-eidth="1"
          >
            <path d="M0,-5L10,0L0,5" fill="#f9ca24"></path>
          </marker>
        </g>
        <!-- 优先导入关系，连接线 -->
        <g class="g-links">
          <!-- v-for循环创建多个包含line的g -->
          <g
            class="g-link"
            v-for="link in links"
            :key="link.index"
            :linkName="`line-${link.source.id}-${link.target.id}`"
          >
            <!-- v-show="hidOrShowForLink(link.index)" -->
            <line
              class="link"
              :id="`line-${link.source.id}-${link.target.id}`"
              :stroke="theme.linkStroke"
              :stroke-width="linkWidth"
              marker-end="url(#resolved-person)"
            ></line>
          </g>
        </g>

        <!-- 关系文本 -->
        <g class="g-texts-rects">
          <g
            class="g-text-rect"
            v-for="link in links"
            :key="link.index"
            :textName="`${link.relationName}:${link.source.id}-${link.target.id}`"
          >
            <!-- v-show="hidOrShowForLink(link.index)" -->
            <!-- 关系文本域 -->
            <rect
              v-show="link.relationName != '' && link.relationName.length >= 2"
              class="rect"
              :id="`rect-${link.source.id}-${link.target.id}`"
              fill="#fff"
              :stroke="theme.linkStroke"
              stroke-width="1"
              opacity="1"
              rx="4"
              ry="4"
            ></rect>
            <!-- 关系文本内容 -->
            <text
              v-show="link.relationName != '' && link.relationName.length >= 2"
              class="text"
              :id="`text-${link.source.id}-${link.target.id}`"
              fill="black"
              :height="rectHeight"
              font-size="15px"
              text-anchor="middle"
              font-weight="700"
              font-family="宋体"
            >
              {{ link.relationName }}
            </text>
          </g>
        </g>
        <!-- 关系文本域rect -->

        <!-- 结点、图片导入 dfs为渐变-->
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style="stop-color: rgb(255, 255, 0); stop-opacity: 1"
            />

            <stop
              offset="100%"
              style="stop-color: rgb(255, 0, 0); stop-opacity: 1"
            />
          </linearGradient>
        </defs>
        <!-- 默认人物图层 -->
        <pattern
          class="pic-pattern"
          id="pic-person"
          width="100%"
          height="100%"
          patternContentUnits="objectBoundingBox"
        >
          <image
            id="image-person"
            width="1"
            height="1"
            href="../../assets/person.png"
          />
        </pattern>
        <!-- 默认事件图层 -->
        <pattern
          class="pic-pattern"
          id="pic-event"
          width="100%"
          height="100%"
          patternContentUnits="objectBoundingBox"
        >
          <image id="image-person" width="1" height="1" href="event.png" />
        </pattern>
        <!-- 默认属性图层 -->
        <pattern
          class="pic-pattern"
          id="pic-prop"
          width="100%"
          height="100%"
          patternContentUnits="objectBoundingBox"
        >
          <image id="image-person" width="1" height="1" href="prop.jpg" />
        </pattern>
        <!-- 默认时间图层 -->
        <pattern
          class="pic-pattern"
          id="pic-time"
          width="100%"
          height="100%"
          patternContentUnits="objectBoundingBox"
        >
          <image id="image-time" width="1" height="1" href="time1.jpg" />
        </pattern>
        <g class="g-nodes">
          <g
            class="g-node"
            v-for="node in nodes"
            :key="node.index"
            :nodeName="node.id"
          >
            <!-- v-show="hidOrShowForNode(node.index)" -->
            <!-- 图层导入 -->
            <pattern
              class="pic-pattern"
              v-if="node.img"
              :id="'pic-' + node.id"
              width="100%"
              height="100%"
              patternContentUnits="objectBoundingBox"
            >
              <image
                :id="`image-${node.id}`"
                width="1"
                height="1"
                :href="node.img"
              />
            </pattern>
            <!-- 有图片链接结点 -->
            <!-- :r="`${node.size}`" -->
            <circle
              class="node"
              v-if="node.img"
              :id="`circle-${node.id}`"
              :dbClickFlag="dbClickFlag[node.index]"
              :r="getNodeSize(node)"
              :fill="
                node.img === ''
                  ? nodeColor(nodeTypeKey[node.index])
                  : 'url(#pic-' + node.id + ')'
              "
              :stroke="setCircleStroke(node)"
              :stroke-width="setCircleStrokeWidth(node)"
              @click="singleClickEle($event, node)"
              @dblclick="doubleClickEle"
              @mouseover.prevent="svgMouseover"
              @mouseout="svgMouseout"
            ></circle>

            <!-- 无指定图片结点 -->
            <circle
              class="node"
              v-else
              :fill="selectPicForNoImagNodes(node)"
              :id="`circle-${node.id}`"
              :dbClickFlag="dbClickFlag[node.index]"
              :r="getNodeSize(node)"
              :stroke="setCircleStroke(node)"
              :stroke-width="setCircleStrokeWidth(node)"
              @click="singleClickEle($event, node)"
              @dblclick="doubleClickEle"
              @mouseover.prevent="svgMouseover"
              @mouseout="svgMouseout"
            ></circle>
            <!-- v-show="node.showText" -->
            <text
              class="node-text"
              :id="`text-${node.id}`"
              :fill="theme.textFill"
              :font-size="nodeTextFontSize"
              font-weight="600"
            >
              <!-- font-family="楷体"
              font-weight="600" -->
              {{ node[nodeTextKey] }}
            </text>
          </g>
        </g>
      </g>
    </svg>
    <!-- 绘制右边显示结果 -->
    <div id="info" :showCircleIndex="showCircleIndex" @mousewheel="infoScroll">
      <h4></h4>
      <div id="infoText"></div>
    </div>
    <!-- 菜单栏 -->
    <div class="menuHolder">
      <ul class="menu">
        <li>
          <a
            id="a1"
            href="#"
            @mouseenter="hoverMenu"
            @mouseleave="leaveMenu"
            @click="menuClickEvt($event, 0)"
            :menuClick="menuClick[0]"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-people"
              viewBox="0 0 16 16"
            >
              <path
                d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
              />
            </svg>

            <span>人物</span></a
          >
        </li>
        <li>
          <a
            id="a2"
            href="#"
            @mouseenter="hoverMenu"
            @mouseleave="leaveMenu"
            @click="menuClickEvt($event, 1)"
            :menuClick="menuClick[1]"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-text-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
              /></svg
            ><span>事件</span></a
          >
        </li>
        <li>
          <a
            id="a3"
            href="#"
            @mouseenter="hoverMenu"
            @mouseleave="leaveMenu"
            @click="menuClickEvt($event, 2)"
            :menuClick="menuClick[2]"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path
                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
              /></svg
            ><span>属性</span></a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
  <style>
/**
隐藏属性inactive
  @使用原生vue的v-show属性来控制容易造成显示上的滞后
    即在双击结点之后没有第一时间展开节点或者收起结点，
    原因应该是vue自身的模板解析问题要等到所有事件全部处理完毕之后才继续
*/
.Main_Div {
  /* width: 1900;
  height: 875; */
  /*
  Main_div:997
  info:996~999
  menu:995~998
  */
}
#svg1 {
  z-index: 997;
  transform: translate(120px, 40px);
}
.inactive {
  display: none !important;
  opacity: 0;
}
/* .hideInfo {
  opacity: 0;
  width: 200px;
  height: 200px;
  z-index: 0;
} */
.g-node circle:hover {
  cursor: pointer;
}
.g-node text:hover {
  cursor: pointer;
}
.g-text-rect text:hover {
  cursor: pointer;
}
/* .menuHolder:hover .menuWindow 
 {
  width: 460px;
  height: 460px;
  overflow: hidden;
  /* -webkit-transition: 0s 0s;
            -moz-transition: 0s 0s;
            -ms-transition: 0s 0s;
            -o-transition: 0s 0s;
            transition: 0s 0s; }*/
.menuHolder {
  right: 0;
  top: 0;
  list-style: none;
  position: absolute;
  /* width: 440px;
  height: 450px; */
  width: 500px;
  height: 500px;
  overflow: hidden;
  transform-origin: 500px 0;
  transform: rotate(90deg);
  /*初始转到屏幕顶上去，设置overflow:hidden所以不影响 */
}
.menu a {
  position: absolute;
  display: block;
  /* width: 440px;
  height: 440px; 
     border-radius: 0 0 0 440px; 
     transform-origin: 440px 0; */
  border-left: 1px solid #dfe4ea;
  border-top: 3px solid #ffd16d;
  box-shadow: 5px 5px 0px gray;
  width: 480px;
  height: 480px;
  border-radius: 0 0 0 480px;
  transform-origin: 480px 0;

  /*旋转原点 */

  /* padding-left: 10px; */
  /*排在导航菜单旁边，撑大盒子然后设置z-index*/
  top: 0;
  right: 0;
  z-index: 995;
  background: #dfe4ea;

  font-size: 16px;
  font-weight: 700;
  color: #306c92;

  text-decoration: none;
  text-align: left;
  text-indent: 1em;
  opacity: 0;
  transition: 1s;
  transform: rotate(
    90deg
  ); /*初始转到屏幕顶上去，设置overflow:hidden所以不影响 */
}
.menu a span {
  display: block;
}
.menu #a1 span {
  transform: translate(21px, 51px);
}
.menu #a2 span {
  transform: rotate(30deg) translate(69px, 146px);
}
.menu #a3 span {
  transform: rotate(60deg) translate(154px, 189px);
}
.menu a svg {
  width: 42px;
  height: 42px;
  pointer-events: none;
}
.menu #a1 svg {
  transform: translate(21px, 50px);
}
.menu #a2 svg {
  transform: rotate(30deg) translate(56px, 42px);
}
.menu #a3 svg {
  transform: rotate(60deg) translate(81px, 7px);
}

/* 文本信息区域 */
#info {
  background: white;
  opacity: 1;
  position: absolute;
  width: 0px;
  height: 0px;
  top: 0;
  right: 0;
  bottom: 40px;
  /* padding: 5px 0px 0px 10px; */
  margin-bottom: 300px;
  text-align: left;
  /* font-family: "楷体"; */
  /* border-left: 6px solid #ffd16d;
  border-bottom: 6px solid #ffd16d; */
  /* border-radius: 0 0 0 100px; */

  transition: 0.9s;
  z-index: 996;
  box-sizing: content-box;
  /* box-shadow: 10px 5px 10px #e49f09; */
  background-image: url("../../assets/info8.png");

  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(247, 215, 148, 1);
}

#info #infoText {
  width: 80%;
  height: 65%;
  overflow-y: scroll;
  float: right;
}
#info #infoText p {
  color: black;

  /* margin-top: 0;
  margin-bottom: 5px; */
  /* padding: 0 0 0 55px; */
  font-size: 21px;
  font-weight: 600;
  font-family: "楷体";
  /* padding: 0 0 10px 100px; */
  text-indent: 2em;
}

#info #infoText p span {
  /* color: #888; */
  color: #ff6348;
  display: inline-block;
  margin: 5px 0;
  text-indent: 0;
  /* font-size: 22px; */
  font-size: 28px;
}

#info h4 {
  color: black;
  font-size: 30px;
  /* font-weight: 600; */
  /* cursor: pointer; */
  cursor: default;
}

#info #infoText::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

#info #infoText::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

#info #infoText::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.mask {
  color: #dcdde1;
  background-color: #dcdde1;
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0.8;
}
</style>
<script>
/**
 * showNodeList
 * //结点双击控制flag数组,初始化为false,默认结点未双击展开
 *    dbClickFlag: null,
 * //结点,关系显示控制flag数组,初始化为true,默认显示
      showNode: null,
      showLink: null,
 * 
 * //隐藏结点
 * 
 */
import * as d3 from "./d3.v4.js";
import * as $ from "./jquery2.2.4";
// import * as d3 from "d3";
// 元素的 classList 是 DOMTokenList
DOMTokenList.prototype.indexOf = Array.prototype.indexOf;
export default {
  name: "DataGraph",
  props: {
    //用以保存从后端获取到的显示结点名称
    //结点id
    nodeTypeKey: Array,
    visableNodeList: Array,
    nodeList: Array,
    linkList: Array,
    secTargetNId: Array,
    //请求到的数据存储
    requetNodeData: Array,
    requestRelaData: Array,
    searchForOpenNodeName: {
      type: String,
      default: "",
    },
    nodeSize: {
      type: Number,
      default: 25,
    },
    nodeTextKey: {
      type: String,
      default: "id",
    },

    nodeTextFontSize: {
      type: Number,
      default: 12,
    },
    linkWidth: {
      type: Number,
      default: 2,
    },
    linkRelationKey: {
      type: String,
      default: "relationName",
    },
    linkTypeKey: {
      type: String,
      default: "type",
    },
    linkTextFrontSize: {
      type: Number,
      default: 10,
    },
    linkDistance: {
      type: Number,
      default: 260,
    },
    // svg
    svgSize: {
      type: Object,
      default: () => {
        return {
          // width: window.innerWidth - 80,
          // // height: window.innerHeight-20,
          // // width: "100%",
          // height: window.innerHeight - 80,
        };
      },
    },
    bodyStrength: {
      type: Number,
      default: -150,
    },
  },
  data() {
    return {
      originZoomEvent: d3.event,
      zoomEnterAgain: false,
      force: null, //d3力数据模拟
      timeNodeForce: null, //时间结点力导模型
      zoom: d3.zoom(),
      nodeColor: d3.scaleOrdinal(d3.schemeCategory10),
      // nodeColor: d3.schemeCategory10,
      dragging: false, //该变量保证拖动鼠标时，不会影响图形变换，默认为false未选中鼠标
      //单双击鼠标控制量
      click_store: null, // 存储单击事件
      time: 300,
      timeOut: null,
      //控制量
      //结点双击标识
      dbClickFlag: [],
      //文本框显示结点index
      showCircleIndex: -1,
      //文本框展开标识
      infoIsShow: -1,
      //结点,边显示标识
      showNode: [],
      showLink: [],

      rectWidth: 54,
      rectHeight: 24,
      pointerHeight: 12,
      pointerWidth: 12,
      // mouseIsOnInfo: false,
      //info div拖动控制
      orginLeft: null,
      orginTop: null,
      //菜单点击标识
      menuClick: [],

      //每个结点的轮盘控制标识,标识相关属性是否展开
      //人物属性交由dbclick维护
      //事件关系,属性关系
      eventLinksFlag: [],
      propLinksFlag: [],

      //结点不透明度
      nodesOpacity: [],

      // //附加测试人物节点属性与关系
      // addTestNodes: [],
      // addTestLinks: [],
      secVisableNodeList: [],

      //写死测试案例开国大典各个节点位置
      specialTestNode: ["毛泽东"],

      //其他隐藏元素不透明度
      otherElementOpacity: "0",

      //所有节点的id
      allNodesID: [],
    };
  },
  computed: {
    nodes() {
      // 去重nodeList
      let nodes = this.nodeList.slice();
      let nodeIds = [];
      nodes = nodes.filter((node) => {
        if (nodeIds.indexOf(node.id) === -1) {
          nodeIds.push(node.id);
          return true;
        } else {
          return false;
        }
      });
      this.allNodesID = nodeIds;
      return nodes;
    },
    personNodes() {
      let personNodes = this.nodes.slice();
      let pid = [];
      personNodes = personNodes.filter((p) => {
        for (var pkey in p) {
          if (pkey === "personID") {
            pid.push(p.id);
            return true;
          }
        }

        return false;
      });
      // this.personNodesID = pis;
      // console.log("computed", this.personNodesID);
      return personNodes;
    },
    eventNodes() {
      let eventNodes = this.nodes.slice();
      let eid = [];
      eventNodes = eventNodes.filter((e) => {
        for (var ekey in e) {
          if (ekey === "eventSeq") {
            eid.push(e.id);
            return true;
          }
        }
        return false;
      });
      // this.eventNodesID = eid;
      return eventNodes;
    },
    propNodes() {
      let propNodes = this.nodes.slice();
      let poid = [];
      propNodes = propNodes.filter((po) => {
        for (var pokey in po) {
          if (pokey === "prop") {
            poid.push(po.id);
            return true;
          }
        }
        return false;
      });
      // this.propNodesID = poid;
      return propNodes;
    },
    normalNodes() {
      let normalNodes = this.nodes.slice();
      normalNodes = normalNodes.filter((n) => {
        if (n.timeID) {
          return false;
        } else {
          return true;
        }
      });
      return normalNodes;
    },
    timeNodes() {
      let timeNodes = this.nodes.slice();
      let tnid = [];
      timeNodes = timeNodes.filter((tn) => {
        for (var tnkey in tn) {
          if (tnkey === "timeID") {
            tnid.push(tn.id);
            return true;
          }
        }
        return false;
      });
      // this.timeNodesID = tnid;
      return timeNodes;
    },
    links() {
      // console.log(this.linkList);
      return this.linkList;
    },
    timeLinks() {
      let timeLinks = this.links.slice();
      timeLinks = timeLinks.filter((tl) => {
        if (
          this.timeNodesID.includes(tl.source) ||
          this.timeNodesID.includes(tl.source.id)
        ) {
          return true;
        }
        return false;
      });

      return timeLinks;
    },
    normalLinks() {
      let normalLinks = this.links.slice();
      normalLinks = normalLinks.filter((nl) => {
        if (
          this.timeNodesID.includes(nl.source) ||
          this.timeNodesID.includes(nl.source.id)
        ) {
          return false;
        }
        return true;
      });

      return normalLinks;
    },
    theme() {
      return {
        // bgcolor: "#272b30",
        bgcolor: "transparent",
        // nodeStroke: "#f9ca24",
        // nodeWidth: 3,
        linkStroke: "rgba(164, 176, 190,1.0)",
        textFill: "black",
        BigNode01: 40,
        BigNode02: 30,
        BigNode03: 28,
        BigNode04: 25,

        NodeStroke01: "#f9ca24",
        NodeStroke02: "#f9ca24",
        NodeStroke03: "#f9ca24",
        NodeStroke04: "#f9ca24",

        NodeWidth01: 8,
        NodeWidth02: 4,
        NodeWidth03: 3,
        NodeWidth04: 2,
      };
    },
    personNodesID() {
      let ids = [];
      for (let i = 0; i < this.personNodes.length; i++) {
        ids.push(this.personNodes[i].id);
      }
      return ids;
    },
    timeNodesID() {
      let ids = [];
      for (let i = 0; i < this.timeNodes.length; i++) {
        ids.push(this.timeNodes[i].id);
      }
      return ids;
    },
    eventNodesID() {
      let ids = [];
      for (let i = 0; i < this.eventNodes.length; i++) {
        ids.push(this.eventNodes[i].id);
      }
      return ids;
    },
    propNodesID() {
      let ids = [];
      for (let i = 0; i < this.propNodes.length; i++) {
        ids.push(this.propNodes[i].id);
      }
      return ids;
    },
  },
  //$nextTick
  //被监视数据更新则执行回调函数
  //监视visableNodeList数据改变则重绘制知识图谱
  watch: {
    //请求数据更新知识图谱
    requetNodeData: function () {
      this.putDataInDataGraph(this.requestNodeData, this.requestRelData);
      this.drawDataToDataGraph(this.requestNodeData, this.requestRelData);
    },
    bodyStrength: function () {
      this.initData();
      this.$nextTick(function () {
        this.initDragTickZoom();
      });
    },
    linkDistance: function () {
      this.initData();
      this.$nextTick(function () {
        this.initDragTickZoom();
      });
    },
    nodes: function () {
      this.initData();
      this.$nextTick(function () {
        // 以下这个函数重新在 node 上调用了拖拽
        // 只有在 mounted 后才有用
        // 所以要使用 $nextTick
        this.initBoolean();
        // console.log("$origin show", this.showNode, this.showLink);
        this.showAllSvg();
        this.initVisable(this.visableNodeList);
        // console.log("$new show", this.showNode, this.showLink);
        this.initGroupColer();
        this.initDragTickZoom();
      });
      // this.$forceUpdate();
    },
    // dbClickFlag: function () {
    // },
    links: function () {
      this.initData();
      this.$nextTick(function () {
        // 以下这个函数重新在 node 上调用了拖拽
        // 只有在 mounted 后才有用
        // 所以要使用 $nextTick
        this.initBoolean();
        // console.log("$origin show", this.showNode, this.showLink);
        this.showAllSvg();
        this.initVisable(this.visableNodeList);
        // console.log("$new show", this.showNode, this.showLink);
        this.initGroupColer();
        this.initDragTickZoom();
      });
      // this.$forceUpdate();
    },
    visableNodeList: function () {
      // console.log("graph$nodes", this.nodes);
      // console.log("graph$links", this.links);
      // console.log("graph$vnodelist", this.visableNodeList);
      // debugger;
      console.log("personId", this.personNodesID);
      this.initData();
      this.$nextTick(function () {
        // 以下这个函数重新在 node 上调用了拖拽
        // 只有在 mounted 后才有用
        // 所以要使用 $nextTick
        this.initBoolean();
        // console.log("$origin show", this.showNode, this.showLink);
        this.showAllSvg();
        this.initVisable(this.visableNodeList);
        // console.log("$new show", this.showNode, this.showLink);
        this.initGroupColer();
        this.initDragTickZoom();
      });
      this.$forceUpdate();
    },
  },
  //创建时
  created() {
    // console.log("@@", this.nodes);
    // console.log("@@", this.nodeList);
    // console.log("@visableNodeList", this.visableNodeList);

    // console.log(, d3);
    //初始化数据，boolean[],图谱元素可见性

    this.initData();
  },
  //挂载时
  mounted() {
    this.initBoolean();
    this.initVisable(this.visableNodeList);
    this.initGroupColer();
    this.initDragTickZoom();
    // console.log(this.showLink);

    // console.log(this.timeNodes);
    // console.log(this.timeLinks);
    // let svg = document.getElementById("svg1");
    // svg.style.transform = "translate(200, 50);";
  },
  methods: {
    setElementTransition(time) {
      $(".node").css("transition", time);
      $(".link").css("transition", time);
      $(".rect").css("transition", time);
      $(".text").css("transition", time);
    },
    getNodeLeavel(node) {
      if (node.id === "党史图谱") {
        return 0;
      }
      if (node.timeID) {
        //19xx
        return 1;
      }
      if (this.visableNodeList.includes(node.id)) {
        //event
        return 2;
      }
      if (this.secTargetNId.includes(node.id)) {
        //鲁迅
        return 3;
      }
      //关系
      return 5;
    },
    getNodeSize(node) {
      let leavel = this.getNodeLeavel(node);
      if (leavel === 0) {
        return this.theme.BigNode01;
      } else if (leavel === 1) {
        return this.theme.BigNode02;
      } else if (leavel === 2) {
        return this.theme.BigNode03;
      }
      return this.theme.BigNode04;
    },
    setCircleStroke(node) {
      let leavel = this.getNodeLeavel(node);
      if (leavel === 0) {
        return this.theme.NodeStroke01;
      } else if (leavel === 1) {
        return this.theme.NodeStroke02;
      } else if (leavel === 2) {
        return this.theme.NodeStroke03;
      }
      return this.theme.NodeStroke04;
    },
    setCircleStrokeWidth(node) {
      let leavel = this.getNodeLeavel(node);
      if (leavel === 0) {
        return this.theme.NodeWidth01;
      } else if (leavel === 1) {
        return this.theme.NodeWidth02;
      } else if (leavel === 2) {
        return this.theme.NodeWidth03;
      }
      return this.theme.NodeWidth04;
    },
    //     SetlineClass(link){
    // return this.timeNodesID.includes(link.source.id)?"link":"link timelink"
    //     },
    //为无图片结点分配图片
    selectPicForNoImagNodes(node) {
      // console.log("timenode", this.timeNodesID);
      if (this.personNodesID.includes(node.id)) return "url(#pic-person)";
      if (this.eventNodesID.includes(node.id)) {
        if (this.timeNodesID.includes(node.id)) {
          return "url(#pic-time)";
        }
        return "url(#pic-event)";
      }
      if (this.propNodesID.includes(node.id)) return "url(#pic-prop)";
    },

    //初始化各个控制量布尔类型值
    initBoolean() {
      this.secVisableNodeList = [];
      //初始化结点
      this.dbClickFlag = [];
      this.showNode = [];
      this.showLink = [];
      this.menuClick = [];
      this.eventLinksFlag = [];
      this.propLinksFlag = [];
      this.nodesOpacity = [];
      // this.requetNodeData = [];
      // this.requestRelaData = [];
      for (var i = 0; i < this.nodes.length; i++) {
        if (!this.nodes[i].timeID) {
          this.dbClickFlag.push(false); //一般节点dbclick默认为false
        } else {
          this.dbClickFlag.push(true); //time结点为true
        }

        this.showNode.push(false);
        this.eventLinksFlag.push(false);
        this.propLinksFlag.push(false);
        this.nodesOpacity.push("0");
      }
      //初始化link
      for (var j = 0; j < this.links.length; j++) {
        this.showLink.push(false);
      }
      // console.log(this.dbClickFlag);
      for (var t = 0; t < 3; t++) {
        this.menuClick[t] = 0;
      }
    },
    initData(forceSourceId) {
      //
      var that = this;
      // console.log(this.nodes);
      // this.timeNodeForce = d3
      //   .forceSimulation(this.timeNodes)
      //   .force(
      //     "link",
      //     d3
      //       .forceLink(this.timeLinks)
      //       .id((d) => d.id)
      //       .distance(that.linkDistance)
      //       // .strength(0)
      //       .strength((d) => {
      //         if (d.source.id === forceSourceId) return 0.7;
      //         else return 0;
      //       })
      //   )
      //   .force(
      //     "radial",
      //     d3.forceRadial(240, that.svgSize.width / 2, that.svgSize.height / 2)
      //   )
      //   .force("collide", d3.forceCollide().radius(30));

      this.force = d3
        // .forceSimulation(this.normalNodes)
        .forceSimulation(this.nodes)
        .force(
          "link",
          d3
            // .forceLink(this.normalLinks)
            .forceLink(this.links)
            .id((d) => d.id)
            .distance(that.linkDistance)
            // .strength(0)
            .strength((d) => {
              if (d.source.id === forceSourceId) return 1;
              else return 0;
            })
        )
        // .force("charge", d3.forceManyBody().strength()) //The strength of the attraction or repulsion
        // .force("charge", d3.forceManyBody().strength())
        // .force(
        //   "center",
        //   d3.forceCenter(that.svgSize.width / 2, that.svgSize.height / 2)
        // );
        // 碰撞力 防止节点重叠
        .force("collide", d3.forceCollide().radius(45));
      // d3.forceRadial(radius(that.svgSize.width / 2, that.svgSize.height / 2));
      // .forceX(300)
      // .forceY(100);
      // console.log('nodes', this.nodes);
      // console.log('links', this.links);
    },
    initDragTickZoom() {
      var that = this;
      // 给节点添加拖拽
      d3.selectAll("circle").call(
        d3
          .drag()
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended)
      );
      //为文本显示域添加宽高
      // let rectWidthTemp = this.rectWidth;
      // let fSize = this.nodeTextFontSize;
      d3.select(".g-texts-rects")
        .selectAll("rect")
        // .attr("width", (d) => {
        //   if (rectWidthTemp < d.relationName.length * fSize) {
        //     return d.relationName.length * fSize + 10;
        //   }
        //   return rectWidthTemp;
        // })
        .attr("width", this.rectWidth)
        .attr("height", this.rectHeight);
      // this.timeNodeForce.on("tick", this.ticked());
      this.force.on("tick", () => {
        // 更新连线坐标
        d3.selectAll("line")
          .data(this.links)
          // .data(that.testLinks)
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);
        //更新关系标签文本显示域
        d3.select(".g-texts-rects")
          .selectAll("rect")
          .data(this.links)
          .attr("x", (d) => {
            // if (d.target.id === "朱安" || d.target === "朱安") {
            //   console.log("！！！source of 朱安：", d.source.id);
            // }
            return (d.source.x + d.target.x) / 2;
          })
          .attr("y", (d) => (d.source.y + d.target.y) / 2)
          .attr("transform", (d) => {
            // 获取转动的角度，给加上rotate属性
            let { angle } = this.getAngel(d);
            return `rotate(${angle}, ${(d.source.x + d.target.x) / 2}, ${
              (d.source.y + d.target.y) / 2
            }) translate(-${this.rectHeight / 2}, -${this.rectHeight / 2})`;
            //
          });
        //更新关系标签文本显示域
        d3.select(".g-texts-rects")
          .selectAll("text")
          .data(this.links)
          .attr("x", (d) => (d.source.x + d.target.x) / 2)
          .attr("y", (d) => (d.source.y + d.target.y) / 2)
          .attr("transform", (d) => {
            // 获取转动的角度，给加上rotate属性
            let { angle } = this.getAngel(d);
            return `rotate(${angle}, ${(d.source.x + d.target.x) / 2}, ${
              (d.source.y + d.target.y) / 2
            }) translate(${14}, ${5})`;
            //
          });
        // 更新节点坐标
        // let templist = [
        //   "辛亥革命",
        //   "中华民国成立",
        //   "一战",
        //   "《新青年》创办",
        //   "《晨钟报》创刊",
        //   "广州起义",
        //   "十月革命",
        //   "二月革命",
        // ];
        // let templist = this.visableNodeList;

        d3.selectAll("circle")
          .data(this.nodes)
          .attr("cx", (d) => {
            let leavel = that.getNodeLeavel(d);
            if (leavel === 0) {
              d.fx = 698; //写死位置
            } else if (
              leavel === 1 ||
              leavel === 2 ||
              this.specialTestNode.includes(d.id)
            ) {
              if (this.searchForOpenNodeName != d.id)
                if (that.nodes[d.index].x) {
                  d.fx = that.nodes[d.index].x;
                }
            }
            return d.x;
          })

          .attr("cy", (d) => {
            let leavel = that.getNodeLeavel(d);
            if (leavel === 0) {
              // console.log("has fixed");
              d.fy = 290.62;
            } else if (
              leavel === 1 ||
              leavel === 2 ||
              this.specialTestNode.includes(d.id)
            ) {
              if (this.searchForOpenNodeName != d.id)
                if (that.nodes[d.index].y) {
                  d.fy = that.nodes[d.index].y;
                }
            }
            return d.y;
          });
        // .attr("fx", (d) => d.x)
        // .attr("fy", (d) => d.y);
        // 更新文字坐标
        d3.select(".g-nodes")
          .selectAll("text")
          .data(this.nodes)
          .attr("x", (d) => d.x - 0.5 * d.id.length * that.nodeTextFontSize)
          .attr("y", (d) => d.y + 1.7 * that.getNodeSize(d));
        // d3.selectAll(".link-text")
        //   .data(this.links)
        //   .attr("x", (d) => (d.source.x + d.target.x) / 2)
        //   .attr("y", (d) => (d.source.y + d.target.y) / 2);
        // });
      });
      // 初始化 zoom
      // console.log("@", this);
      // 初始化 zoom
      this.zoom.scaleExtent([0.1, 4]).on("zoom", this.zoomed);
      d3.select("#DataGraph").call(this.zoom).on("dblclick.zoom", null);
    },
    //显示所有svg元素
    showAllSvg() {
      for (var nodeIndex = 0; nodeIndex < this.nodes.length; nodeIndex++) {
        d3.select(".g-nodes")
          .selectAll("#circle-" + this.nodes[nodeIndex].id)
          .attr("class", "node");
        d3.select(".g-nodes")
          .selectAll("#text-" + this.nodes[nodeIndex].id)
          .attr("class", "node-text");
      }
      for (var linkIndex = 0; linkIndex < this.links.length; linkIndex++) {
        var publicId =
          this.links[linkIndex].source.id +
          "-" +
          this.links[linkIndex].target.id;
        d3.select(".g-links")
          .selectAll("#line-" + publicId)
          .attr("class", "link");
        d3.select(".g-texts-rects")
          .selectAll("#rect-" + publicId)
          .attr("class", "rect");
        d3.select(".g-texts-rects")
          .selectAll("#text-" + publicId)
          .attr("class", "text");
      }
    },
    //设置知识图谱各个元素可见性
    initVisable(nameList) {
      //结点隐藏判断(以visableNodeList为判断依据)
      //i:结点
      //j:边
      // console.log("@", this.nodeList);
      for (var nodeIndex = 0; nodeIndex < this.nodes.length; nodeIndex++) {
        //结点id是否存在于可见列表
        if (nameList.includes(this.nodes[nodeIndex].id)) {
          // console.log("@@show", this.nodeList[nodeIndex].id);
          this.showNode[nodeIndex] = true;
          this.nodesOpacity[nodeIndex] = "1";
          //初始化隐藏边(非time结点,非搜索展开结点)
          // console.log("timeId", this.nodes[nodeIndex].timeID);
          if (!this.nodes[nodeIndex].timeID) {
            if (this.nodes[nodeIndex].id != this.searchForOpenNodeName) {
              this.hideLinksByNode(nodeIndex);
            } else {
              this.dbClickFlag[nodeIndex] = true;
              this.setLinksShowOrHideByDbCliced(
                this.searchForOpenNodeName,
                false,
                "person"
              );
            }
          }
        } else {
          //节点不在可见列表中
          //隐藏结点，并隐藏所有与此节点相关联的边
          this.hideNode(nodeIndex);
          this.hideLinksByNode(nodeIndex);
        }
      }
      // this.setLinksShowOrHideByDbCliced()
    },
    //改变link颜色
    changeLinkStyle(colorIndex, linkIndex) {
      //#2ecc71 绿色 对应event 0
      //#3498db 蓝色 对应prop 1
      //#e84118 红色 对应person 2
      //#f9ca24 黄色 对应time 3
      var colorList = ["#2ecc71", "#3498db", "#e84118", "#f9ca24"];
      let sourceID = this.links[linkIndex].source.id;
      let targetID = this.links[linkIndex].target.id;
      var publicId = sourceID + "-" + targetID;
      var type;
      if (colorIndex === 0) {
        type = "event";
      } else if (colorIndex === 1) {
        type = "prop";
      } else if (colorIndex === 2) {
        type = "person";
      } else if (colorIndex === 3) {
        type = "time";
      } else {
        console.log("此连接没有指定color设置为默认 linkIndex:", linkIndex);
        type = "time";
      }
      var markerID = "url(#resolved-" + type + ")";
      if (type === "time") {
        d3.select(".g-links")
          .selectAll("#line-" + publicId)
          .attr("stroke-width", () => {
            if (sourceID === "党史图谱") {
              // console.log("EEEEEEEEorror", targetID);
              return "5";
            }
            return "2";
          });
      }
      // console.log("!!!", d3.select(".g-links").selectAll("#line-" + publicId));
      d3.select(".g-links")
        .selectAll("#line-" + publicId)
        .attr("stroke", colorList[colorIndex])
        .attr("marker-end", markerID);
      d3.select(".g-texts-rects")
        .selectAll("#rect-" + publicId)
        .attr("stroke", colorList[colorIndex]);
    },
    //根据link初始化各部分颜色
    initGroupColer() {
      // console.log("pid", this.personNodesID);
      for (var linkIndex = 0; linkIndex < this.links.length; linkIndex++) {
        let targetNodeId;
        if (typeof this.links[linkIndex] === "object") {
          targetNodeId = this.links[linkIndex].target.id;
        } else {
          this.links[linkIndex].target;
        }
        //遍历所有link
        if (this.personNodesID.includes(targetNodeId)) {
          //保持原来的颜色
          // console.log("2person", targetNodeId);
          this.changeLinkStyle(2, linkIndex);
        } else if (this.eventNodesID.includes(targetNodeId)) {
          if (this.timeNodesID.includes(targetNodeId)) {
            // console.log("3time", targetNodeId);
            this.changeLinkStyle(3, linkIndex);
          } else {
            // console.log("0event", targetNodeId);
            this.changeLinkStyle(0, linkIndex);
          }
        } else if (this.propNodesID.includes(targetNodeId)) {
          // console.log("1prop", targetNodeId);
          this.changeLinkStyle(1, linkIndex);
        } else {
          // console.log("Error!未知结点,未分配类别_" + targetNodeId);
        }
      }
    },
    //隐藏nodeIndex结点
    hideNode(nodeIndex) {
      this.showNode[nodeIndex] = false;
      d3.select(".g-nodes")
        .selectAll("#circle-" + this.nodes[nodeIndex].id)
        .attr("class", "inactive");
      //隐藏结点文本
      d3.select(".g-nodes")
        .selectAll("#text-" + this.nodes[nodeIndex].id)
        .attr("class", "inactive");
    },
    //隐藏所有以nodeIndex节点为source的边
    hideLinksByNode(nodeIndex) {
      var publicId;
      for (var linkIndex = 0; linkIndex < this.links.length; linkIndex++) {
        //node为source的边
        if (this.links[linkIndex].source.id === this.nodes[nodeIndex].id) {
          this.showLink[linkIndex] = false;
          publicId =
            this.nodes[nodeIndex].id + "-" + this.links[linkIndex].target.id;
        }
        // //node为target的边
        // if (
        //   this.linkList[linkIndex].target.id === this.nodeList[nodeIndex].id
        // ) {
        //   this.showLink[linkIndex] = false;
        //   publicId =
        //     this.linkList[linkIndex].source.id +
        //     "-" +
        //     this.nodeList[nodeIndex].id;
        // }
        //隐藏line
        d3.select(".g-links")
          .selectAll("#line-" + publicId)
          .attr("class", "inactive");
        //隐藏rect
        d3.select(".g-texts-rects")
          .selectAll("#rect-" + publicId)
          .attr("class", "inactive");
        //隐藏text
        d3.select(".g-texts-rects")
          .selectAll("#text-" + publicId)
          .attr("class", "inactive");
      }
    },
    // 获取角度等信息
    getAngel(d) {
      let dsx = d.source.x;
      let dsy = d.source.y;
      let tsx = d.target.x;
      let tsy = d.target.y;

      let disX = tsx - dsx;
      let disY = tsy - dsy;
      let disZ = Math.sqrt(Math.pow(disY, 2) + Math.pow(disX, 2));

      let sin = disY / disZ;
      let cos = disX / disZ;
      // 根据弧度算角度
      let angle = (Math.asin(sin) * 180) / Math.PI;

      if (tsx < dsx) {
        angle = -angle;
      }
      return {
        sin,
        cos,
        angle,
      };
    },
    //根据menuId和flag改变menu的css状态
    //false:点亮
    //true:还原
    //a1 a2 a3 aID
    //0  1  2  a_index(menuClick)
    menuPartChangeStatus(aID, a_index, flag) {
      //#2ecc71 绿色 对应event 0
      //#3498db 蓝色 对应prop 1
      //#e84118 红色 对应person 2
      var bgcolor;
      if (aID === "a1") {
        bgcolor = "#e84118";
      } else if (aID === "a2") {
        bgcolor = "#2ecc71";
      } else if (aID === "a3") {
        bgcolor = "#3498db";
      } else {
        console.log("Error!!!没有这个选择菜单:", aID);
      }
      if (flag) {
        //true 还原
        $("#" + aID).css({
          "font-size": "16px",
          "background-color": "#dfe4ea",
          transition: "1s",
        });
        $("#" + aID + " svg").attr("width", "30px");
        $("#" + aID + " svg").attr("height", "30px");
        this.menuClick[a_index] = 0;
        $("#" + aID).attr("menuClick", this.menuClick[a_index]);
        //还原svg
        $("#" + aID + " svg").attr("fill", "currentColor");
        $("#" + aID + " span").css("color", "currentColor");
      } else {
        //点亮
        $("#" + aID).css({
          "font-size": "18px",
          "background-color": "#ffd16d",
          transition: "0s",
        });
        $("#" + aID + " svg").attr("width", "32px");
        $("#" + aID + " svg").attr("height", "32px");
        this.menuClick[a_index] = 1;
        $("#" + aID).attr("menuClick", this.menuClick[a_index]);
        //高亮svg图标
        $("#" + aID + " svg").attr("fill", bgcolor);
        $("#" + aID + " span").css("color", bgcolor);
      }
    },
    //调用menuPartChangeStatus判断并设置菜单状态
    menuSetStatus(nodeIndex) {
      //人物轮盘部分
      if (this.dbClickFlag[nodeIndex]) {
        //1.单击节点为双击展开状态
        if (this.menuClick[0] === 0) {
          //若人物轮盘未被点击
          this.menuPartChangeStatus("a1", 0, false);
        }
      } else {
        //单击结点未被双击展开
        this.menuPartChangeStatus("a1", 0, true);
      }
      //事件轮盘部分
      if (this.eventLinksFlag[nodeIndex]) {
        //1.单击节点为事件展开状态
        if (this.menuClick[1] === 0) {
          //若事件轮盘未被点击
          this.menuPartChangeStatus("a2", 1, false);
        }
      } else {
        //单击结点未点击事件展开
        this.menuPartChangeStatus("a2", 1, true);
      }
      //属性轮盘部分
      if (this.propLinksFlag[nodeIndex]) {
        //1.单击节点为属性展开状态
        if (this.menuClick[2] === 0) {
          //若属性轮盘未被点击
          this.menuPartChangeStatus("a3", 2, false);
        }
      } else {
        //单击结点未点击属性展开
        this.menuPartChangeStatus("a3", 2, true);
      }
    },
    //根据点击菜单和结点展示或隐藏
    //a_index:
    //0:人物
    //1:事件
    //2:属性
    //nodeId:轮盘显示信息的结点id
    //flag:展开或收起结点(true:收起,false:展开)
    //调用 setLinksShowOrHideByDbCliced(nodeId, flag)
    menuClickPerform(a_index, nodeIndex, flag) {
      // let dbStatus = this.dbClickFlag[nodeIndex];
      let nodeId = this.nodes[nodeIndex].id;
      if (a_index === 0) {
        //显示或隐藏人物结点
        this.setLinksShowOrHideByDbCliced(nodeId, flag, "person");
        this.dbClickFlag[nodeIndex] = !flag;
        //将当前显示的元素与nodeid结点相关设置为1，other:0.1
        this.changeOthersOpacity(nodeId, this.otherElementOpacity);
      } else if (a_index === 1) {
        //显示或隐藏事件结点
        this.setLinksShowOrHideByDbCliced(nodeId, flag, "event");
        this.eventLinksFlag[nodeIndex] = !flag;
        this.changeOthersOpacity(nodeId, this.otherElementOpacity);
      } else if (a_index === 2) {
        //显示或隐藏属性
        this.setLinksShowOrHideByDbCliced(nodeId, flag, "prop");
        this.propLinksFlag[nodeIndex] = !flag;
        this.changeOthersOpacity(nodeId, this.otherElementOpacity);
      } else {
        console.log("Error!没有匹配的菜单,a_index=" + a_index);
        return;
      }
    },
    //菜单点击
    menuClickEvt(e, a_index) {
      //菜单能够点击说明此时已经展开了轮盘
      // console.log(e, a_index);
      // console.log(this.menuClick);
      var aID = e.target.id;
      var flag = this.menuClick[a_index] === 1 ? true : false;
      if (this.menuClick[a_index] === 1) {
        //index=1,再次点击,还原初始状态
        this.menuPartChangeStatus(aID, a_index, flag);
        //showCircleIndex即和对应结点nodeIndex相对应
        //菜单响应到图谱
        this.menuClickPerform(a_index, this.showCircleIndex, flag);
      } else {
        //高亮点击菜单
        this.menuPartChangeStatus(aID, a_index, flag);
        //菜单响应到图谱
        this.menuClickPerform(a_index, this.showCircleIndex, flag);
      }
    },
    hoverMenu(e) {
      //#2ecc71 绿色 对应event 0
      //#3498db 蓝色 对应prop 1
      //#e84118 红色 对应person 2
      if (e.stopPropagation) {
        //这是取消冒泡
        e.stopPropagation();
      }
      //
      if ($("#" + e.target.id).attr("menuClick") === "0") {
        var aID = e.target.id;
        let changeColor = "currentColor";
        if (aID === "a1") {
          changeColor = "#e84118";
        } else if (aID === "a2") {
          changeColor = "#2ecc71";
        } else if (aID === "a3") {
          changeColor = "#3498db";
        } else {
          console.log("Error!!!没有这个选择菜单:", aID);
        }
        $("#" + aID).css({
          "font-size": "18px",
          "background-color": "#ffd16d",
          transition: "0s",
        });
        $("#" + aID + " svg").attr("width", "32px");
        $("#" + aID + " svg").attr("height", "32px");
        $("#" + aID + " svg").attr("fill", changeColor);
        $("#" + aID + " span").css("color", changeColor);
      }
    },
    leaveMenu(e) {
      if (e.stopPropagation) {
        //这是取消冒泡
        e.stopPropagation();
      }
      if ($("#" + e.target.id).attr("menuClick") === "0") {
        var aID = e.target.id;
        $("#" + aID).css({
          "font-size": "16px",
          "background-color": "#dfe4ea",
          transition: "1s",
        });
        $("#" + aID + " svg").attr("width", "30px");
        $("#" + aID + " svg").attr("height", "30px");
        $("#" + aID + " svg").attr("fill", "currentColor");
        $("#" + aID + " span").css("color", "currentColor");
      }
    },

    //单击事件处理
    singleClickEle(e, node) {
      /**
       * test
       */
      // this.visableNodeList.splice(this.visableNodeList.indexOf("鲁迅"), 1);
      // console.log("@@@当前显示列表数组为", this.visableNodeList);
      // this.$forceUpdate;
      /**
       * test
       */
      let that = this;
      // console.log("111", this);
      clearTimeout(this.timeOut); // 清除第一个单击事件
      this.timeOut = setTimeout(function () {
        if (!this.dragging) {
          // console.log("单击事件触发");
          // 单击事件的代码执行区域
          if (e.target.tagName === "circle") {
            console.log("node单击事件", e.target.__data__);
            // that.$emit("changeContentId", node.id);
            // let getCx = d3.select(e.target).attr("cx");
            // let getCy = d3.select(e.target).attr("cy");
            // d3.select(e.target).attr("cx", (d) => {
            //   d.fx = getCx;
            //   return getCx;
            // });
            // d3.select(e.target).attr("cy", (d) => {
            //   d.fy = getCy;
            //   return getCy;
            // });

            that.showNodeText(e);
            //单击结点事件代码
          } else if (e.target.tagName === "line") {
            console.log("link单击事件", e.target.__data__);
            //单击连接事件代码
            this.clickLink(e);
          }
        }
      }, this.time);
    },
    infoScroll(e) {
      //  e = e||window.event;
      if (e.stopPropagation) {
        //这是取消冒泡
        e.stopPropagation();
      }
      // console.log("gunlun");
      // 0----down  1----up
      var direction = e.deltaY > 0 ? "0" : "1";
      const tabBar = this.$el.querySelector("#info");
      //下面的逻辑实现的是内部元素横向滚动，前提设置好内部元素横向的滚动样式了
      if (direction === "0") {
        tabBar.scrollTop += 30;
      } else {
        tabBar.scrollTop -= 30;
      }
    },
    //文本框显示节点信息
    //改变文本框属性
    changeInfoStatus(width, height, z, radius, opacity) {
      $("#info").css("transition", "0.9s");
      $("#info").css("width", width);
      $("#info").css("height", height);
      $("#info").css("z-index", z);
      $("#info").css("border-radius", radius);
      $("#info").css("opacity", opacity);
      //  $("#info").css("opacity", text_opacity);
    },
    changeMenuRotate(deg1, deg2, deg3, opacity, z) {
      $("#a1").css({
        transform: "rotate(" + deg1 + "deg" + ")",
      });
      $("#a2").css({
        transform: "rotate(" + deg2 + "deg" + ")",
      });
      $("#a3").css({
        transform: "rotate(" + deg3 + "deg" + ")",
      });
      $(".menu a").css({
        opacity: opacity,
        "z-index": z,
      });
      $(".menuHolder").css({
        transform: "rotate(" + deg1 + "deg" + ")",
      });
    },
    //显示结点基本信息
    showBasicInfo(nodeData) {
      var textColor = this.nodeColor(this.nodeTypeKey[nodeData.index]);
      $("#info  #infoText").css("padding", "15px 0px 0px 0px");
      $("#info h4").css("color", textColor).text(nodeData.id);
      $("#info #infoText p").remove();
      var intro = this.personNodesID.includes(nodeData.id)
        ? "人物简介"
        : "事件简介";
      for (var key in nodeData) {
        // //类型复杂的不进行显示
        if (typeof nodeData[key] == "object") {
          continue;
        }
        //比较复杂的超链接字段不显示
        if (key != "description") {
          continue;
        }
        var description = nodeData[key].split("。");
        let setLength = 80;
        if (nodeData.id.length > 9) {
          setLength = 75;
        }
        let length = description[0].length;
        let end = length >= setLength ? setLength : length;
        var showFirstDesc = description[0].slice(0, end);
        //显示值及其字段名字
        $("#info #infoText").append("<p><span>" + intro + "<span>" + "</p>");
        $("#info #infoText").append(
          "<p>" +
            showFirstDesc +
            "   " +
            "<a id='showMore' href='#'>更多" +
            "</a>" +
            "</p>"
        );
        //显示菜单
        // $(".menu a").css("display", "block");
        this.changeMenuRotate("-0", "-30", "-60", "1", "998");

        $(".menu a").css("box-shadow", "5px 5px 0px gray");
        this.aClickShowMore(nodeData);
      } //end for
    },
    //文本框拖动与infodiv边框样式改变
    addDragForInfo() {
      //拖动无延迟，设置"transition", "0s"
      $("#info").css("transition", "0s");
      $("#info").css("border", "5px solid #ffd16d");
      $("#info").mousedown(function (e) {
        var isMove;
        var div_x;
        var div_y;
        e.stopPropagation();
        isMove = true;
        div_x = e.pageX - $("#info").offset().left;
        div_y = e.pageY - $("#info").offset().top;
        $(document)
          .mousemove(function (e) {
            e.stopPropagation();
            if (isMove) {
              var obj = $("#info");
              obj.css({ left: e.pageX - div_x, top: e.pageY - div_y });
            }
          })
          .mouseup(function () {
            isMove = false;
          });
      });
    },
    //显示更多
    aClickShowMore(nodeData) {
      let that = this;
      let description = nodeData["description"].split("。");

      // console.log("@@", $("#showMore"));
      $("#showMore").click(function () {
        //隐藏菜单
        that.changeMenuRotate("90", "90", "90", "1", "995");
        $(".menu a").css("box-shadow", "none");
        // console.log(233333);
        that.changeInfoStatus(
          "460px",
          "550px",
          "999",
          "0px 25px 25px 0px",
          "1"
        );
        $("#info h4").css("padding-bottom", "10px");
        $("#info #infoText p").remove();
        $("#info #infoText").append(
          "<p><span>" + "人物简介:" + "<span>" + "</p>"
        );
        for (var i = 0; i < description.length; i++) {
          if (i == description.length - 1) {
            $("#info #infoText").append(
              "<p>" +
                description[i] +
                "   " +
                "<a id='packUp' href='#'>收起" +
                "</a>" +
                "</p>"
            );
          } else {
            $("#info #infoText").append("<p>" + description[i] + "</p>");
          }
        }
        //后面重新调用showBasicInfo时候会被移除，可以不用修改回原值
        $("#info  #infoText").css("padding", "18px 36px 0px 0px");
        // console.log("@@@@", $("#packUp"));
        //保存展开时候的最初位置
        that.orginLeft = $("#info").offset().left;
        that.orginTop = $("#info").offset().top;
        //更多展开之后添加了四周的border,会使得全屏时候屏幕抖动
        //将文本框位置左移一些
        $("#info").css({
          padding: "40px 0px 0px 10px",
          left: that.orginLeft - 130,
          top: that.orginTop,
        });
        // console.log(that.orginLeft);
        // console.log(that.orginTop);
        //div实现拖拽（在内部先将transtion改为0不然会有很大延迟）
        that.addDragForInfo();
        //收起
        that.aClickBack(nodeData, that);
      });

      // $("#info p #back").click(function () {
      //   console.log(222);
      // });
    },
    //收起显示
    aClickBack(nodeData, that) {
      $("#packUp").click(function () {
        console.log("@@收起", that.orginLeft, that.orginTop);
        //移除对应的拖动，点击事件
        $("#info h4").css("padding-bottom", "0");
        $("#info").off("mousedown");
        $("#showMore").off("click");
        //info文本框复位
        $("#info").css({
          transition: "0.9s", //为了使得返回慢一些
          left: that.orginLeft,
          top: that.orginTop,
        });
        //info div恢复
        $("#info").css({
          padding: "5px 0px 0px 10px",
          border: " 5px solid #ffd16d",
          "border-top": "none",
          "border-right": "none",
        });
        // $("#info").css();
        // $("#info").css();
        // $("#info").css();
        // that.changeInfoStatus("340px", "340px", "999", "0 0 0 350px", "1");
        that.changeInfoStatus("360px", "360px", "999", "0 0 0 360px", "1");
        //文本恢复初始化
        that.showBasicInfo(nodeData);
        // debugger;
      });
    },

    //单击一个节点后其他元素透明度改变
    //只改变当前显示的元素
    changeOthersOpacity(clickedNodeId, otherOpacity) {
      var showOpacity = "1";
      // var otherOpacity = "0.1";
      var changeAttr = "opacity";
      var that = this;
      // var fatherNodeList = [];
      // //先改变结点的不透明度，非当前点击结点或其父级结点均为otherOpacity
      // //查找当前与点击节点显示并相连的父级节点
      // //class===link代表此条关系边为显示
      // for (let i = 0; i < this.links.length; i++) {
      //   if (
      //     this.links[i].target.id === clickedNodeId &&
      //     $(
      //       "#line-" + this.links[i].source.id + "-" + this.links[i].target.id
      //     ).attr("class") == "link"
      //   ) {
      //     fatherNodeList.push(this.links.source.id);
      //   }
      // }
      // console.log("fatherList", fatherNodeList);
      //显示或隐藏 node
      // this.setElementTransition("1s");
      d3.select(".g-nodes")
        .selectAll(".node")
        .attr(changeAttr, function (d) {
          // || fatherNodeList.includes(d.id)
          if (clickedNodeId === d.id) {
            that.nodesOpacity[d.index] = showOpacity;
            return showOpacity;
          } else {
            //记录节点不透明度的改变
            that.nodesOpacity[d.index] = otherOpacity;
            return otherOpacity;
          }
        });
      //隐藏或显示结点文本
      d3.select(".g-nodes")
        .selectAll(".node-text")
        .attr(changeAttr, function (d) {
          //  || fatherNodeList.includes(d.id)
          if (clickedNodeId === d.id) {
            return showOpacity;
          } else {
            return otherOpacity;
          }
        });
      d3.select(".g-links")
        .selectAll(".link")
        .attr(changeAttr, function (d) {
          //以class=link为查找标准，还可以避开当前没有显示的元素，因为如果没有显示则class=inactive，不在查找到的集合范围内
          if (clickedNodeId === d.source.id) {
            //改变此link的target节点透明度为showOpacity
            that.nodesOpacity[d.target.index] = showOpacity;
            // console.log(d.target.id, that.nodesOpacity[d.target.index]);
            d3.selectAll("#circle-" + d.target.id).attr(
              changeAttr,
              showOpacity
            );
            d3.selectAll("#text-" + d.target.id).attr(changeAttr, showOpacity);
            return showOpacity;
          }
          //  else if (
          //   fatherNodeList.includes(d.source.id) &&
          //   clickedNodeId === d.target.id
          // ) {
          //   return showOpacity;
          // }
          else {
            return otherOpacity;
          }
        });

      //显示或隐藏rect
      d3.select(".g-texts-rects")
        .selectAll(".rect")
        .attr(changeAttr, function (d) {
          // else if (
          //   fatherNodeList.includes(d.source.id) &&
          //   clickedNodeId === d.target.id
          // ) {
          //   return showOpacity;
          //  }
          if (clickedNodeId === d.source.id || clickedNodeId === d.source) {
            return showOpacity;
          } else {
            return otherOpacity;
          }
        });
      //显示或隐藏relName-text
      // else if (
      //       fatherNodeList.includes(d.source.id) &&
      //       clickedNodeId === d.target.id
      //     ) {
      //       return showOpacity;
      //     }
      d3.select(".g-texts-rects")
        .selectAll(".text")
        .attr(changeAttr, function (d) {
          if (clickedNodeId === d.source.id) {
            return showOpacity;
          } else {
            return otherOpacity;
          }
        });
      // setTimeout(() => {
      //   this.setElementTransition("0s");
      // }, 500);
    },
    //单击结点展示文本框
    showNodeText(e) {
      var showCircleIndex = this.showCircleIndex; //文本框显示节点信息,-1则为隐藏
      var infoDivStatus = $("#info").attr("class"); //获取文本框class状态
      var nodeData = e.target.__data__;
      var currentNodeIndex = nodeData.index;
      var that = this;
      if (!this.dragging) {
        //显示结点文本信息
        //1.文本框此时为隐藏状态
        //2.文本框未隐藏，但此时显示内容非单击节点内容
        if (
          showCircleIndex != currentNodeIndex ||
          infoDivStatus === "hideInfo"
        ) {
          //显示节点
          this.showCircleIndex = currentNodeIndex;
          $("#info").css({
            transition: "0.9s", //为了使得返回慢一些
            left: that.orginLeft,
            top: that.orginTop,
            "box-shadow": "10px 5px 10px #e49f09",
            padding: "5px 0px 0px 10px",
            "border-left": "6px solid #ffd16d",
            "border-bottom": "6px solid #ffd16d",
            "border-top": "none",
            "border-right": "none",
          });

          // this.changeInfoStatus("340px", "340px", "999", "0 0 0 350px", "1");
          //适配90%调大
          that.changeInfoStatus("360px", "360px", "999", "0 0 0 360px", "1");

          this.showBasicInfo(nodeData);
          //轮盘显示
          this.menuSetStatus(e.target.__data__.index);
          //其他非当前节点元素透明度改变
          this.changeOthersOpacity(
            e.target.__data__.id,
            this.otherElementOpacity
          );
        }
        //若显示节点index等于当前结点index则隐藏文本框
        if (showCircleIndex === currentNodeIndex) {
          this.showCircleIndex = -1;

          //移除对应的拖动，点击事件
          $("#info").off("mousedown");
          $("#showMore").off("click");
          $("#info").css({
            transition: "0.9s", //为了使得返回慢一些
            left: that.orginLeft,
            top: that.orginTop,
          });
          this.changeInfoStatus("0px", "0px", "996", "none", "0");
          $("#info").css("box-shadow", "none");
          $("#info h4").text("");
          this.changeMenuRotate("90", "90", "90", "1", "995");

          $(".menu a").css("box-shadow", "none");
          // $(".menu a").css("display", "none");
          //收起结点所有相关属性
          //调用轮盘点击行为，true,收起
          this.menuClickPerform(0, currentNodeIndex, true);
          this.menuClickPerform(1, currentNodeIndex, true);
          this.menuClickPerform(2, currentNodeIndex, true);
          //不透明度变回原来
          this.changeOthersOpacity(e.target.__data__.id, "1");
        }
      }
      //轮盘响应
      //轮盘
    },

    //双击结点时设置结点的关系边和traget结点显示或隐藏,边添加force
    //nodeId:待操作的结点id
    //flag:展开或隐藏标识(true:隐藏 false:显示)
    //typeFlag:展开或隐藏的结点类别(person:人物 event:事件 prop:属性)
    setLinksShowOrHideByDbCliced(nodeId, flag, typeFlag) {
      console.log(
        "进入到setlinkshoworhide方法 nodeid:",
        nodeId,
        flag,
        typeFlag
      );
      if (
        !this.visableNodeList.includes(nodeId) &&
        !this.secVisableNodeList.includes(nodeId)
      ) {
        console.log(
          "@setLinksShowOrHideByDbCliced" + nodeId + "不在可见列表中"
        );
        return;
      }
      //flag:true=>class="inactive"
      //表示节点已展开，为再次双击，则将以此结点为source的相关边和对应target结点隐藏
      //flag:false
      //展开节点和边
      var publicId;
      let that = this;
      var fliterSetData;
      if (typeFlag === "person") {
        fliterSetData = this.personNodesID;
      } else if (typeFlag === "event") {
        fliterSetData = this.eventNodesID;
      } else if (typeFlag === "prop") {
        fliterSetData = this.propNodesID;
      } else {
        // console.log("Error!没有这样的结点或关系类别 typeFlag=" + typeFlag);
        return;
      }
      if (!flag) {
        // false展开节点;
        this.initData(nodeId); //重新初始化连接线的force
        this.$nextTick(function () {
          this.initDragTickZoom();
        });
      } else {
        this.initData("00000");
        this.$nextTick(function () {
          this.initDragTickZoom();
        });
      }
      // let getAllIds = [];
      for (var l = 0; l < this.links.length; l++) {
        //显示以结点为source的边及其target结点
        //默认双击优先显示人物结点
        //设置typeFlag来控制
        //用if来配合typeFlag过滤links
        // console.log("进入到for");
        if (
          this.links[l].source.id === nodeId &&
          fliterSetData.includes(this.links[l].target.id)
        ) {
          // getAllIds.push(this.links[l].target.id);
          publicId = nodeId + "-" + this.links[l].target.id;
          this.showLink[l] = !flag;
          //显示或隐藏line
          d3.select(".g-links")
            .selectAll("#line-" + publicId)
            .attr("class", function () {
              if (flag === true) {
                return "inactive";
              } else {
                return "link";
              }
            });
          //显示或隐藏rect
          d3.select(".g-texts-rects")
            .selectAll("#rect-" + publicId)
            .attr("class", function () {
              if (flag === true) {
                return "inactive";
              } else {
                return "rect";
              }
            });
          //显示或隐藏relName-text
          d3.select(".g-texts-rects")
            .selectAll("#text-" + publicId)
            .attr("class", function () {
              if (flag === true) {
                return "inactive";
              } else {
                return "text";
              }
            });

          //查找隐藏边的target结点是否正在被其它节点展开使用
          //若正在被使用则对此target不做处理
          var targetIsOpen = false;
          for (var l_test = 0; l_test < this.links.length; l_test++) {
            //判断条件:
            //1.target相同，source不同
            //2.考察此条边是否为显示
            //显示则说明结点打开
            if (
              this.links[l].target.id === this.links[l_test].target.id &&
              this.links[l_test].source.id != nodeId
            ) {
              let testLinkId =
                "line-" +
                this.links[l_test].source.id +
                "-" +
                this.links[l_test].target.id;
              let testlinkClass = d3
                .select(".g-links")
                .selectAll("#" + testLinkId)
                .attr("class");
              if (testlinkClass === "link") {
                targetIsOpen = true;
                break;
              }
            }
          }
          // console.log("###", this.links[l].target.id, targetIsOpen);
          //节点打开targetIsOpe=true则不做处理
          if (!targetIsOpen) {
            //否则
            //显示或隐藏target node
            d3.select(".g-nodes")
              .selectAll("#circle-" + this.links[l].target.id)
              .attr("class", function () {
                if (flag === true) {
                  //收起source结点
                  if (
                    //target结点存在于一级可见列表
                    that.visableNodeList.includes(that.links[l].target.id)
                  ) {
                    //target同时存在于二级显示列表中
                    if (
                      that.secVisableNodeList.includes(that.links[l].target.id)
                    ) {
                      //从二级显示列表中移除并隐藏
                      for (let i = 0; i < that.secVisableNodeList.length; i++) {
                        if (
                          that.secVisableNodeList[i] === that.links[l].target.id
                        )
                          that.secVisableNodeList.splice(i, 1);
                        that.nodesOpacity[that.links[l].target.index] = "0";
                        break;
                      }
                    } else {
                      that.nodesOpacity[that.links[l].target.index] = "1";
                    }
                    return "node";
                  } else {
                    //若待处理节点不在一级可见列表中
                    if (
                      that.secVisableNodeList.includes(that.links[l].target.id)
                    ) {
                      for (let i = 0; i < that.secVisableNodeList.length; i++) {
                        if (
                          that.secVisableNodeList[i] === that.links[l].target.id
                        )
                          that.secVisableNodeList.splice(i, 1);
                        break;
                      }
                    }
                    that.nodesOpacity[that.links[l].target.index] = "0";
                    return "inactive";
                  }
                } else {
                  //展开source结点
                  that.secVisableNodeList.push(that.links[l].target.id);
                  that.nodesOpacity[that.links[l].target.index] = "1";
                  return "node";
                }
              });
            //隐藏或显示结点文本
            d3.select(".g-nodes")
              .selectAll("#text-" + this.links[l].target.id)
              .attr("class", function () {
                if (flag === true) {
                  if (
                    that.visableNodeList.includes(that.links[l].target.id) ===
                    true
                  ) {
                    return "node-text";
                  } else {
                    return "inactive";
                  }
                } else {
                  return "node-text";
                }
              });
          }
        }
      }
      // console.log(nodeId, "的", typeFlag, "节点:", getAllIds);
      // this.$forceUpdate();
      //若对二级节点双击展开操作
      // console.log(this.secTargetNId);
      // console.log(this);
      // if (this.secTargetNId.includes(nodeId)) {
      //   if (flag) {
      //     //true
      //     //收起当前节点
      //     //显示其他元素
      //     console.log("显示其他元素");
      //     this.changeOthersOpacity(nodeId, "1");
      //   }
      //   //false
      //   //展开当前结点
      //   //其他无关元素隐藏
      //   console.log("其他无关元素隐藏");
      //   console.log(this.changeOthersOpacity);
      //   this.changeOthersOpacity(nodeId, "0.1");
      // }
    },
    //双击事件
    doubleClickEle(e) {
      clearTimeout(this.timeOut); // 清除第二个单击事件
      if (!this.dragging) {
        console.log("双击事件捕捉");
        // console.log("test-d3", d3);
        if (e.target.tagName === "circle") {
          //获取结点的双击标识属性
          var flag = this.dbClickFlag[e.target.__data__.index];
          var id = e.target.__data__.id;
          console.log(id, flag);
          if (flag === true) {
            //true: 已经双击展开
            //为再次双击，则将其相关边隐藏
            console.log("收起" + id + "\n\n");
          } else {
            //false
            //显示元素
            console.log("显示" + id + "\n\n");
          }
          //根据flag隐藏或展开结点
          this.setLinksShowOrHideByDbCliced(id, flag, "person");

          // console.log(this.showNode);
          // console.log(this.showLink);
          //重置dbclickFlag值
          this.dbClickFlag[e.target.__data__.index] = !flag;

          //判断轮盘对应是否显示
          var showId = $("#info").attr("showCircleIndex");
          // console.log("@@@showId", showId);
          if (showId != "-1") {
            //如果文本框展开
            // return;
            if (this.dbClickFlag[e.target.__data__.index]) {
              //默认显示人物对应为a1，this.menuClick[0]
              if (this.menuClick[0] === 0) {
                this.menuPartChangeStatus("a1", 0, false);
              }
            } else {
              //双击收回结点
              this.menuPartChangeStatus("a1", 0, true);
            }
          }
        }
      }
    },
    //鼠标悬停事件M
    svgMouseover(e) {
      var circleColor = "white";
      // console.log(e);
      if (e.target.nodeName === "circle") {
        // 这里是鼠标路过节点的显示
        e.target.__data__.showText = true;
        var thisTarget = e.target.__data__;
        var size = this.getNodeSize(thisTarget);
        // var id = e.target.__data__.id;
        //结点变大
        if (this.personNodesID.includes(thisTarget.id)) {
          circleColor = "#e84118";
        } else if (this.eventNodesID.includes(thisTarget.id)) {
          if (this.timeNodesID.includes(thisTarget.id)) {
            circleColor = "#f9ca24";
          } else {
            circleColor = "#2ecc71";
          }
        } else if (this.propNodesID.includes(thisTarget.id)) {
          circleColor = "#3498db";
        } else {
          console.log("Error!!!结点缺少类型标识:");
        }
        d3.select(e.target)
          .transition()
          // .duration(100)
          .attr("r", 1.2 * size)
          .attr("opacity", "1")
          .attr("stroke", circleColor);
        d3.select("#text-" + thisTarget.id).attr("opacity", "1");
        // 强制刷新
        //显示文本信息
        this.$forceUpdate();
        // this.$emit("hoverNode", e, e.target.__data__);
      }
    },
    svgMouseout(e) {
      var that = this;
      // console.log(that.nodesOpacity[e.target.__data__.index]);
      // console.log(that.nodesOpacity);
      if (e.target.nodeName === "circle") {
        e.target.__data__.showText = false;
        var size = this.getNodeSize(e.target.__data__);
        // var id = e.target.__data__.id;
        d3.select(e.target)
          .transition()
          // .duration(100)
          .attr("r", size)
          .attr("opacity", (d) => {
            return that.nodesOpacity[d.index];
          })
          .attr("stroke", "#f9ca24");
        d3.select("#text-" + e.target.__data__.id).attr(
          "opacity",
          that.nodesOpacity[e.target.__data__.index]
        );
      }
      // 强制刷新
      this.$forceUpdate();
    },
    //缩放事件
    zoomed(transform) {
      var currentEvent = d3.event;
      d3.selectAll("#container").attr(
        "transform",
        "translate(" +
          currentEvent.transform.x +
          "," +
          currentEvent.transform.y +
          ") scale(" +
          currentEvent.transform.k +
          ")"
      );
    },
    //开始拖动并更新相应的点
    dragstarted(d) {
      if (!d3.event.active) this.force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
      this.dragging = true;
    },
    //拖动进行中
    dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    },
    //拖动结束
    dragended(d) {
      if (!d3.event.active) this.force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      this.dragging = false;
    },

    //请求知识图谱数据
    //node
    pullRequestByNode(node) {
      //获取请求数据
      this.$emit("pullRequest", node);
    },
    //添加请求数据到知识图谱
    //
    putDataInDataGraph(requestNodeData, requestRelData) {
      if (requestNodeData != [] && requestRelData != []) {
        // 去重nodes
        let reqNodes = requestNodeData.slice();
        let nodeIds = [];
        reqNodes = reqNodes.filter((node) => {
          if (nodeIds.indexOf(node.id) === -1) {
            nodeIds.push(node.id);
            return true;
          } else {
            return false;
          }
        });
        // 去重links
        let reqLinks = requestRelData.slice();
        let linkTars = [];
        reqLinks = reqLinks.filter((link) => {
          if (linkTars.indexOf(link.target) === -1) {
            linkTars.push(link.target);
            return true;
          } else {
            return false;
          }
        });

        let allnodesid = this.allNodesID.slice();
        for (var node in reqNodes) {
          if (!allnodesid.includes(node.id)) {
            //新增结点不在当前结点列表中
            this.nodeList.push(node);

            this.dbClickFlag.push(false); //一般节点dbclick默认为false
            this.showNode.push(true);
            this.eventLinksFlag.push(false);
            this.propLinksFlag.push(false);
            this.nodesOpacity.push("1");
          }
        }
        for (rel in reqLinks) {
          this.linkList.push(rel);
          this.showLink.push(true);
        }
      }
    },

    //绘制数据到知识图谱
    //绘制结点
    drawNodeToDataGraph(nodes) {
      for (var drawNode in nodes) {
        var addNode = d3
          .select("#svg1")
          .selectAll(".g-nodes")
          .append("g")
          .attr("class", "g-node");

        var addPattern = addNode.append("pattern");
        var addCircle = addNode.append("circle");
        if (drawNode.img) {
          //有图片结点
          addPattern
            .attr("class", "pic-pattern")
            .attr("id", "pic-" + drawNode.id)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("patternContentUnits", "objectBoundingBox")
            .append("image")
            .attr("id", "image-" + drawNode.id)
            .attr("width", "1")
            .attr("height", "1")
            .attr("href", drawNode.img);
        }
        addCircle.attr("class", "node").attr("id", "circle-" + drawNode, id);
      }
      //添加标签图层
      var rect = svg
        .append("g")
        .attr("class", "text-rects")
        .selectAll("rect")
        .data(graph.links)
        .enter()
        .append("rect")
        .attr("visable", "true") //是否可见
        // .attr('class', 'link-line-rect')
        .attr("id", function (d) {
          return "rect-" + d.source + "-" + d.target;
        })
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .attr("fill", "#fff")
        .attr("opacity", 0.9)
        .attr("rx", "4")
        .attr("ry", "4");
    },
    //绘制连接
    drawLinkToDataGraph(link) {
      var addLink = d3.select("#svg1").selectAll(".g-links").append("g");
    },
  },
};
</script>


<template>
  <VueTimeline
    v-on="$listeners"
    :rightComplete="rightComplete"
    :leftComplete="leftComplete"
    :showScroll="false"
    :positionId="1"
    @left-loading="left"
    @right-loading="right"
    :timelineList="timelineList"
  >
    <template v-slot:default="slotProps">
      <div class="content">
        <div class="chat">
          {{ slotProps.item.content }}
        </div>
      </div>
    </template>
    <template v-slot:time="slotProps">
      {{ slotProps.item.time }}
    </template>
  </VueTimeline>
</template>

<script>
const data = [
  {
    id: 1,
    content: "艰难探索，马克思主义在中国",
    time: "1911-1919",
  },
  {
    id: 2,
    content: "中国共产党的成立和民主革命纲领的制定",
    time: "1920-1923",
  },
  { id: 3, content: "国共合作的破裂和大革命的失败", time: "1923-1928" },
  {
    id: 4,
    content: "武装斗争，毛泽东和中国革命新道路",
    time: "1927-1930",
  },
  { id: 5, content: "反围剿、九一八事变", time: "1929-1934" },
  { id: 6, content: "长征胜利、抗日民族统一战线", time: "1935-1936" },
  {
    id: 7,
    content: "党的全面抗战路线和持久抗战方针",
    time: "1937-1939",
  },
  {
    id: 8,
    content: "坚持抗战，巩固抗日根据地",
    time: "1938-1940",
  },
  { id: 9, content: "党的七大、抗日战争的最后胜利", time: "1939-1945" },
  {
    id: 10,
    content: "争取和平民主，粉碎国民党进攻",
    time: "1945-1948",
  },
  {
    id: 11,
    content: "战略决战、国民党反动统治的覆灭",
    time: "1947-1949",
  },
  { id: 12, content: "新中国成立，抗美援朝", time: "1949-1953" },
  { id: 13, content: "社会主义改造的基本完成", time: "1952-1956" },
  { id: 14, content: "社会主义道路的艰辛探索", time: "1956-1970" },
];
import VueTimeline from "./VueTimeline.vue";
export default {
  name: "Timeline",
  components: {
    VueTimeline,
  },
  data() {
    return {
      timelineList: null,
      rightComplete: false,
      leftComplete: false,
    };
  },
  methods: {
    right(resolve) {
      // setTimeout(() => {
      this.timelineList = this.timelineList.concat([
        { id: 15, content: "社会主义建设在曲折中发展", time: "1966-1976" },
        { id: 16, content: "拨乱反正、改革开放", time: "1977-1985" },
        {
          id: 17,
          content: "社会主义初级阶段基本路线的确立",
          time: "1978-1990",
        },
        {
          id: 18,
          content: "一国两制、治理整顿、南方谈话",
          time: "1998-1995",
        },
        {
          id: 19,
          content: "十四大、十五大、跨世纪发展战略",
          time: "1992-2001",
        },
        { id: 20, content: "总体小康、港澳回归", time: "1993-2001" },
        { id: 21, content: "推进党的建设新的伟大工程", time: "1994-2001" },
        {
          id: 22,
          content: "十六大、十七大、经济社会科学发展",
          time: "2001-2010",
        },
        { id: 23, content: "深化改革开放，推进一国两制", time: "2005-2012" },
        {
          id: 24,
          content: "坚持和平与发展、确立科学发展观",
          time: "2008-2012",
        },
        {
          id: 25,
          content: "十八大、统筹五位一体、协调四个全面",
          time: "2012-2016",
        },
        {
          id: 26,
          content: "特色大国外交、人类命运共同体",
          time: "2013-2021",
        },
        {
          id: 27,
          content: "十九大、全面建成小康、现代化国家新征程",
          time: "2017-2021",
        },
      ]);
      this.rightComplete = true;
      resolve();
      // }, 1000);
    },
    left(resolve) {
      // setTimeout(() => {
      // this.timelineList = [
      //   { id: 15, content: "社会主义建设在曲折中发展", time: "1966-1976" },
      //   { id: 16, content: "拨乱反正、改革开放", time: "1977-1985" },
      //   {
      //     id: 17,
      //     content: "社会主义初级阶段基本路线的确立",
      //     time: "1978-1990",
      //   },
      //   {
      //     id: 18,
      //     content: "一国两制、治理整顿、南方谈话",
      //     time: "1998-1995",
      //   },
      //   {
      //     id: 19,
      //     content: "十四大、十五大、跨世纪发展战略",
      //     time: "1992-2001",
      //   },
      //   { id: 20, content: "总体小康、港澳回归", time: "1993-2001" },
      //   { id: 21, content: "推进党的建设新的伟大工程", time: "1994-2001" },
      //   {
      //     id: 22,
      //     content: "十六大、十七大、经济社会科学发展",
      //     time: "2001-2010",
      //   },
      //   { id: 23, content: "深化改革开放，推进一国两制", time: "2005-2012" },
      //   {
      //     id: 24,
      //     content: "坚持和平与发展、确立科学发展观",
      //     time: "2008-2012",
      //   },
      //   {
      //     id: 25,
      //     content: "十八大、统筹五位一体、协调四个全面",
      //     time: "2012-2016",
      //   },
      //   {
      //     id: 26,
      //     content: "特色大国外交、人类命运共同体",
      //     time: "2013-2021",
      //   },
      //   {
      //     id: 27,
      //     content: "十九大、全面建成小康、现代化国家新征程",
      //     time: "2017-2021",
      //   },
      // ].concat(this.timelineList);
      // this.leftComplete = true;
      resolve();
      // }, 1000);
    },
  },
  mounted() {
    // setTimeout(() => {
    this.timelineList = data;
    // }, 500);
  },
};
</script>
<style lang="less">
.content {
  // padding: 8px;
}
.chat {
  position: relative;
  min-width: 180px;
  max-width: 200px;
  padding: 5px;
  word-wrap: break-word;
  // border: 1px solid #e4e7ed;
  text-align: center;
  font-size: 16px;
  // border-radius: 4px;
}
</style>
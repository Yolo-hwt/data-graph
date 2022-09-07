
<template>
  <div class="calendar">
    <div class="calendar_left">
      <div class="calendar_title">
        <div class="arrow arrow-left" @click="prev"><</div>
        <div class="date">{{ Date_Chinese }}</div>
        <div class="arrow arrow-right" @click="next">></div>
      </div>
      <div class="calendar_content">
        <div class="row title">
          <span v-for="item in title" :key="item">{{ item }}</span>
        </div>
        <div class="row content">
          <span v-for="item in prevDays" class="grey" :key="'A' + item"></span>
          <span
            v-for="item in currentDays"
            :key="'B' + item"
            :class="[item === currentDay ? 'crimson' : 'white']"
            @click="showFocus(item)"
            >{{ item }}</span
          >
        </div>
      </div>
      <div class="footer"></div>
    </div>
    <div class="calendar_right">
      <div class="content_title">党史中的今天</div>
      <div class="main_content">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{ today_content }}
      </div>
      <div class="footer">
        <button
          @click="prevPage"
          :disabled="nowPages === 0"
          class="content_button"
        >
          &nbsp;&nbsp;上一页&nbsp;&nbsp;
        </button>
        <button
          @click="nextPage"
          :disabled="nowPages === nowLength - 1"
          class="content_button"
        >
          &nbsp;&nbsp;下一页&nbsp;&nbsp;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      title: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      currentDay: new Date().getDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      content: [
        {
          id: 4,
          words: [
            "1985年3月4日，邓小平在会见外宾时指出，现在世界上真正大的问题，带全球性的战略问题，一个是和平问题，一个是发展问题。和平问题是东西问题，发展问题是南北问题。概括起来，就是东西南北四个字。南北问题是核心问题。",
          ],
        },
        {
          id: 5,
          words: [
            "1949年3月5日至13日，中国共产党在西柏坡举行七届二中全会。毛泽东向全会作了报告。会议集中讨论彻底摧毁国民党统治，夺取全国胜利，在新形势下党的工作重心实行战略转移，即从乡村转到城市的问题。会议着重研究和规定了党在全国胜利后，在政治、经济、外交方面应当采取的基本政策，分析当时中国经济成分的状况和党所必须采取的正确政策，指出中国由农业国转变为工业国、由新民主主义社会转变为社会主义社会的发展方向。",
          ],
        },
        {
          id: 6,
          words: [
            "1940年3月6日，中共中央发出关于《抗日根据地的政权问题》的指示，指出我们在华北、华中等地建立的抗日民主政权，是统一战线性质的政权，即几个革命阶级联合起来对于汉奸和反动派的民主专政。指示规定，在政权工作人员中，共产党员、非党的左派进步分子和中间派应各占三分之一，实行“三三制”。这种规定是为了保证共产党在政权中的领导地位，同时广泛地团结广大的小资产阶级群众和争取中等资产阶级和开明绅士，进一步发展抗日民族统一战线，调动各方面的积极因素，以争取抗日战争的胜利。",
            "1957年3月6日至13日，中国共产党全国宣传工作会议在北京举行。会议吸收党外科学、教育、文学、艺术、新闻、出版等文化人士约一百六十人参加，主题是传达毛泽东关于“如何处理人民内部的矛盾”的讲话，研究思想动向和意识形态方面的问题，认真贯彻“双百”方针。会议期间，毛泽东分别同宣传、教育、文艺、新闻出版、高等学校、科学等方面的几十位党内外代表人物举行了六次座谈，并在大会上作了讲话。这些讲话，进一步深化了他关于“如何处理人民内部的矛盾”问题的思考。",
            "1991年3月6日，国务院发出《关于批准国家高新技术产业开发区和有关政策规定的通知》。决定继1988年批准北京市新技术产业开发试验区之后，在各地已建立的高新技术产业开发区中，再选定武汉东湖新技术开发区等26个开发区作为国家高新技术产业开发区。到2018年底，共建成169个国家高新技术产业开发区（含苏州工业园区）。",
          ],
        },
        {
          id: 7,
          words: [
            "1927年3月7日，毛泽东等人创办的武昌中央农民运动讲习所开始上课。恽代英、方志敏、彭湃、夏明翰等优秀共产党人都曾在那里任教或工作。农讲所培养了一批有马列主义水平和实际工作能力的领导农民运动的优秀干部。",
            "1931年3月7日，红一方面军发布经毛泽东修改的关于地方武装开展游击战争、配合红军主力歼灭敌人的通令。对地方武装，《通令》详细而具体提出扰敌、堵敌、截敌、袭敌、诱敌、捉敌、疲敌、饿敌、盲敌等十项任务和十种办法。",
            "1948年3月7日，晋冀鲁豫野战军在副司令员徐向前指挥下，集中5.3万人，发起临汾战役。这次战役历时18天，共歼国民党军2.5万余人，解放了全晋南，使吕梁和太岳两个解放区连成一片。",
            "1985年3月7日，邓小平在全国科技工作会议上讲话指出，我们在建设具有中国特色的社会主义社会时，一定要坚持发展物质文明和精神文明，坚持五讲四美三热爱，教育全国人民做到有理想、有道德、有文化、有纪律。这四条里面，理想和纪律特别重要。",
            "2014年3月7日，中央军委印发《关于提高军事训练实战化水平的意见》。",
            "2015年3月7日，国务院批复设立中国（杭州）跨境电子商务综合试验区。2016年1月、2018年7月，国务院先后批复在天津、北京等34个城市设立跨境电子商务综合试验区。",
          ],
        },
      ],
      nowPages: 0,
      nowLength: 0,
    };
  },
  methods: {
    prev() {
      if (this.currentMonth === 0) {
        this.currentYear -= 1;
        this.currentMonth = 11;
      } else {
        this.currentMonth--;
      }
    },
    next() {
      if (this.currentMonth === 11) {
        this.currentYear += 1;
        this.currentMonth = 0;
      } else {
        this.currentMonth++;
      }
    },
    showFocus(id) {
      this.currentDay = id;
      this.nowPages = 0;
    },
    prevPage() {
      if (this.nowPages > 0) {
        this.nowPages--;
      }
    },
    nextPage() {
      if (this.nowPages < this.nowLength - 1) {
        this.nowPages++;
      }
    },
  },
  computed: {
    Date_Chinese() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString(
        "default",
        { month: "short" }
      );
    },
    currentDays() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },
    prevDays() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
    },
    status() {
      return this.currentDay;
    },
    today_content() {
      var a;
      this.content.forEach((e) => {
        if (e.id === this.status) {
          this.nowLength = e.words.length;
          a = e.words[this.nowPages];
        }
      });
      return a;
    },
  },
};
</script>

<style scoped>
.calendar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  /* -webkit-box-align: center; */
  /* -ms-flex-align: center; */
  /* align-items: center; */
}

.calendar_left {
  width: 400px;
  height: 340px;
  /* background-color: linear-gradient(#c4f185, #86d2f3); */
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  transform: translateX(34px);
  z-index: 1;
}

.calendar_right {
  width: 660px;
  height: 280px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  position: relative;
  transform: scale(0.9) translateY(20px);
  z-index: 0;
}

.calendar_title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 75px;
  padding: 0 20px;
  background-color: #de2810;
  color: white;
  font-size: 30px;
}

.calendar_left .row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 14px;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.calendar_left .row.title {
  background-color: white;

  color: #546e7a;
}

.calendar_left .row.content {
  background-color: white;

  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  padding-top: 0px;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.calendar_left .row.content > span {
  height: 32px;
  width: calc(100% / 7);
  text-align: center;
  line-height: -10px;
  line-height: 32px;
}

.calendar_left .row .content .span {
  width: calc(100 / 7);
}
.grey {
  color: grey;
  opacity: 0.3;
}
.arrow-left:hover {
  background-color: #fffbd8 !important;
}
.arrow-right:hover {
  background-color: #fffbd8 !important;
}

.white {
  background-color: white;
}

.crimson {
  background-color: #de2810;
  color: white;
}

span:hover {
  background-color: #fffbd8;
}

.footer {
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  background-color: #de2810;
  color: white;
  font-size: 30px;
}
.content_title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  height: 60px;
  padding: 0 110px;
  background-color: #de2810;
  color: white;
  font-size: 30px;
}

.main_content {
    background: #fffbd8;
    opacity: 0.9;
  font-size: 20px;
  padding: 15px 25px;
  height: 140px;
  overflow-y: auto;
  text-align: left;
  padding-bottom: 40px;
  margin-bottom: 10px;

}
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-thumb {
  /* background-color: linear-gradient(red 0%, orange 100%); */
  background-color: #d5b678;
  border-radius: 8px;
}
.content_button {
  font-size: 16px;
  border-radius: 12px;
  height: 30px;
  float: right !important;
}
/*# sourceMappingURL=style.css.map */
</style>
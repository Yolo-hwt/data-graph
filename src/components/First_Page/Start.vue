<template>
  <div class="container" v-if="isShowStart">
    <div class="timeline">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            :style="{ backgroundImage: `url(${img1})` }"
            data-year="1921"
          >
            <div class="swiper-slide-content">
              <span class="timeline-year">1921年7月23日</span>
              <h5 class="timeline-title">中共一大</h5>
              <p class="timeline-text">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                中国共产党第一次全国代表大会在上海开幕，最后一天的会议转移到浙江嘉兴南湖举行。李达，毛泽东，董必武等13名代表出席大会，代表全国50多名党员。大会通过中国共产党的第一个纲领和决议，选举长生中央局，陈独秀为中央局书记。中共一大标志着中国共产党正式成立，是中国历史上开天辟地的大事。
              </p>
            </div>
          </div>
          <div
            class="swiper-slide"
            :style="{ backgroundImage: `url(${img2})` }"
            data-year="1949"
          >
            <div class="swiper-slide-content">
              <span class="timeline-year">1949年10月1日</span>
              <h3 class="timeline-title">开国大典</h3>
              <p class="timeline-text">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                1949年10月1日，中华人民共和国中央人民政府成立。下午3时，庆祝中华人民共和国中央人民政府成立典礼在北京天安门广场隆重举行。毛泽东宣告中央人民政府成立。中华人民共和国的成立，实现了中国从几千年封建专制政治向人民民主的伟大飞跃，实现了中国高度统一和各民族空前团结，中华民族发展进步从此开启新纪元。
              </p>
            </div>
          </div>
          <div
            class="swiper-slide"
            :style="{ backgroundImage: `url(${img3})` }"
            data-year="1978"
          >
            <div class="swiper-slide-content">
              <span class="timeline-year">1978年12月</span>
              <h4 class="timeline-title">改革开放</h4>
              <p class="timeline-text">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                1978年12月18日－22日，中共十一届三中全会召开。全会批判了“两个凡是”的错误方针，充分肯定必须完整地、准确地掌握毛泽东思想的科学体系，高度评价关于实践是检验真理的唯一标准问题的讨论；果断地停止使用“以阶级斗争为纲”的口号，作出把党和国家工作中心转移到经济建设上来、实行改革开放的历史性决策；全会标志着中国共产党重新确立了马克思主义的思想路线、政治路线和组织路线，实现新中国成立以来党的历史上具有深远意义的伟大转折，开启了改革开放和社会主义现代化的伟大征程。
              </p>
            </div>
          </div>
          <div
            class="swiper-slide"
            :style="{ backgroundImage: `url(${img4})` }"
            data-year="2012"
          >
            <div class="swiper-slide-content">
              <span class="timeline-year">2012年11月18日</span>
              <h4 class="timeline-title">十八大召开</h4>
              <p class="timeline-text">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                2012年11月8日－14日，中国共产党第十八次全国代表大会举行。大会通过的报告《坚定不移沿着中国特色社会主义道路前进，为全面建成小康社会而奋斗》，确定全面建成小康社会和全面深化改革开放的目标，阐明中国特色社会主义道路、中国特色社会主义理论体系、中国特色社会主义制度的科学内涵及其相互联系。中国进入特色社会主义新时代。
              </p>
            </div>
          </div>
          <div
            class="swiper-slide"
            :style="{ backgroundImage: `url(${img5})` }"
            data-year="2021"
          >
            <div class="swiper-slide-content">
              <span class="timeline-year">2021年7月1日</span>
              <h4 class="timeline-title">建党百年</h4>
              <p class="timeline-text">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                2021年7月1日上午，庆祝中国共产党成立100周年大会在北京天安门广场隆重举行。中共中央总书记、国家主席、中央军委主席习近平发表重要讲话。他表示：“中国共产党立志于中华民族千秋伟业，百年恰是风华正茂！回首过去，展望未来，有中国共产党的坚强领导，有全国各族人民的紧密团结，全面建成社会主义现代化强国的目标一定能够实现，中华民族伟大复兴的中国梦一定能够实现！”
              </p>
            </div>
          </div>
          <div
            class="swiper-slide"
            :style="{ backgroundImage: `url(${img6})` }"
            data-year="未来 "
          >
            <div class="swiper-slide-content">
              <h4 class="timeline-title" id="left_title">“请党放心</h4>
              <h4 class="timeline-title">强国有我”</h4>
              <p class="timeline-text">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                习近平总书记强调：“要认真总结党史学习教育的成功经验，建立常态化长效化制度机制，不断巩固拓展党史学习教育成果。”新时代青年要深入学习党史，从百年党史这本丰厚的教科书中汲取前行的智慧和力量，做到学史明理、学史增信、学史崇德、学史力行，勇做走在时代前列的奋进者、开拓者、奉献者，书写“请党放心，强国有我”的青春华章。
              </p>
              <!-- <transition-group
                appear
                name="animate__animated animate__bounce"
                enter-active-class="animate__fadeInUp"
              >
              <button @click="isShowMain=true">开始学习</button>
              </transition-group> -->
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="warning" id="message_button" size="big" :style="{ opacity }"
                 @click="$emit('changePage1')"
                  >点我开始学习</el-button
                >
            </div>
          </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import $ from "jquery";
import "animate.css";
export default {
  name: "Start",
  data() {
    return {
      img1: require("../../assets/中共一大.jpg"),
      img1: require("../../assets/中共一大.jpg"),
      img1: require("../../assets/中共一大.jpg"),
      img2: require("../../assets/开国大典.jpg"),
      img3: require("../../assets/改革开放.jpg"),
      img4: require("../../assets/十八大.jpg"),
      img5: require("../../assets/建档百年1.jpg"),
      img6: require("../../assets/学习党史.png"),
      opacity:1
    };
  },
  props: {
    isShowFirst:Boolean,
    isShowStart:Boolean
  },
  mounted() {
  },
  methods: {

  },
  
};
$(function () {
  var timelineSwiper = new Swiper(".timeline .swiper-container", {
    direction: "vertical",
    loop: false,
    speed: 1600,
    pagination: ".swiper-pagination",
    paginationBulletRender: function (swiper, index, className) {
      var year = document
        .querySelectorAll(".swiper-slide")
        [index].getAttribute("data-year");
      return '<span class="' + className + '">' + year + "</span>";
    },
    paginationClickable: true,
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    breakpoints: {
      768: {
        direction: "hori  zontal",
      },
    },
  });
});
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  flex-direction: column;
    font-family: "Roboto Condensed", sans-serif;
  font-size: 18px;
}

.timeline {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 5px 25px 5px rgba(0, 0, 0, 0.2);
}
.timeline .swiper-container {
  height: 100vh;
  width: 100%;
  position: relative;
}
.timeline .swiper-wrapper {
  transition: 2s cubic-bezier(0.68, -0.4, 0.27, 1.34) 0.2s;
}
.timeline .swiper-slide {
  position: relative;
  color: #fff;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.timeline .swiper-slide::after {
  content: "";
  position: absolute;
  z-index: 1;
  right: -115%;
  bottom: -10%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: -230px 0 150px 60vw rgba(0, 0, 0, 0.7);
  border-radius: 100%;
}
.timeline .swiper-slide-content {
  position: absolute;
  text-align: center;
  width: 80%;
  max-width: 310px;
  right: 50%;
  top: 13%;
  transform: translate(50%, 0);
  font-size: 12px;
  z-index: 2;
}
.timeline .swiper-slide .timeline-year {
  display: block;
  font-size: 25px !important;
  margin-bottom: 50px;
  transform: translate3d(20px, 0, 0);
  color: orange;
  font-style: italic;
  font-weight: 300;
  opacity: 0;
  transition: 0.2s ease 0.4s;
}
.timeline .swiper-slide .timeline-title {
  font-weight: 100;
  font-size: 44px !important;
  text-align: right !important;
  margin: 0 0 30px;
  opacity: 0;
  transform: translate3d(20px, 0, 0);
  transition: 0.2s ease 0.5s;
}
.timeline .swiper-slide .timeline-text {
  line-height: 1.8;
  opacity: 0;
  transform: translate3d(20px, 0, 0);
  transition: 0.2s ease 0.6s;
  font-size: 14px;
}
.timeline .swiper-slide-active .timeline-year {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: 0.4s ease 1.6s;
}
.timeline .swiper-slide-active .timeline-title {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: 0.4s ease 1.7s;
}
.timeline .swiper-slide-active .timeline-text {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: 0.4s ease 1.8s;
}
.timeline .swiper-pagination {
  right: 15% !important;
  height: 100%;
  display: none;
  flex-direction: column;
  justify-content: center;
  font-style: italic;
  font-weight: 300;
  font-size: 18px;
  z-index: 1;
}
.timeline .swiper-pagination::before {
  content: "";
  position: absolute;
  left: -30px;
  top: 0;
  height: 100%;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.2);
}
.timeline .swiper-pagination-bullet {
  width: auto;
  height: auto;
  text-align: center;
  opacity: 1;
  background: transparent;
  color: #d4a024;
  margin: 15px 0 !important;
  position: relative;
}
.timeline .swiper-pagination-bullet::before {
  content: "";
  position: absolute;
  top: 8px;
  left: -32.5px;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: #d4a024;
  transform: scale(0);
  transition: 0.2s;
}
.timeline .swiper-pagination-bullet-active {
  color: #d4a024;
}
.timeline .swiper-pagination-bullet-active::before {
  transform: scale(1);
}
.timeline .swiper-button-next,
.timeline .swiper-button-prev {
  background-size: 20px 20px;
  top: 15%;
  width: 20px;
  height: 20px;
  margin-top: 0;
  z-index: 2;
  transition: 0.2s;
}
.timeline .swiper-button-prev {
  left: 8%;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23d4a024'%2F%3E%3C%2Fsvg%3E");
}
.timeline .swiper-button-prev:hover {
  transform: translateX(-3px);
}
.timeline .swiper-button-next {
  right: 8%;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23d4a024'%2F%3E%3C%2Fsvg%3E");
}
.timeline .swiper-button-next:hover {
  transform: translateX(3px);
}
@media screen and (min-width: 768px) {
  .timeline .swiper-slide::after {
    right: -30%;
    bottom: -8%;
    width: 240px;
    height: 50%;
    box-shadow: -230px 0 150px 50vw rgba(0, 0, 0, 0.7);
  }
  .timeline .swiper-slide-content {
    right: 30%;
    top: 50%;
    transform: translateY(-50%);
    width: 310px;
    font-size: 11px;
    text-align: left;
  }
  .timeline .swiper-slide .timeline-year {
    margin-bottom: 0;
    font-size: 32px;
  }
  .timeline .swiper-slide .timeline-title {
    font-size: 46px;
    margin: 0;
  }
  .timeline .swiper-pagination {
    display: flex;
  }
  .timeline .swiper-button-prev {
    top: 15%;
    left: auto;
    right: 15%;
    transform: rotate(90deg) translate(0, 10px);
  }
  .timeline .swiper-button-prev:hover {
    transform: rotate(90deg) translate(-3px, 10px);
  }
  .timeline .swiper-button-next {
    top: auto;
    bottom: 15%;
    right: 15%;
    transform: rotate(90deg) translate(0, 10px);
  }
  .timeline .swiper-button-next:hover {
    transform: rotate(90deg) translate(3px, 10px);
  }
}
@media screen and (min-width: 1024px) {
  .timeline .swiper-slide::after {
    right: -20%;
    bottom: -12%;
    width: 240px;
    height: 50%;
    box-shadow: -230px 0 150px 39vw rgba(0, 0, 0, 0.7);
  }
  .timeline .swiper-slide-content {
    right: 25%;
  }
}
#left_title {
  text-align: left !important;
}
#message_button {
  background-color: #30040A;

  min-width: 100px;
  min-height: 50px;
  font-size: 25px;
  color:#d4a024;
  cursor: pointer;
}
</style>
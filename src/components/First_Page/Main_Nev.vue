<template>
	<section>
		<div id="img1" @click="$emit('changePage4',0)"><img src="../../assets/images/pic1.jpg" alt="" /></div>
		<div id="img2" @click="$emit('changePage4',1)"><img src="../../assets/images/pic2.jpg" alt="" /></div>
		<div id="img3" @click="$emit('changePage4',2)"><img src="../../assets/images/pic3.jpg" alt="" /></div>
		<div id="img4" @click="$emit('changePage4',3)"><img src="../../assets/images/pic4.jpg" alt="" /></div>
		<!-- <div><img src="images/5.png" alt="" /></div>
			<div><img src="images/6.png" alt="" /></div> -->
	</section>
</template>

<script>
export default {
  name: "Main_Nev",
};
function clickedId(evt) {
			var curid;

			if (evt) {//非ie
				curid = evt.target.id;
			}

			else if (window.event) {//ie
				curid = window.event.srcElement.id;
			}

			return curid;
			console.log(curid);
		}

</script>

<style scoped>
section {
	/* 相对定位 */
	position: relative;
    top:65px;
    left:120px;
	width: 300px;
	height: 200px;
	/* 鼠标放到元素上变成小手 */
	cursor: pointer;
	/* 让子元素保留其3D位置 */
	transform-style: preserve-3d;
	/* 动画 名称 时长 linear 是匀速 播放 infinite 是无限次播放 */
	animation: rotate 50s linear infinite;
}
section:hover {
	/* 鼠标放到元素上停止动画 */
	animation-play-state: paused;
	
}
section div {
	/* 绝对定位 */
	position: absolute;
	left: 0;
	top: 0;
	width: 95%;
	height: 95%;
	text-align: center;
	border-radius: 20px;
	/* 设置元素的倒影效果 below 是倒影效果在元素下方 15px 是元素和倒影的距离 后面的属性和背景渐变色是一个属性 设置了一个从下到上由背景透明色过渡到设置了不透明度的白色 */
	-webkit-box-reflect: below 15px -webkit-linear-gradient(transparent 10%, rgba(255, 255, 255, 0.3));
}
/* section div:hover img{
	transform: scale(1.3,1.3);
} */
section div:hover{
	width: 98%;
	height: 98%;
}
section div img{
	width: 100%;
	height: 100%;
	border-radius: 20px;
}
/*调节translateZ参数
为元素到观察者的距离
*/
section div:nth-child(1) {
	transform: translateZ(155px);
	background-color: #c14c39;
}
section div:nth-child(2) {
	transform: rotateY(90deg) translateZ(155px);
	background-color: #6e9c72;
}
section div:nth-child(3) {
	transform: rotateY(180deg) translateZ(155px);
	background-color: #5e5f7a;
}
section div:nth-child(4) {
	transform: rotateY(270deg) translateZ(155px);
	background-color: #f5eb98;
}
/* section div:nth-child(5) {
	transform: rotateY(240deg) translateZ(300px);
	background-color: #50a3bc;
}
section div:nth-child(6) {
	transform: rotateY(300deg) translateZ(300px);
	background-color: #f9a99a;
} */
/* 先定义旋转动画 */
@keyframes rotate {
	0% {
		transform: rotateY(0);
	}
	100% {
		transform: rotateY(360deg);
	}
}

</style>
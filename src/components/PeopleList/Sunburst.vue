<template>
      <dialog-el :showWin.sync="show" width="1500" height="860">
      <!-- <div slot="title">人物迁徙图</div> -->
    </dialog-el>
</template>

<script>
export default {
    name:"Sunburst",
    props:{
        isShowSun:Boolean
    },
    data() {
        return {
            show: this.isShowSun,
        };
    },
    watch: {
        data(newValue, oldValue) {
            console.log("show的值被改变了")
        },
    },

}
</script>

<style>

</style>
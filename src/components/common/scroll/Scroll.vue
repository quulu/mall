<template>
    <!-- 
        ref/children: 通过父组件获取子组件
        + ref如果是绑定在组件中的，那么通过this.$refs.'refnamexxx'获取到的是一个组件对象。
        + ref如果是绑定在普通元素中，那么通过this.$refs.refname获取到的是一个元素对象
    -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name:"Scroll",
    data(){
        return {
            scroll: null
        }
    },
    mounted() {
    },
    updated() {
         // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
            probeType: 2,
            click:true 
        });
        // 2.监听滚动的位置
        this.scroll.on('scroll', (position) => {
            console.log(this.scroll);
            console.log(position);
        });
    }
}
</script>

<style scoped>
</style>

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
    props: {
        // 用来控制scroll是否进行实时监听滚动位置
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false 
        }
    },
    methods: {
        // 封装一个回到顶部方法，以供外面调用
        // backTo(x,y,time) {
        //     // 给time设置个默认值
        //     if (typeof time == null ) {
        //         time = 300;
        //     }
        //     this.scroll && this.scroll.scrollTo(x,y,time);
        // },
        // 封装一个回到顶部方法，以供外面调用
        scrollTo(x,y,time) {
            // 给time设置个默认值
            if (typeof time == null ) {
                time = 300;
            }
            this.scroll && this.scroll.scrollTo(x,y,time);
        },
        // 刷新图片
        refresh() {
            this.scroll && this.scroll.refresh();
        },
        // 完成上拉加载更多
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp();
            // this.scroll.refresh();
        },
        getScrollY() {
            return this.scroll ? this.scroll.y : 0;
        }
    },
    // 换到这里可以滚到底部
    // updated() {
    //     // 1.创建BScroll对象
    //     this.scroll = new BScroll(this.$refs.wrapper, {
    //         // 这个是设置div等元素，可以点击
    //         click:true,
    //         // 设置这个属性，才可以实时监听滚动的位置
    //         // probeType: 3，不使用会影响性能。
    //         probeType: this.probeType,
    //         // 上拉加载
    //         pullUpLoad: this.pullUpLoad,
    //     });

    //     // 2.监听滚动的位置
    //     this.scroll.on('scroll', (position) => {
    //         // 将实时的位置position传出去
    //         this.$emit('scrollPosition',position);
    //     });

    //     // 3.监听上拉加载更多事件 
    // },
    mounted() {
         // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
            // 这个是设置div等元素，可以点击
            click: true,
            // 设置这个属性，才可以实时监听滚动的位置
            // probeType: 3，不使用会影响性能。
            probeType: this.probeType,
            // 上拉加载
            pullUpLoad: this.pullUpLoad,
        });

        // 2.监听滚动的位置
        if (this.probeType === 2 || this.probeType === 3) {
                this.scroll.on('scroll', (position) => {
                // 将实时的位置position传出去
                this.$emit('scrollPosition',position);
            });
        }

        // 3.监听scroll滚动到底部
        if (this.pullUpLoad) {
            this.scroll.on('pullingUp',() => {
                this.$emit('pullingUp');
            });
        }

    }
}
</script>

<style scoped>
</style>

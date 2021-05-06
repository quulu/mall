<template>
    <div class="tab-bar-item" @click="itemClick">
        <!-- 具名插槽 -->
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle" >
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:"TabBarItem",
    props: {
        link: String,
        activeColor: {
            type: String,
            default: 'red'
        }
    },
    // data
    data() {
        return {
            // isActive: true
        }
    },
    computed: {
        // 用于动态判断当前选中的是哪个
        // /home -> item(/home) = true
        // /home -> item(/category) = false
        // /home -> item(/cart) = false
        // /home -> item(/profile) = false
        isActive() {
            return this.$route.path.indexOf(this.link) !== -1; 
        },
        // 动态绑定样式  别人决定tabBar的选中样式
        activeStyle() {
            return this.isActive ? {color: this.activeColor} : {}
        }
    },
    methods: {
        // 点击控制跳转
        itemClick() {
            this.$router.replace(this.link);
        }
    }
}
</script>

<style scoped>
.tab-bar-item {
    flex: 1;
    height: 49px;
    text-align: center;

    font-size: 14px;
}
.tab-bar-item img {
    /* 去掉图片下面的3像素 */
    vertical-align: middle;
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
}
/* .active {
    color: red;
} */
</style>
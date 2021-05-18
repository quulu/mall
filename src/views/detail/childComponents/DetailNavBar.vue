<template>
    <div>
        <nav-bar>
            <div slot="center" class="center">
                <div v-for="(item, index) in titles"                    
                class="center-item"
                :class="{active: index === currentIndex}"
                @click="centerItemClick(index)">
                    {{item}}
                </div>
            </div>
            <div slot="left" class="left" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name: "DetailNavBar",
    data() {
        return {
            titles: ["商品","参数","评论","推荐"],
            currentIndex: 0
        }
    },
    components: {
        NavBar
    },
    methods: {
        centerItemClick(index) {
            this.currentIndex = index;

            // 点击的事件发出去
            this.$emit('titleClick',index);
        },
        backClick() {
            console.log("点击了返回按钮");
            this.$router.back();
            // this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.center {
    display: flex;
}
.center-item {
    flex: 1;
}
.left {
    position: relative;
    height: 100%;
    width: 100%;
} 
.left img {
    /* margin-top: 11px; */
    position:absolute; 
    top:0; 
    bottom:0; 
    margin:auto 0;
}
.active {
    color: var(--color-high-text);
}
</style>
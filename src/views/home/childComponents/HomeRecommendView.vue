<template>
    <div class="recommend">
        <div v-for="item in recommends" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "HomeRecommendView",
    props: {
        recommends: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style scoped>
.recommend {
    display: flex;
    width: 100%;
    /* 让图片居中 */
    text-align: center;
    /* 设置字体大小 */
    font-size: 12px;
    /* 上  左右  下 */
    padding: 15px 0 20px;
    /* 下面那个灰色的间距 */
    border-bottom: 10px solid #eee;
}
.recommend-item {
    flex: 1;
}
.recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 8px;
}

</style>
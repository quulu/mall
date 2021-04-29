<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners"></home-swiper>
        <home-recommend-view :recommends="recommends" />
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComponents/HomeSwiper'
import HomeRecommendView from './childComponents/HomeRecommendView'

import { getHomeMultidata, testReq } from 'network/homeRequest'

export default {
    name: "Home",
    data() {
        return {
          banners: [],
          recommends:[]
        }
    },
    components: {
        NavBar,
        HomeSwiper,
        HomeRecommendView
    },
    // 生命周期函数：组件一旦创建
    created() {
        // 1.请求多个数据
        getHomeMultidata().then(res => {
            console.log('home',res);
            // this.data = res;
            this.banners = res.data.data.banner.list;
            this.recommends = res.data.data.recommend.list;
        }).catch(err => {
            console.log(err);
        });

        // 2.测试req
        // testReq().then(res => {
        //     console.log('test',res);
        // }).catch(err => {

        // });
    }
}
</script>

<style>
.home-nav {
    background-color: var(--color-tint);
    color: white
}
</style>

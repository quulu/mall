<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" 
                        @titleClick="navTitleClick"
                        ref="nav"/>
        <scroll class="detail-scroll-content"
                ref="scroll"
                :probe-type="3"
                @scrollPosition="contentScroll">
            <detail-swiper :topImages="topImages"></detail-swiper>
            <detail-base-info :goods="goodsInfo"></detail-base-info>
            <detail-shop-info :shopInfo="shopInfo">
            </detail-shop-info>
            <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info> 
            <detail-comment ref="comment" :commentInfo="commentInfo" class="detail-comment"/>
            <goods-list ref="recommend" :goods="recommends"></goods-list>
            <ul>
                <li>内容1</li>
                <li>内容2</li>
                <li>内容3</li>
                <li>内容4</li>
                <li>内容5</li>
                <li>内容6</li>
                <li>内容7</li>
                <li>内容8</li>
                <li>内容9</li>
                <li>内容10</li>
                <li>内容11</li>
                <li>内容12</li>
                <li>内容13</li>
                <li>内容14</li>
                <li>内容15</li>
                <li>内容16</li>
                <li>内容17</li>
                <li>内容18</li>
                <li>内容19</li>
                <li>内容20</li>
                <li>内容1</li>
                <li>内容2</li>
                <li>内容3</li>
                <li>内容4</li>
                <li>内容5</li>
                <li>内容6</li>
                <li>内容7</li>
                <li>内容8</li>
                <li>内容9</li>
                <li>内容10</li>
                <li>内容11</li>
                <li>内容12</li>
                <li>内容13</li>
                <li>内容14</li>
                <li>内容15</li>
                <li>内容16</li>
                <li>内容17</li>
                <li>内容18</li>
                <li>内容19</li>
                <li>内容20</li>
            </ul>
        </scroll>
        <detail-bottom-bar @addCart="addCart"/>
        <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailComment from './childComponents/DetailComment'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './childComponents/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
// import BackTop from 'components/content/backTop/backTop'
// import {BACK_POSITION} from 'common/const'

import { getDetailDataApi, Goods, Shop, ParamInfo, getDetailRecommendApi} from 'network/detailApi'
// import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
    name:"Detail",
    data() {
        return {
            iid: null,
            topImages: [],
            goodsInfo: {},
            shopInfo: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends:[],
            // itemImgListener:null
            themeTopYs:[],
            currentIndex: 0,
            isShowBackTop: false
        }
    },
    mixins: [itemListenerMixin,backTopMixin],
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailComment,
        GoodsList,
        DetailBottomBar,
        // BackTop
    },
    created() {
        // 1.保存传入的iid
        this.iid = this.$route.query.iid;
        // this.iid = this.$route.params.iid;

        // 2.根据iid进行封装
        this.getDetailData();

        // 3.请求推荐数据
        this.getRecommendData();
    },
    // actived() {
    //     // 可以将详情页保持keep-alive,但是请求数据放到这里，也会保持更新
    // },
    mounted() {
        // console.log("mounted",this.$refs.scroll);
        this.$refs.scroll.refresh();
        
        // 监听详情页推荐数据加载完成
        // 1.图片加载完成的事件监听
        // 要进行防抖，不然太频繁了
        // 此时的refresh虽然是局部变量，但是闭包。
        // const refresh = debounce(this.$refs.scroll.refresh,100);
        // this.$bus.$on('detailItemImgLoad', () => {
        //     refresh()
        // });

        // 对监听的事件进行保存  ===> 用混入代替了
        // const refresh = debounce(this.$refs.scroll.refresh,100);
        // this.itemImgListener = () => {
        //     refresh(20, 30, 'abc');
        // }
        // this.$bus.$on('itemImgLoad',this.itemImgListener);
    },
    updated() {
        // 1. 拿到商品 参数 评论  推荐的offsetTop
        // this.themeTopYs = [];

        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log("输出offsetTop",this.themeTopYs);
    },
    destroyed() {
        // 取消监听保存
        this.$bus.$off('itemImgLoad',this.itemImgListener); 
    },
    methods: {
        /* 监听事件 */
        imageLoad() {
            this.$refs.scroll.refresh() 

            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            // 再给themeTopYs添加一个最大值，为了后面的hack方法
            this.themeTopYs.push(Number.MAX_VALUE);
            // console.log("输出offsetTop",this.themeTopYs);
        },
        navTitleClick(index) {
            // console.log("详情页导航栏的title点击",index);
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100);
        },
        contentScroll(position) {
            // 1.获取y值 
            const positionY = -position.y;

            // 2.positionY和主题中值进行对比
            // [0, 7938, 9120, 9452]
            // positonY在 大于等于0 和 7938之间， index = 0
            // positonY在 大于等于7938 和 9120之间， index = 1
            // positonY在 大于等于9120 和 9452之间， index = 2
            // positonY在 大于等于9452 ， index = 3
            // let len = this.themeTopYs.length;
            // for (let i = 0; i < len; i++) {
            //     const themeTopY = this.themeTopYs[i];
            //     const nextThemeTopY = this.themeTopYs[i+1];
            //     if (this.currentIndex !== i && ((i < len-1 && positionY >= themeTopY && positionY < nextThemeTopY) || (i === len - 1 && positionY >= themeTopY))) {
            //         this.currentIndex = i;
            //         this.$refs.nav.currentIndex = this.currentIndex;
            //         console.log(i);
            //     }
            // }

            // 3.hack做法 简化判断条件
            // [0, 7938, 9120, 9452, Number.MAX_VALUE]
            // positonY在 大于等于0 和 7938之间， index = 0
            // positonY在 大于等于7938 和 9120之间， index = 1
            // positonY在 大于等于9120 和 9452之间， index = 2
            // positonY在 大于等于9452 和 最大值之间， index = 3

            // this.themeTopYs.push(Number.MAX_VALUE);
            let length = this.themeTopYs.length;
            for (let i = 0; i < length-1; i++) {
                if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex;
                     console.log(i);
                }
            }
            
            // 4.是否显示回到顶部
            // this.isShowBackTop = (-position.y > BACK_POSITION);
            // 调用mixin封装的方法
            this.listenShowBackTop(position)
        },
        // 点击的时候 回到顶部 => 抽取到mixin中
        // backTopClick() {
        //     this.$refs.scroll.scrollTo(0,0,300);
        // },

        /* 请求数据 */
        getDetailData() {
            // 2.根据iid进行封装
            getDetailDataApi(this.iid).then(res => {
                // console.log("输出详情页",res);
                // 1.获取顶部的图片轮播数据
                // this.topImages= res.result.itemInfo.topImages;
                this.topImages = [{
                    image: "https://img.alicdn.com/imgextra/i3/400677031/O1CN01Blah2d21oFPM4BaBI_!!400677031.jpg_640x640q80_.webp"
                },
                {
                    image: "https://img.alicdn.com/imgextra/i3/400677031/O1CN018DDUNh21oFPNObGe3_!!400677031.jpg_640x640q80_.webp"
                },{
                    image: "https://img.alicdn.com/imgextra/i1/400677031/O1CN01LjQXKV21oFPIezD8D_!!400677031.jpg_640x640q80_.webp"
                }];

                // 2.获取商品的信息
                // this.goodsInfo = new Goods(res.result.itemInfo,res.result.itemInfo.columns,res.result.itemInfo.services);
                this.goodsInfo = new Goods({
                    title: "原创森女部落甜酷小黑裙背带裙a字裙气质小裙子2021年新款女裙系",
                    desc: "新款上市~",
                    newPrice: "38.5",
                    oldPrice: "69.9",
                    realPrice: "38.50",
                    discount: "活动价"
                },["销量 1580","收藏33人","72小时发货"],[{icon:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2072394193,3352991199&fm=26&gp=0.jpg",name:"退货补运费"},{icon:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2072394193,3352991199&fm=26&gp=0.jpg",name:"全国包邮"},{icon:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2072394193,3352991199&fm=26&gp=0.jpg",name:"7天无理由退货"}]);

                // 3.店铺信息
                this.shopInfo = new Shop({
                    logo: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=11918710,2392753884&fm=26&gp=0.jpg",
                    name: "米米的小店铺",
                    fans: "6000",
                    sells: "20000",
                    score: [{
                        isBetter: false,
                        name: "描述相符",
                        score: 4.64
                    },{
                        isBetter: true,
                        name: "价格合理",
                        score: 5.00
                    },{
                        isBetter: false,
                        name: "质量满意",
                        score: 4.62
                    }],
                    goodsCount: "99"
                });
                
                // 4.保存商品的详情信息
                //商品详细信息
                // this.detailInfo = data.detailInfo;
                this.detailInfo = {
                    desc: "商品的描述如下：腰围可调节大小,高腰显瘦",
                    detailImage:{
                        0: {
                            list: [
                                "https://img.alicdn.com/imgextra/i2/400677031/O1CN01rVlh4Q21oFPEVKrLJ_!!400677031.jpg_640x0q80_.webp",
                                "https://img.alicdn.com/imgextra/i1/400677031/O1CN01zVxwMl21oFPIoBk0R_!!400677031.jpg_640x0q80_.webp",
                                "https://img.alicdn.com/imgextra/i2/400677031/O1CN01M3XPDl21oFPKeeSsh_!!400677031.jpg_640x0q80_.webp"
                            ]
                        }
                    }
                }

                //5.商品参数信息
                // this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
                this.paramInfo = new ParamInfo({
                    name: "腰围可调节大小,高腰显瘦",
                    images: ["https://img.alicdn.com/imgextra/i4/400677031/O1CN01DlHF4u21oFOz1GyhL_!!400677031.jpg_640x0q80_.webp"],
                    set: [],
                    tables:[] 
                });

                // 6.评论信息
                // if (data.rate,cRate !== 0) {
                //     // this.commentInfo = res.data.rate.list[0];
                //     this.commentInfo = {
                //         user: {
                //             avatar:"https://gw.alicdn.com/tfs/TB1vzauhhrI8KJjy0FpXXb5hVXa-80-80.png_88x88q90_.webp",
                //             uname: "浅xxxx的小桃"
                //         },
                //         content: "裙子太好看了，腰线那边设计的很赞。不过还是跟喜欢能调节的肩带，衣服老是要往前面跑，所以自己把肩带又钉了一点进去",
                //         created: "1535694719",
                //     }
                // }

                this.commentInfo = {
                    user: {
                        avatar:"https://gw.alicdn.com/tfs/TB1vzauhhrI8KJjy0FpXXb5hVXa-80-80.png_88x88q90_.webp",
                        uname: "浅xxxx的小桃"
                    },
                    content: "裙子太好看了，腰线那边设计的很赞。不过还是跟喜欢能调节的肩带，衣服老是要往前面跑，所以自己把肩带又钉了一点进去",
                    created: "1535694719",
                }

                // 1.第一次获取的值不对
                // 值不对的原因：this.$refs.params.$el没有渲染
                // this.themeTopYs = [];
                // this.themeTopYs.push(0);
                // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                // console.log("输出offsetTop",this.themeTopYs);

                // 等着前面的东西渲染完了
                // this.$nextTick(() => {
                //     // 2.第二次获取：值不对
                //     // 值不对的原因：因为图片没有计算进去
                //     // 根据最新的数据，对应的DOM是已经被渲染出来了
                //     // 但是图片依然是没有加载完（目前获取到的offsetTop不包含其中的图片）
                //     // offsetTop值不对的时候，都是因为图片的问题
                //     this.themeTopYs = [];

                //     this.themeTopYs.push(0);
                //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                //     console.log("输出offsetTop",this.themeTopYs);
                // });

            });
        },
        getRecommendData() {
            getDetailRecommendApi().then(res => {
                // 7.推荐数据
                this.recommends = res.data.list;
            });
        }
    } 
}
</script>

<style scoped>
#detail {
    height: 100vh;
    position: relative;
    /* 比tabBar的z-index高一点就可以隐藏tabBar */
    z-index: 99;
    background-color: #fff;
}
.detail-nav {
    position: relative;
    z-index: 999;
    background-color: #fff;
}
.detail-scroll-content {
    /* margin-top: 44px; */
    /* height: calc(100% - 44px - 49px); */

    background-color: #fff;
    z-index: 99;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 58px;

    /* overflow: hidden; */
}

</style>
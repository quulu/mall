<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"/>
        <scroll class="detail-scroll-content"
                ref="scroll">
            <detail-swiper :topImages="topImages"></detail-swiper>
            <detail-base-info :goods="goodsInfo"></detail-base-info>
            <detail-shop-info :shopInfo="shopInfo">
            </detail-shop-info>
            <detail-param-info :paramInfo="paramInfo"></detail-param-info>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        </scroll>
    </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'

import Scroll from 'components/common/scroll/Scroll'

import { getDetailDataApi, Goods, Shop, ParamInfo} from 'network/detailApi'


export default {
    name:"Detail",
    data() {
        return {
            iid: null,
            topImages: [],
            goodsInfo: {},
            shopInfo: {},
            detailInfo: {},
            paramInfo: {}
        }
    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo
    },
    created() {
        // 1.保存传入的iid
        this.iid = this.$route.query.iid;
        // this.iid = this.$route.params.iid;

        // 2.根据iid进行封装
        this.getDetailData();

        console.log("created",this.$refs.scroll);
    },
    actived() {
        // 可以将详情页保持keep-alive,但是请求数据放到这里，也会保持更新
        
    },
    mounted() {
        console.log("mounted",this.$refs.scroll);
        this.$refs.scroll.refresh();
    },
    methods: {
        /* 监听事件 */
        imageLoad() {
            this.$refs.scroll.refresh() 
        },

        /* 请求数据 */
        getDetailData() {
            // 2.根据iid进行封装
            getDetailDataApi(this.iid).then(res => {
                console.log("输出详情页",res);
                // 1.获取顶部的图片轮播数据
                // this.topImages= res.result.itemInfo.topImages;
                this.topImages = [
                    {
                    image: "https://img.alicdn.com/imgextra/i3/71181273/O1CN01h79dMN1LH4rcoZOtE_!!71181273.jpg_400x400.jpg",
                    title: "邹邹小个子碎花连衣裙女春2021年新款法式复古收腰长款吊带裙子",
                    collect: "10",
                    price:"34.00",
                    iid: "2"
                    },{
                    image: "https://img.alicdn.com/imgextra/i1/71181273/O1CN01YoKNPU1LH4rbx20UZ_!!71181273.jpg_400x400.jpg",
                    title: "图片1",
                    collect: "9",
                    price:"314.00",
                    iid: "3"
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
                    fans: "100百万粉丝",
                    sells: "200百万",
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

                //商品参数信息
                // this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
                this.paramInfo = new ParamInfo({
                    name: "腰围可调节大小,高腰显瘦",
                    images: ["https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2072394193,3352991199&fm=26&gp=0.jpg"],
                    set: [],
                    tables:[] 
                });
            });
        }
    } 
}
</script>

<style scoped>
#detail {
    height: 100vh;
    position: relative;
    z-index: 99;
    background-color: #fff;
}
.detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.detail-scroll-content {
    /* margin-top: 44px; */
    height: calc(100% - 44px);
  
    /* position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0; */

    /* overflow: hidden; */
}
</style>
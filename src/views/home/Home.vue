<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <scroll class="scroll-content">
          <home-swiper :banners="banners" ref="swiper"></home-swiper>
          <home-recommend-view :recommends="recommends" />
          <home-feature />
          <tab-control :titles="titles" class="tab-control" @itemClick="tabControlItemClick"></tab-control>
          <goods-list :goods="showGoodsList" @itemImageLoad="itemImageLoad"></goods-list>
        </scroll>
    </div>
</template>

<script>
// 公共
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

// 子业务组件
import HomeSwiper from './childComponents/HomeSwiper'
import HomeRecommendView from './childComponents/HomeRecommendView'
import HomeFeature from './childComponents/HomeFeature'

// 请求
import { 
    getHomeMultidata,
    getHomeGoodsData,
    testReq,
} from 'network/homeRequest'

export default {
    name: "Home",
    data() {
        return {
          banners: [],
          recommends:[],
          titles:["流行","新款","精选"],
          currentType: 'pop',
        //   currentIndex: 1,
          goods: {
            //   'pop': { page: 0,list:[] },
              'pop': { page: 0,
                list:[
                  {
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片1",
                  collect: "45",
                  price:"12.00"
                },{
                  image: "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3228549874,2173006364&fm=26&gp=0.jpg",
                  title: "图片1",
                  collect: "10",
                  price:"34.00"
                },{
                  image: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3848402655,92542552&fm=26&gp=0.jpg",
                  title: "图片1",
                  collect: "9",
                  price:"314.00"
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片1",
                  collect: "58",
                  price:"4.00"
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片1",
                  collect: "12",
                  price: "67"
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片1",
                  collect: "25",
                  price: "89"
                },] },
              'new': { page: 0, list:[
                  {
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片2",
                  collect: "45",
                  price:"12.00"
                },{
                  image: "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3228549874,2173006364&fm=26&gp=0.jpg",
                  title: "图片2",
                  collect: "10",
                  price:"34.00"
                },{
                  image: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3848402655,92542552&fm=26&gp=0.jpg",
                  title: "图片2",
                  collect: "9",
                  price:"314.00"
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片2",
                  collect: "58",
                  price:"4.00"
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片2",
                  collect: "12",
                  price: "67"
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片2",
                  collect: "25",
                  price: "89"
                },]  },
              'sell': { page: 0, list:[
                  {
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片3",
                  collect: "45",
                  price:"12.00"
                },{
                  image: "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3228549874,2173006364&fm=26&gp=0.jpg",
                  title: "图片3",
                  collect: "10",
                  price:"34.00"
                },{
                  image: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3848402655,92542552&fm=26&gp=0.jpg",
                  title: "图片3",
                  collect: "9",
                  price:"314.00"
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片3",
                  collect: "58",
                  price:"4.00"
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片3",
                  collect: "12",
                  price: "67"
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片3",
                  collect: "25",
                  price: "89"
                },]  }
          }
        }
    },
    computed: {
        showGoodsList() {
            return this.goods[this.currentType].list;
        }
    },
    components: {
        NavBar,
        TabControl,
        Scroll,
        GoodsList,
        HomeSwiper,
        HomeRecommendView,
        HomeFeature
    },
    // 生命周期函数：组件一旦创建
    created() {
        // 1.请求多个数据
        this.getHomeMultidataMethod();
        // 2. 请求商品数据
        this.getHomeGoodsDataMethod('pop');
        this.getHomeGoodsDataMethod('new');
        this.getHomeGoodsDataMethod('sell');
        // 测试
        // this.testApi();
    },
    mounted() {
      // this.$refs.swiper
    },
    methods: {
        /**
         * 网络请求相关的方法
         */
        getHomeMultidataMethod() {
            getHomeMultidata().then(res => {
                // banner数据 recommen热门推荐数据
                this.banners = res.data.data.banner.list;
                this.recommends = res.data.data.recommend.list;
            }).catch(err => {
                // console.log('homeMultiData',err);
            });
        },
        getHomeGoodsDataMethod(type) {
            const currentPage = this.goods[type].page + 1;
            getHomeGoodsData(type,currentPage).then(res => {
                // console.log(res);
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page += 1;
            }).catch(err => {
                // console.log('goods err',err);
            });
        },
        //测试
        testApi() {
            testReq().then(res => {
                console.log("测试数据",res);
            }).catch(err => {
                console.log("测试错误",err);
            });
        },
        /**
         *  事件监听相关方法
         */ 
        tabControlItemClick(index) {
            // 根据index,选出类型
              this.currentType = Object.keys(this.goods)[index];
            // console.log('dfsfsd',index,Object.keys(this.goods),this.currentType);
        },
        // itemImageLoad() {
        //   this.$bus.$on('itemImageLoad', () => {
        //     console.log('-----')
        //     this.$refs.scroll.scroll.refresh()
        //   })
        // }
        
    }
}
</script> 

<style scoped>
#home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
}
.home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
}
.tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
}
/* scroll 封装的scroll */
.scroll-content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

</style>

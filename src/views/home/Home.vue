<template>
    <div id="home">
        <!-- 导航栏 -->
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>

        <!-- better-scroll  -->
        <!-- scroll的props中，驼峰命名的，在这里需要用probe-type来传值,并且前面要有冒号，才是传递的值 @scrollPosition是scroll组件传出的实时的position -->
        <scroll 
        class="scroll-content" 
        ref="scroll" 
        :probe-type="3"
        @scrollPosition="scrollPosition"
        @pullingUp="loadMore" >
          <home-swiper :banners="banners" ref="swiper"></home-swiper>
          <home-recommend-view :recommends="recommends" />
          <home-feature />
          <tab-control :titles="titles" class="tab-control" @itemClick="tabControlItemClick"></tab-control>
          <!-- <goods-list :goods="showGoodsList" @itemImageLoad="itemImageLoad"></goods-list> -->
          <goods-list :goods="showGoodsList" ></goods-list>
        </scroll>

        <!-- 滚动到顶部 
        修饰符 .native什么时候使用？
        + 在我们需要监听一个组件的原生事件时，必须给对应的事件加上 .native修饰符，才能进行监听。   
        -->
        <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
// 公共
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/backTop'

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
          // 是否显示回到顶部按钮
          isShowBackTop: false,
          titles:["流行","新款","精选"],
          currentType: 'pop',
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
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片1",
                  collect: "25",
                  price: "89"
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
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片2",
                  collect: "25",
                  price: "89"
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
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片3",
                  collect: "25",
                  price: "89"
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片3",
                  collect: "25",
                  price: "89"
                },]  }
          }
        }
    },
    components: {
        NavBar,
        TabControl,
        Scroll,
        GoodsList,
        HomeSwiper,
        HomeRecommendView,
        HomeFeature,
        BackTop
    },
    computed: {
        showGoodsList() {
            return this.goods[this.currentType].list;
        }
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
              let obj = {
                  image: "https://user-gold-cdn.xitu.io/2020/7/18/1735ffe524331a74?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1",
                  title: "图片000000",
                  collect: "999999",
                  price:"8888.00"
                };
                this.goods[type].list.push(obj);
                // this.goods[type].list.push(...res.data.list);
                this.goods[type].page += 1;

                this.$refs.scroll.finishPullUp();
                
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
        },
        backTopClick() {
          this.$refs.scroll.backTo(0,0,300);
        },
        scrollPosition(position) {
          console.log(position);
          this.isShowBackTop = (-position.y > 300)
        },
        // 加载更多
        loadMore() {
          this.getHomeGoodsDataMethod(this.currentType);
        }

        // itemImageLoad() {
        //   this.$bus.$on('itemImageLoad', () => {
        //     console.log('-----')
        //     this.$refs.scroll.scroll.refresh()
        //   })
        // }
    }
}

/* 

*/
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

/* .scroll-content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */

</style>

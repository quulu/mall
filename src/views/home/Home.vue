<template>
    <div id="home">
        <!-- 导航栏 -->
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control  :titles="titles" 
                      class="tab-control"
                      @itemClick="tabControlItemClick"
                      ref="tabControl2"
                      v-show="isTabControlFixed"></tab-control>
        <!-- better-scroll  -->
        <!-- scroll的props中，驼峰命名的，在这里需要用probe-type来传值,并且前面要有冒号，才是传递的值 @scrollPosition是scroll组件传出的实时的position -->
        <scroll class="scroll-content" 
                ref="scroll" 
                :probe-type="3"
                :pull-up-load="true"
                @scrollPosition="scrollPosition"
                @pullingUp="loadMore">
          <home-swiper :banners="banners" 
                       ref="swiper"
                       @swiperImageLoad="swiperImageLoad"></home-swiper>
          <home-recommend-view :recommends="recommends" />
          <home-feature />
          <tab-control :titles="titles" 
                       @itemClick="tabControlItemClick"
                       ref="tabControl1"></tab-control>
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
// import BackTop from 'components/content/backTop/backTop'
// import { debounce } from 'common/utils'
import { itemListenerMixin, backTopMixin } from 'common/mixin'
// import { BACK_POSITION } from 'common/const'

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
                  image: "https://gw.alicdn.com/bao/upload/i2/6000000006696/O1CN01ZnDBiQ1zKoj2N9JsT_!!6000000006696-0-yinhe.jpg_Q75.jpg_.webp",
                  title: "原创森女部落甜酷小黑裙背带裙a字裙气质小裙子2021年新款女裙系",
                  collect: "45",
                  price:"99.00",
                  iid: "1"
                },{
                  image: "https://img.alicdn.com/bao/upload///img.alicdn.com/bao/upload/O1CN01IWrG8S1XhR2lyMWpr_!!6000000002955-0-yinhe.jpg_Q75.jpg_.webp",
                  title: "邹邹小个子碎花连衣裙女春2021年新款法式复古收腰长款吊带裙子",
                  collect: "10",
                  price:"69.00",
                  iid: "2"
                },{
                  image: "https://g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i2/31935135/O1CN01K4JcH51nnsSFnO8s6_!!0-saturn_solar.jpg_360x360Q90.jpg_.webp",
                  title: "2021年春秋装韩版新款时尚宽松显瘦圆领蕾丝上衣休闲百搭卫衣女潮",
                  collect: "9",
                  price:"78.00",
                  iid: "3"
                },{
                  image: "https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/4138923936/O1CN012XkCej1ewjar6koPt_!!4138923936.jpg_360x360Q90.jpg_.webp",
                  title: "春季薄款外套女潮ins2021春秋新款学生初春宽松大码情侣装风衣夏",
                  collect: "58",
                  price:"98.00",
                  iid: "4"
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片1",
                  collect: "12",
                  price: "89",
                  iid: "5"
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片1",
                  collect: "25",
                  price: "89",
                  iid: "6"
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片1",
                  collect: "25",
                  price: "89",
                  iid: "7"
                },{
                  image: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2496571732,442429806&fm=26&gp=0.jpg",
                  title: "图片1",
                  collect: "25",
                  price: "89",
                  iid: "8"
                },] },
              'new': { page: 0, list:[
                  {
                  image: "https://img.alicdn.com/imgextra/i2/2201470828016/O1CN01QJslRw295NWToGubM_!!2201470828016.jpg_640x640q80_.webp",
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
          },
          tabControlOffsetTop:0,
          isTabControlFixed: false,
          saveY: 0,
          // itemImgListener: null
        }
    },
    mixins: [itemListenerMixin,backTopMixin],
    components: {
        NavBar,
        TabControl,
        Scroll,
        GoodsList,
        HomeSwiper,
        HomeRecommendView,
        HomeFeature,
        // BackTop
    },
    computed: {
        showGoodsList() {
            return this.goods[this.currentType].list;
        }
    },
    methods: {
        /**
         *  事件监听相关方法
         */ 
        tabControlItemClick(index) {
            // 根据index,选出类型
            this.currentType = Object.keys(this.goods)[index];
            // 让scroll中的tabControl和另外添加的tabControl的选中的统一起来
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        // 抽取到了mixin里面
        // backTopClick() {
        //   this.$refs.scroll.scrollTo(0,0,300);
        // },
        scrollPosition(position) {
          // 1.判断我们的backTop是否显示
          // this.isShowBackTop = (-position.y > BACK_POSITION);
          this.listenShowBackTop(position);
          
          // 2.决定tabControl是否吸顶（position:fixed）
          this.isTabControlFixed = (-position.y > this.tabControlOffsetTop);
        },
        // 加载更多
        loadMore() {
          this.getHomeGoodsDataMethod(this.currentType)
        },
        swiperImageLoad() {
          // 2.获取tabControl的offsetTop
          // 所有的组件都有一个属性$el: 用于获取组件中的元素
          // 轮播图图片加载完成，则可以拿到这个offsetTop 
          this.tabControlOffsetTop = this.$refs.tabControl1.$el.offsetTop;
        },

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
              if (this.goods[type].page >= 4) {
                console.log("当前页数是",this.goods[type].page);
                  return 
              }

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
      // 1.图片加载完成的事件监听
      // 要进行防抖，不然太频繁了
      // 此时的refresh虽然是局部变量，但是闭包。
      // const refresh = debounce(this.$refs.scroll.refresh,100);
      // this.$bus.$on('homeItemImgLoad', () => {
      //   refresh()
      // });

      // 对监听的事件进行保存
      // const refresh = debounce(this.$refs.scroll.refresh,100);
      // this.itemImgListener = () => {
      //   refresh(20, 30, 'abc');
      // }
      // this.$bus.$on('itemImgLoad',this.itemImgListener);

    },
    destroyed() {
      console.log('Home destroyed');
    },
    actived() {
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh();
    },
    deactived() {
      // 1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY();

      // 2.取消全局事件的监听
      // this.$bus.$off('homeItemImgLoad',函数);
      this.$bus.$off('itemImgLoad',this.itemImgListener);
    },
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

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动，但是现在是better-scroll 无需设置 */
    /* position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9; */
}
.tab-control {
  /* 设置相对定位，就可以不改变位置，设置z-index了 */
  position: relative;
  z-index: 1100;
}
/* 现在不起作用了 */
/* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
} */

/* scroll 封装的scroll */
.scroll-content {
  overflow: hidden;
  background-color: #ffffff;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;

  z-index: 9;
}

/* .scroll-content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */

</style>

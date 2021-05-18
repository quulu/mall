import { debounce } from 'common/utils'
import { BACK_POSITION } from 'common/const'
import BackTop from 'components/content/backTop/backTop'

// 监听图片加载完成的Mixin
export const itemListenerMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            itemImgListener: null
        }
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
      const refresh = debounce(this.$refs.scroll.refresh,100);
      this.itemImgListener = () => {
        refresh(20, 30, 'abc');
      }
      this.$bus.$on('itemImgLoad',this.itemImgListener);
    }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        // 点击的时候 回到顶部
        backTopClick() {
            this.$refs.scroll.scrollTo(0,0,300);
        },
        listenShowBackTop(position) {
            this.isShowBackTop = (-position.y > BACK_POSITION);
        }
    }
    
}

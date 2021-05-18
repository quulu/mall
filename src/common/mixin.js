import { debounce } from 'common/utils'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    // components: {},
    // methods: {},
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
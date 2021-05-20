<template>
    <div id="cart">
        <!-- 导航 -->
        <cart-nav-bar class="cart-nav-bar" />

        <!-- 商品的列表 -->
        <scroll class="scroll-content" ref="scroll">
            <cart-list :cartList="cartList" />
        </scroll>

        <!-- 底部汇总 -->
        <cart-bottom-bar class="bottom-bar"/>
    </div>
</template>

<script>
import CartNavBar from './childComponents/CartNavBar'
import CartList from './childComponents/CartList'
import CartBottomBar from './childComponents/CartBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import {mapGetters} from 'vuex'

export default {
    name: "Cart",
    components: {
        CartNavBar,
        Scroll,
        CartList,
        CartBottomBar
    },
    computed: {
        ...mapGetters({
            cartList: 'getCartList'
        }) 
    },
    actived() {
        // 刷新数据
        this.$refs.scroll.refresh();
    }
}
</script>

<style scoped> 
#cart {
    height: 100vh;
}
.cart-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
}
.scroll-content {
    overflow: hidden;
    background-color: #fff;

    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;

    /* z-index: 9; */
}
.bottom-bar {
    position: fixed;
    bottom: 49px;
    width: 100%;
}
</style>

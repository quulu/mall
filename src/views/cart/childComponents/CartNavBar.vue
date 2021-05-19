<template>
    <div class="cart-nav-bar">
        <nav-bar>
            <div slot="center" class="nav-title">购物车{{cartLength}}</div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/NavBar'

import {mapGetters} from 'vuex'

export default {
    name:"CartNavBar",
    components: {
        NavBar
    },
    computed: {
        // 使用对象展开运算符 将getter 混入 computed 对象中
        // ...mapGetters([
        //     'getCartLength', 
        //     'getCartList'
        // ])

        // 使用对象
        ...mapGetters({
            cartLength: 'getCartLength',
            cartList: 'getCartList'
        }) 
    }
}
</script>

<style scoped>
.nav-title {
    background-color: var(--color-tint);
}
</style>
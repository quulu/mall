<template>
    <div class="cart-list">
        <cart-list-item v-for="item in cartList" :product="item"/>
    </div>
</template>

<script>
import CartListItem from './CartListItem'

export default {
    name: "CartList",
    props: {
        cartList: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        CartListItem
    },
    
}
</script>


<style scoped>
</style>
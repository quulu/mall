<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button"></check-button>
            <span class="check-text">全选</span>
        </div>
        <div class="total-price">
            合计:{{totalPrice}}
        </div>
        <div class="calculate">
            去计算:({{checkedCount}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'

export default {
    name: "CartBottomBar",
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters({cartList: 'getCartList'}),
        totalPrice() {
            // 因为用mapGetters导入了数据
            // return '￥' + this.$store.state.cartList.filter(item => {
            //     return item.isSelected
            // }).reduce((total, item) => {
            //     return total += ((+item.price) * item.count);
            // },0).toFixed(2);
            return '￥' + this.cartList.filter(item => {
                return item.isSelected
            }).reduce((total, item) => {
                return total += ((+item.price) * item.count);
            },0).toFixed(2);
        },
        checkedCount() {
            // 因为用mapGetters导入了数据
            // return this.$store.state.cartList.filter(item => {
            //     return item.isSelected
            // }).length;
            return this.cartList.filter(item => {
                return item.isSelected
            }).length;
        },
        isSelectAll() {
            
        }

    }
}
</script>

<style scoped>
.bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;
    
    background-color: #eee;
}
.check-content {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    width: 80px;
}
.check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    margin-right: 5px;
}
.total-price {
    flex: 1;
    margin-left: 20px;
}
.calculate {
    background-color:red;
    color: #fff;
    width: 100px;
}
</style>
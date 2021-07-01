<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button"
                          :isSelected="isSelectAll"
                          @click.native="checkBtnClick"></check-button>
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
        // 用mapGetters导入了数据
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

        // 用于判断全选按钮 是否全部选中
        isSelectAll() {
            // 用find查找出 没有被选中的 如果用filter的话 会消耗性能。
            // find是查找到 就会停止 不再查找
            if (this.cartList.length === 0) return false;
            return !this.cartList.find(item => !item.isSelected);
        }

    },
    methods: {
      checkBtnClick() {
        // 如果是全部选中
        if (this.isSelectAll) {
          this.cartList.forEach(item => {
            return item.isSelected = false;
          });
        } else {
          // 部分不选中或者全部没有选中
          this.cartList.forEach(item => {
            return item.isSelected = true;
          });
        }
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
    color: rgb(152, 234, 112);
    width: 100px;
}
</style>

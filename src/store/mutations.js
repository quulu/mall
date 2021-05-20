import {ADD_COUNTER, ADD_TO_CART} from './mutations-types'

export default {
    // mutations唯一的目的就是修改state中的状态
    // mutations中的每个方法尽可能完成的事件比较单一一点
    [ADD_COUNTER](state, payload) {
        payload.count++;
    },
    [ADD_TO_CART](state, payload) {
        // 加入购物车商品 是默认选中状态
        payload.isSelected = true;
        state.cartList.push(payload);
    }
}
export default {
    getCartLength (state) {
        // 这个是返回商品的种类
        return state.cartList.length;
        // 这个是返回的总数量
        // return state.cartList.reduce((total,item) => {
        //     return total += item.count;
        // },0)
    },
    getCartList (state) {
        console.log('输出state',state.cartList);
        return state.cartList;
    }
}
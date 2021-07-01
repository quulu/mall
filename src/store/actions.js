import {ADD_COUNTER, ADD_TO_CART} from './mutations-types'

export default {
    addCart(context, payload) {
      // 返回一个Promise
      return new Promise((resolve) => {
         // 1.查找之前数组中是否有该商品
         let oldProduct = context.state.cartList.find( item => {
            return item.iid === payload.iid
          })
          // 2.判断oldProduct
          if (oldProduct) {
              // oldProduct.count += 1;
              context.commit(ADD_COUNTER,oldProduct);
              resolve("添加商品成功");
          } else {
              payload.count = 1;
              context.commit(ADD_TO_CART,payload);
              resolve("商品数量+1");
          }
      });
    }
}

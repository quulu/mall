import {request} from './request'

// 获取首页的数据
export function getHomeMultidata() {
    return request({
        url: "/home/multidata"
    });
}

// 获取首页的商品数据
export function getHomeGoodsData(type,page) {
    return request({
        url:"/home/data",
        params: {
            type,
            page 
        }
    });
}

// 测试数据
export function testReq(pageSize, currentPage) {
    return request({
        url: "/page/list",
        method: "post",
        data:{
            pageSize: 10,
            currentPage: 1
        }
    })
}

// export function testReq(pageSize, currentPage) {
//     return request({
//         url: "/demo/one",
//         method: "post",
//         data:{
//             // pageSize: 10,
//             // currentPage: 1
//         }
//     })
// }
import {request} from './request'

export function getHomeMultidata() {
    return request({
        url: "/home/multidata"
        // url: "/demo/two"
        
    });
}

export function testReq() {
    return request({
        url: "/request/way/get",
        params: {
            id:1
        }
    })
}
import {request} from './request'

export function getDetailDataApi(iid) {
    return request({
        url: "/detail",
        params: {
            iid
        }
    });
}

// 将三个地方的数据，整合到一个地方
export class Goods {
    constructor(itemInfo,columns,services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.newPrice;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discount;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.realPrice;
        //注意：images可能没有值（某些商品有值，某些没有值）
        this.image = itemInfo.images ? itemInfo.images[0] : '';
    }
}

export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.logo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}

export class ParamInfo {
    constructor(info) {
        this.name = info.name; 
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = info.tables;
    }
}

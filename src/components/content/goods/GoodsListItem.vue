<template>
    <div class="goods-list-item" @click="itemClick">
        <img :src="showImage" alt="" @load="imageItemLoad">

        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.collect}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:"Goods",
    props: {
        goodsItem: {
            type: Object,
            default() {
                return {}   
            }
        }
    },
    computed: {
        // 用计算属性，是因为两个地方用到了相同的组件，但是数据的取法是不一样的
        showImage() {
            return this.goodsItem.image || this.goodsItem.show.img;
        }
    },
    methods: {
        imageItemLoad() {
            this.$bus.$emit('itemImgLoad');

            // if (this.$route.path.indexOf('/home')) {
            //     this.$bus.$emit('homeItemImgLoad')
            // } else if (this.$route.path.indexOf('/detail')) {
            //     this.$bus.$emit('detailItemImgLoad')
            // }
        },
        itemClick() {
            // 跳转到详情页
            // 路由传参
            // 1.params传参，只能name,不能path
            // this.$router.push({
            //     name:"Detail",
            //     params: {
            //         iid: this.goodsItem.iid
            //     }
            // });

            // this.$router.push('/detail/' + this.goodsItem.iid);

            /* 
            2.使用query传参，路由配置的时候path不用带参数 用name + path都可以
            router/index.js 
            {
                path: '/detail',//这里不需要参入参数，参见上面的params写法
                name: "detail",
                component: detail//这个details是传进来的组件名称
            }

            query跳转方法：
            写法一：this.$router.push(`/detail?id=${this.$route.query.id}`);
            写法二：this.$router.push({path:'detail',query:{id:123}})

            要是想获取参数值：各自的获取方法是：
            query和params分别是：this.$route.query.id，this.$route.params.id
            */
            this.$router.push({
                path:"/detail",
                query: {
                    iid: this.goodsItem.iid
                }
            });
        }
    }
}
</script>

<style scoped>
.goods-list-item {
    width: 48%;
    position: relative;
    padding-bottom: 40px;
}
.goods-list-item img {
    width: 100%;
    border-radius: 5px;
}
.goods-info {
    position: absolute;
    font-size: 12px;
    left: 0;
    right: 0;
    bottom: 5px;
    overflow: hidden;
    text-align: center;
}
.goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}
.goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
}
.goods-info .collect {
    position: relative;
}
.goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>
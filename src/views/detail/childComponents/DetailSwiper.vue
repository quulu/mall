<template>
<swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" >
        <img :src="item.image" alt="">
    </swiper-item>
</swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
    name:"DetailSwiper",
    props:{
        topImages: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    }
}
</script>

<style scoped>
.detail-swiper {
    height: 300px;
    overflow: hidden;
}
.detail-swiper img {
    /* transform: scale(0.5); */
    /* width: auto;
    height:auto;
    max-width: 100%;
    max-height: 100%; */
}
</style>
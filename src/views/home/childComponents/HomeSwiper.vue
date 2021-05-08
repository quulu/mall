<template>
    <div>
        <swiper>
            <swiper-item v-for="item in banners">
                <a :href="item.link">
                    <img :src="item.image" alt="" @load="imageLoad">
                 </a>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"

export default {
    name: "HomeSwiper",
    data() {
        return {
            isEmitImageLoad: false
        }
    },
    props: {
        banners: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
        imageLoad() {
            // 只发出一次，不需要发出多次
            if (this.isEmitImageLoad === false) {
                this.$emit('swiperImageLoad');
                this.isEmitImageLoad = true;
            }
        }
    }
}
</script>

<style>
</style>
<template>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
        <div class="info-header">
            <div class="header-title">用户评价</div>
            <div class="header-more">
                更多
                <i class="arrow-right"></i>
            </div>
        </div>
        <div class="info-user">
            <img :src="commentInfo.user.avatar" alt="">
            <span>{{commentInfo.user.uname}}</span>
        </div>
        <div class="info-detail">
            <p>{{commentInfo.content}}</p>
            <div class="info-other">
                <span class="date">{{commentInfo.created | showDate}}</span>
                <span>{{commentInfo.style}}</span>
            </div>
            <div class="info-imgs">
                <img :src="item" alt="" v-for="(item, index) in commentInfo.images" :key="index">
            </div>
        </div>
    </div>
</template>

<script>
// 时间格式化字符串
import  {formatDate} from 'common/utils'

export default {
    name: "DetailComment",
    props: {
        commentInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    filters: {
        showDate(value) {
            // 1.将时间戳转成Date对象
            const date = new Date(value * 1000);
            // 2.将date进行格式化
            return formatDate(date,'yyyy-MM-dd');
        }
    }
}
</script>

<style scoped>
.info-header {
    height: 40px;
    display: flex;
    align-items: center;
}
.info-header .header-title, .info-header .header-more {
    flex:1;
}
.info-header .header-title {
    padding: 0 10px;
    text-align: left;
}
.info-header .header-more {
    padding: 0 20px;
    text-align: right;
}
.info-user {
    margin-top: 10px;
    display: flex;
    align-items: center;
}
.info-user img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.info-user span {
    margin-left: 10px;
}
.info-detail {
    margin-top: 20px;
}
.info-detail p {
    padding: 5px 10px;
}
.info-detail .info-other {
    padding: 5px 10px;
}
</style>
<template>
    <div class="wrapper" ref="aaaa">
        <div>
            <!-- 1.无论是否设置click:false（false是默认状态），button都可以点击 -->
            <button @click="btnClick">按钮</button>

            <!-- 2.必须设置click:true, 那么div才能监听点击 -->
            <div @click="divClick"> div模块 </div>
            <ul>
                <li>数据1</li>
                <li>数据2</li>
                <li>数据3</li>
                <li>数据4</li>
                <li>数据5</li>
                <li>数据6</li>
                <li>数据7</li>
                <li>数据8</li>
                <li>数据9</li>
                <li>数据10</li>
                <li>数据11</li>
                <li>数据12</li>
                <li>数据13</li>
                <li>数据14</li>
                <li>数据15</li>
                <li>数据16</li>
                <li>数据17</li>
                <li>数据18</li>
                <li>数据19</li>
                <li>数据20</li>
                <li>数据21</li>
                <li>数据22</li>
                <li>数据23</li>
                <li>数据24</li>
                <li>数据25</li>
                <li>数据26</li>
                <li>数据27</li>
                <li>数据28</li>
                <li>数据29</li>
                <li>数据30</li>
                <li>数据31</li>
                <li>数据32</li>
                <li>数据33</li>
                <li>数据34</li>
                <li>数据35</li>
                <li>数据36</li>
                <li>数据37</li>
                <li>数据38</li>
                <li>数据39</li>
                <li>数据40</li>
            </ul>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: "Category",
    data() {
        return {
            myscroll: null
        }
    },
    // 不能在created周期函数中使用
    // 这时候组件还没有创建
    created() {

    },
    // 组件创建完后调用
    mounted() {
        this.myscroll = new BScroll(this.$refs.aaaa,{
            probeType:3,
            pullUpLoad: true,
            // 设置了click:true 则上面div模块才能点击
            click: true 
        });
    },
    methods: {
        btnClick() {
            console.log("点击分类按钮");
        },
        divClick() {
            console.log('点击分类的div模块');
        }
    }
}
</script>

<style scoped>
.wrapper {
    background-color: crimson;
    height: 150px;
    overflow: hidden;
}
</style>
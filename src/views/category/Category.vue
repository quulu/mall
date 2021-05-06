<template>
    <div class="wrapper">
        <ul class="content">
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
        this.myscroll = new BScroll(document.querySelector('.wrapper'),{
            probeType:3,
            pullUpLoad: true
        });
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
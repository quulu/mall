<template>
    <div class="button-wrapper" :class="{selected:isSelected}">
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
export default {
    name:"CheckButton",
    props: {
        isSelected: {
            type: Boolean,
            default: true 
        }
    }
}
</script>

<style scoped>
.button-wrapper {
    border-radius: 50%;
    border: 2px solid #aaa;
}
.selected {
    background-color: red;
    border-color: red;
}
</style>
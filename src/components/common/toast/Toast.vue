<template>
    <div class="toast" v-show="isShow">
      <div>{{message}}</div>
    </div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return {
      message: "",
      isShow: false
    }
  },
  methods: {
    show(message, duration) {
      console.log("toast",message,duration);
      duration = duration || 3000;
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%， -50%);

    color: #fff;

    background-color: rgba(0,0,0,0.7);
    padding: 4px 5px;
    z-index: 9999;
  }
</style>

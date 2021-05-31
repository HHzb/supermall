<template>
  <div class="wraper" ref="wraper">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  components: {},
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      }
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wraper, {
      scrollY: true,
      observeDOM: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    //实时监听滚动位置,当probeType为2或3的时候才监听
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scrollOnPOsition", position);
      });
    }

    //监听滚动到底部是否执行上拉加载更多,pullingUpLoad为true时才加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }

    //防抖函数处理，防止过多的服务器请求，减少refresh函数的调用
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    //判断上拉加载更多是否完成
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      //需要先判断scroll是否已经挂载到DOM上面，再调用该方法，不然有可能Scroll还没挂载到DOM上的话，会找不到该方法
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>

<style>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 50px;
}
.back-top img {
  width: 50px;
}
</style>

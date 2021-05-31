<template>
  <div>
    <!-- 抽离出来的轮播图 -->
    <swiper>
      <swiper-item v-for="items in banners" :key="items.index">
        <a :href="items.link">
          <img :src="items.image" alt="" @load="swiperImgLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "../../../components/common/swiper/index.js";

export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      sImgLoad: false
    };
  },
  methods: {
    swiperImgLoad() {
      //当轮播图图片加载一次后，传出事件
      if (!this.sImgLoad) {
        this.$emit("swiperImgLoadFinish");
        this.sImgLoad = true;
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

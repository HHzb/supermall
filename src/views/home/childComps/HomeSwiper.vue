<template>
  <div>
    <!-- 抽离出来的轮播图 -->
    <swiper>
      <swiper-item v-for="items in banners" :key="items.index">
        <a :href="items.link">
          <img :src="items.image" alt="" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "../../../components/common/swiper/index.js";

export default {
  data() {
    return {};
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

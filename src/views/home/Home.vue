<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center" class="">购物街</div>
    </nav-bar>
    <!-- 首页小分类 -->
    <tab-control
      :titles="titles"
      class="tabControl"
      @tabClick="homeTabClick"
      v-show="isTabFixed"
      ref="tabControl1"
    ></tab-control>

    <!-- 添加到scroll滚动里面 -->
    <scroll
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scrollOnPOsition="contentScroll"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper
        :banners="banners"
        class="home-swiper"
        @swiperImgLoadFinish="swiperImgLoadFinish"
      ></home-swiper>
      <!-- 商品推荐 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- feature -->
      <fea-ture-view></fea-ture-view>
      <!-- 首页小分类 -->
      <tab-control
        :titles="titles"
        @tabClick="homeTabClick"
        ref="tabControl2"
      ></tab-control>
      <!-- 商品列表 -->
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <!-- 回到顶部按钮 -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import { getHomeGoods, getHomeMultiData } from "../../network/home";
import { debounce } from "../../common/util";

import NavBar from "../../components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import TabControl from "../../components/contend/tabControl/TabControl.vue";
import GoodsList from "../../components/contend/goods/GoodsList.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import BackTop from "../../components/contend/backtop/BackTop.vue";

import FeaTureView from "./childComps/FeaTureView.vue";
import RecommendView from "./childComps/RecommendView.vue";

export default {
  name: "SupermallHome",
  components: {
    NavBar,
    HomeSwiper,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    FeaTureView,
    RecommendView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: [
        { id: 1, value: "流行" },
        { id: 2, value: "新款" },
        { id: 3, value: "精选" }
      ],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffSetTop: 0,
      isTabFixed: false,
      scrollY: 0
    };
  },
  //在create生命周期获取数据，请求多个数据
  created() {
    //将请求数据的方法封装到methods里面
    //请求轮播图数据
    this.getHomeMultiData();

    //请求首页商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    // //监听goodslistItem的图片加载,监听事件不在created里面写，写在mounted里面
    // this.$bus.$on("itemImgLoad", () => {
    //   this.$refs.scroll.refresh();
    // });
  },
  activated() {
    //用户返回Home组件时滚动到上次浏览的地方
    this.$refs.scroll.scrollTo(0, -this.scrollY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //用户离开Home组件时记录浏览的位置
    this.scrollY = this.$refs.scroll.y;
  },
  mounted() {
    //1.图片加载的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 300);
    this.$bus.$on("itemImgLoad", () => {
      //调用防抖函数
      refresh();
      // this.$refs.scroll.refresh();
    });
  },
  methods: {
    /*
     *监听事件的相关方法
     */
    homeTabClick(id) {
      switch (id) {
        case 1:
          this.currentType = "pop";
          break;
        case 2:
          this.currentType = "new";
          break;
        case 3:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentId = id;
      this.$refs.tabControl2.currentId = id;
    },
    //点击回到顶部
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    //监听滚动位置，判断是否显示回到顶部按钮
    contentScroll(position) {
      // 1.判断backTop是否显示
      this.isShowBackTop = -position.y > this.tabOffSetTop;

      //2.决定tabControl是否吸顶
      this.isTabFixed = -position.y + 44 > this.tabOffSetTop;
    },
    //监听上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImgLoadFinish() {
      //所有组件都有一个属性 $el: 用户获取组件的元素
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
     *请求轮播图和导航栏数据的方法
     */
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    //请求商品列表数据
    getHomeGoods(type) {
      let page = 1 + this.goods[type].page;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        //请求数据结束后结束上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 10;
  /* position: fixed;
  left: 0px;
  right: 0px;
  top: 0px; */
}
.tabControl {
  position: relative;
  z-index: 11;
  background-color: #fff;
}
.home-swiper {
  padding-top: 44px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  padding: 5px;
  border-bottom: 3px solid var(--color-tint);
}
/* .fixed {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 44px;
  margin-top: 44px;
} */
.wraper {
  overflow: hidden;
  /* height: 300px; */
  position: absolute;
  top: 0px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>

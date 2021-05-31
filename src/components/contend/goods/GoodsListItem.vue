<template>
  <div class="goods-item">
    <img :src="goodsList.show.img" alt="" @load="imgLoad" />
    <div class="goods-info">
      <p>{{ goodsList.title }}</p>
      <span class="price">{{ goodsList.price }}</span>
      <span class="collect">{{ goodsList.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsList: Object,
    default() {
      return {};
    }
  },
  methods: {
    imgLoad() {
      //该组件与Scroll组件通信
      //可以用事件总线通信，新建一个Vue实例，命名伟bus
      this.$bus.$emit("itemImgLoad");
    }
  }
};
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 49.5%;
  padding-left: 1%;
}

.goods-item img {
  width: 100%;
  height: 275px;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>

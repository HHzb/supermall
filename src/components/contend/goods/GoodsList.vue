<template>
  <div class="good-list">
    <goods-list-item
      v-for="items in goods"
      :key="items.index"
      :goodsList="items"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";

export default {
  data() {
    return {};
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  }
};
</script>

<style>
.good-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
}
</style>

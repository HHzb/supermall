<template>
  <div class="recommend">
    <div v-for="items in recommends" :key="items.index" class="recommend-items">
      <a :href="items.link">
        <img :src="items.image" alt="" />
      </a>
      <div>{{ items.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.recommend {
  display: flex;
  text-align: center;
  font-size: 14px;
  border-bottom: 8px solid #eee;
  padding: 10px 0 10px;
}
.recommend-items {
  flex: 1;
}
.recommend-items a img {
  width: 70%;
  margin-bottom: 7px;
}
</style>

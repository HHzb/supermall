<template>
  <div class="tab-control">
    <div
      v-for="items in titles"
      :key="items.id"
      class="tab-control-items"
      :class="{ active: items.id === currentId }"
      @click="tabControlColor(items.id)"
    >
      <span>{{ items.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentId: 1
    };
  },
  methods: {
    tabControlColor(id) {
      this.currentId = id;
      this.$emit("tabClick", id);
    }
    // tabClick(index) {
    //   this.$emit("homeTabClick", index);
    // }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  background-color: #fff;
  margin-bottom: 3px;
}
.tab-control-items {
  flex: 1;
}
</style>

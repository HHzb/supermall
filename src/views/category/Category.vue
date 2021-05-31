<template>
  <div>
    <input type="text" />
  </div>
</template>

<script>
export default {
  components: {},

  methods: {
    handleInput() {
      console.log(1);
    },
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    }
  }
};
</script>

<style scoped></style>

<template>
  <div id="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<style>
#nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  box-shadow: 0px 1px 1px rgba(34, 19, 19, 0.1);
}
.left,
.right {
  width: 60px;
  /* border: 1px solid red; */
}
.center {
  flex: 1;
  text-align: center;
  /* border: 1px solid blue; */
}
</style>

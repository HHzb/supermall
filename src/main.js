import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

//新建事件总线实例，用来联系各种关系的组件
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router
}).$mount("#app");

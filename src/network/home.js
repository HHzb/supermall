import { request } from "./request";

//获取首页轮播图数据
export function getHomeMultiData() {
  return request({
    url: "/home/multidata"
  });
}

//获取首页商品信息
export function getHomeGoods(type, page) {
  return request({
    url: "/home/data",
    params: {
      type,
      page
    }
  });
}

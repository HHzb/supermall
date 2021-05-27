import { request } from "./request";

//获取首页轮播图数据
export function getHomeMultiData() {
  return request({
    url: "/home/multidata"
  });
}

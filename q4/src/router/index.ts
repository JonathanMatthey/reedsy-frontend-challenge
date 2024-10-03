import { createRouter, createWebHistory } from "vue-router";
import BookList from "@/components/BookList.vue";
import BookDetail from "@/components/BookDetail.vue";

const routes = [
  {
    path: "/",
    name: "BookList",
    component: BookList,
  },
  {
    path: "/book/:slug",
    name: "BookDetail",
    component: BookDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/weather/current",
    name: "Current",
    props: true,
    component: () => import("@/views/weather/Current.vue"),
  },
  {
    path: "/weather/forecast",
    name: "Forecast",
    props: true,
    component: () => import("@/views/weather/Forecast.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

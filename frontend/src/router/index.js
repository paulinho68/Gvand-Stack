import { createWebHistory, createRouter } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import Login from "@/views/Login.vue";

const lazyLoad = (view) => {
  return import(`@/views/${view}.vue`)
}

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => lazyLoad("Dashboard"),
  },
  {
    path: '/movies/:id',
    name: "Movie",
    component: () => lazyLoad("Movie")
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
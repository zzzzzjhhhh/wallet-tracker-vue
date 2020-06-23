import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Labels from "@/views/Labels.vue";
import EditLabel from "@/views/EditLabel.vue";
import Wallet from "@/views/Wallet.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/wallet",
  },
  {
    path: "/labels",
    name: "labels",
    component: Labels,
  },
  {
    path: "/wallet",
    name: "wallet",
    component: Wallet,
  },
  {
    path: "/statistics",
    name: "statistics",
    component: Statistics,
  },
  {
    path: "/labels/edit/:id",
    component: EditLabel,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

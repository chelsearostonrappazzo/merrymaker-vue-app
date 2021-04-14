import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UserShow from "../views/UserShow.vue";
import CelebrationsShow from "../views/CelebrationsShow.vue";
import CelebrationsIndex from "../views/CelebrationsIndex.vue";
import CabalsShow from "../views/CabalsShow.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/profile",
    name: "user show",
    component: UserShow,
  },
  {
    path: "/celebrations/:id",
    name: "celebrations-show",
    component: CelebrationsShow,
  },
  {
    path: "/celebrations",
    name: "celebrations-index",
    component: CelebrationsIndex,
  },
  {
    path: "/cabals/:id",
    name: "cabals-show",
    component: CabalsShow,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

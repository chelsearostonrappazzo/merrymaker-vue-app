import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UserShow from "../views/UserShow.vue";
import UsersEdit from "../views/UsersEdit.vue";
import CelebrationsIndex from "../views/CelebrationsIndex.vue";
import CelebrationsNew from "../views/CelebrationsNew.vue";
import CelebrationsShow from "../views/CelebrationsShow.vue";
import CelebrationsEdit from "../views/CelebrationsEdit.vue";
import CabalsShow from "../views/CabalsShow.vue";
import Moodboard from "../views/Moodboard.vue";

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
    path: "/celebrations",
    name: "celebrations-index",
    component: CelebrationsIndex,
  },
  {
    path: "/celebrations/new",
    name: "celebrations-new",
    component: CelebrationsNew,
  },
  {
    path: "/celebrations/:id",
    name: "celebrations-show",
    component: CelebrationsShow,
  },
  {
    path: "/cabals/:id",
    name: "cabals-show",
    component: CabalsShow,
  },
  {
    path: "/celebrations/:id/edit",
    name: "celebrations-edit",
    component: CelebrationsEdit,
  },
  {
    path: "/profile/edit",
    name: "users-edit",
    component: UsersEdit,
  },
  {
    path: "/moodboard",
    name: "moodboard",
    component: Moodboard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

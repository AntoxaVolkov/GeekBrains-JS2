import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Comments from "./views/Comments.vue";
import Cart from "./views/Cart.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/comments",
      name: "comments",
      component: Comments
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () =>
      ////import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () =>
      ////import(/* webpackChunkName: "about" */ "./views/Cart.vue")
    }
  ]
});

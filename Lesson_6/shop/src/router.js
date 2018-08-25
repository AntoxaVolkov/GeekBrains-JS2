import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Comments from "./views/Comments.vue";
import Cart from "./views/Cart.vue";
import FeedBack from "./views/FeedBack.vue";

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
      // this generates a separate chunk (comments.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () =>
      ////import(/* webpackChunkName: "comments" */ "./views/Comments.vue")
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart
      // route level code-splitting
      // this generates a separate chunk (cart.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () =>
      ////import(/* webpackChunkName: "cart" */ "./views/Cart.vue")
    },
    {
      path: "/feedback",
      name: "feedback",
      component: FeedBack
      // route level code-splitting
      // this generates a separate chunk (feedback.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () =>
      ////import(/* webpackChunkName: "feedback" */ "./views/FeedBack.vue")
    }
  ]
});

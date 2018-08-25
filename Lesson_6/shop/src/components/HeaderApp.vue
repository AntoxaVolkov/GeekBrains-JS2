<template>
  <header class="header">
    <nav class="header__nav nav">
      <div class="logo"><a href="/" class="logo__link"><span>Vue</span>Shop</a></div>
      <ul class="nav__list">
        <li class="nav__item">
          <router-link class="nav__link" to="/">Products</router-link>
        </li>
        <li class="nav__item">
          <router-link class="nav__link" to="/comments">Comments</router-link>
        </li>
        <li class="nav__item">
          <router-link class="nav__link" to="/feedback">Feedback</router-link>
        </li>
      </ul>
      <ShoppingCart class="nav__cart"/>
    </nav>
  </header>
</template>

<script>
import ShoppingCart from "@/components/ShoppingCart.vue";

export default {
  name: "HeaderApp",
  components: {
    ShoppingCart
  }
};
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  padding: 10px;

  &__list {
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__link {
    padding: 5px 10px;
    font-weight: bold;
    color: #2c3e50;
  }

  &__link.router-link-exact-active {
    color: #42b983;
  }

  .logo {
    &__link {
      font-weight: bold;
      font-size: 18px;
      color: #2c3e50;

      span {
        color: #42b983;
      }
    }
  }
}
</style>

<template>
  <div class="cart">
    <router-link class="cart__link" to="/cart">
      <img src="../assets/icon-cart.svg" alt="Cart">
      <span v-if="numberProductsCart" class="cart__counter">{{numberProductsCart}}</span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ShoppingCart",
  computed: {
    ...mapGetters(["numberProductsCart"])
  },
  methods: {
    getProducts() {
      this.$store.dispatch("getProductsCart");
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style lang="scss">
.cart {
  &__link {
    display: block;
    position: relative;
  }

  &__counter {
    display: block;
    position: absolute;
    top: -9px;
    right: -9px;
    background: rgb(248, 48, 48);
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    border-radius: 50%;
    color: #fff;
    font-size: 12px;
  }
}
</style>

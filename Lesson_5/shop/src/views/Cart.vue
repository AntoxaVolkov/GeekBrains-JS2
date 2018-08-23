<template>
  <div class="page-cart">
    <h1>Cart</h1>
    <div v-if="numberProductsCart" class="products">
      <product class="products__item" v-for="product in productsInCart" :product="product" :key="product.id"/>
    </div>
    <div v-else>
      <p>Cart is empty</p>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import { mapGetters } from "vuex";

export default {
  name: "cart",
  components: {
    Product
  },
  data() {
    return {
      products: []
    };
  },
  computed: {
    ...mapGetters(["productsInCart", "numberProductsCart"])
  }
};
</script>

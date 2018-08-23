<template>
  <div class="home">
    <h1>Products</h1>
    <div class="products">
      <product class="products__item" v-for="product in products" :product="product" :key="product.id"/>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";

export default {
  name: "home",
  components: {
    Product
  },
  data() {
    return {
      products: [
        {
          id: 1,
          product: "iPhone X",
          price: "78000"
        },
        {
          id: 2,
          product: "Xiaomi 4x",
          price: "14000"
        },
        {
          id: 3,
          product: "Samsung GT666",
          price: "66000"
        },
        {
          id: 4,
          product: "Huawei P9 Lite",
          price: "23000"
        },
        {
          id: 5,
          product: "iPhone 5",
          price: "8000"
        },
        {
          id: 6,
          product: "Xiaomi 4x note",
          price: "28000"
        },
        {
          id: 7,
          product: "Samsung Galaxy 9",
          price: "88000"
        },
        {
          id: 8,
          product: "Huawei P9 Lite",
          price: "15000"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.products {
  display: flex;
  flex-wrap: wrap;

  &__item {
    margin: 15px;
    flex-basis: 270px;
    padding: 10px;
    border: 2px solid #2c3e50;
    box-sizing: border-box;
  }

  &__title {
    font-size: 20px;
  }

  &__price {
    font-size: 14px;

    span {
      font-size: 16px;
      color: rgb(201, 68, 68);
    }
  }

  &__btn {
    background-color: #42b983;
    border: none;
    padding: 5px 10px;
    color: #fff;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>

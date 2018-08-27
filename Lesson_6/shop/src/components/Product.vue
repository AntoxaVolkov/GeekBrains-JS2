<template>
  <div class="product" @dragstart="dragStart" @dragend="dragEnd" :draggable="!product.product_id">
    <h2 class="product__title">{{product.product}}</h2>
    <p class="product__price"><span>{{product.price}}</span> RUB</p>
    <button v-if="!product.product_id" @click="addProduct" class="product__btn">Add to cart</button>
    <button v-if="product.product_id" class="product__btn">Buy</button>
    <button v-if="product.product_id" @click="removeProduct" class="product__btn product__btn--red">Remove</button>
  </div>
</template>

<script>
export default {
  name: "product",
  props: ["product"],
  methods: {
    addProduct() {
      this.$store
        .dispatch("addProductCart", { product: this.product })
        .catch(() => {
          this.$notify({
            title: "Warning",
            message: "Server error",
            type: "error"
          });
        });
    },
    removeProduct() {
      this.$store
        .dispatch("removeProductCart", {
          id: this.product.product_id
        })
        .catch(() => {
          this.$notify({
            title: "Warning",
            message: "Server error",
            type: "error"
          });
        });
    },
    dragStart(ev) {
      ev.dataTransfer.effectAllowed = "copy";
      this.$store.commit("setDragProduct", this.product);
      return true;
    },
    dragEnd() {
      this.$store.commit("clearDragProduct");
    }
  }
};
</script>

<style lang="scss">
.product {
  text-align: center;

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
    transition: background-color 0.2s ease-in-out;

    &--red {
      background-color: rgb(248, 48, 48);
    }

    &:hover {
      background-color: #2c3e50;
    }
  }
}
</style>

<template>
  <div class="cart-drop">
    <div v-if="hasDragProduct" 
      @dragenter="dragEnter" 
      @drop="dragDrop" 
      @dragover="dragOver" 
      @dragleave="dragLeave" 
      class="cart-drop__drop"
      :class="{'cart-drop__drop--active': enter}"
    >Перетащите сюда</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DropCart",
  data() {
    return {
      enter: false
    };
  },
  computed: {
    ...mapGetters(["dragProduct", "hasDragProduct"])
  },
  methods: {
    dragEnter(ev) {
      ev.preventDefault();
      this.enter = true;
      console.log(this.dragProduct);
      return true;
    },
    dragLeave(ev) {
      ev.preventDefault();
      this.enter = false;
      return true;
    },
    dragOver(ev) {
      ev.preventDefault();
    },
    dragDrop() {
      this.enter = false;
      this.$store.dispatch("addProductCart", { product: this.dragProduct });
    }
  }
};
</script>

<style lang="scss">
.cart-drop {
  position: relative;
  z-index: 20;
  &__drop {
    position: absolute;
    background-color: #43bb858f;
    width: 200px;
    height: 200px;
    padding: 100px 20px 20px;
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-sizing: border-box;
    transform-origin: center;

    &--active {
      background-color: #43bb85d7;
    }
  }
}
</style>

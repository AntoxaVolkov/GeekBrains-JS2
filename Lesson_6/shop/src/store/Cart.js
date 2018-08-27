import API from "@/api";

const Cart = {
  state: {
    products: [],
    dragProduct: null
  },
  getters: {
    productsInCart(state) {
      return state.products;
    },
    numberProductsCart(state) {
      return state.products.length;
    },
    dragProduct(state) {
      return state.dragProduct;
    },
    hasDragProduct(state) {
      return !!state.dragProduct;
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setDragProduct(state, product) {
      state.dragProduct = product;
    },
    clearDragProduct(state) {
      state.dragProduct = null;
    }
  },
  actions: {
    async getProductsCart({ dispatch, commit }) {
      try {
        let data;

        if (await dispatch("hasUser")) {
          let user = await dispatch("getUser");
          data = await API.getProductsOfCart(user.id);
        } else {
          data = await API.getProductsOfCart();
          dispatch("setUser", { id: data.user_id });
        }

        commit("setProducts", data.cart);
      } catch (error) {
        console.log(error);
      }
    },

    async addProductCart({ dispatch }, { product }) {
      try {
        console.log(product);
        let user = await dispatch("getUser");
        await API.addProductInCart(user.id, product);
        dispatch("getProductsCart");
      } catch (error) {
        console.log(error);
      }
    },

    async removeProductCart({ dispatch }, product) {
      try {
        let user = await dispatch("getUser");
        await API.removeProductFromCart(user.id, product.id);
        dispatch("getProductsCart");
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default Cart;

const API = {
  BASE_URL: "http://localhost:80",
  $http(path, method = "GET") {
    return fetch(`${this.BASE_URL}${path}`, { method }).then(data => {
      this.res = data;
      return data.json()
    });
  },
  getProductsOfCart(user_id = false) {
    let str = user_id ? `?user_id=${user_id}` : "";
    return this.$http(`/shop${str}`);
  },
  addProductInCart(user_id, product) {
    let str = `?user_id=${user_id}&product=${product.product}&price=${
      product.price
    }`;
    return this.$http(`/shop${str}`, "POST");
  },
  removeProductFromCart(user_id, product_id) {
    let str = `?user_id=${user_id}&product_id=${product_id}`;
    return this.$http(`/shop${str}`, "DELETE");
  },
  getComments() {
    return this.$http("/comments");
  },
  addComment(comment) {
    let str = `?text=${comment}`;
    return this.$http(`/comments${str}`, "POST");
  },
  removeComment(comment_id) {
    let str = `?comment_id=${comment_id}`;
    return this.$http(`/comments${str}`, "DELETE");
  },
  likeComment(comment_id) {
    let str = `?comment_id=${comment_id}`;
    return this.$http(`/comments${str}`, "PATCH");
  }
};

if(window){
  window.shopAPI = API;
}else{
  module.exports = API;
}

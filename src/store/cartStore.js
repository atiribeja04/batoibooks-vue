import { reactive } from 'vue';

const cartStore = reactive({
  cart: [],

  addToCart(book) {
    if (!this.cart.some(item => item.id === book.id)) {
      this.cart.push(book);
    }
  },

  removeFromCart(bookId) {
    const index = this.cart.findIndex(item => item.id === bookId);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }
});

export default cartStore;

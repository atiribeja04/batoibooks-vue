<template>
  <div id="cart">
    <h2>Carrito de Compras</h2>
    <div id="list">
      <BookItem
        v-for="book in cart"
        :key="book.id"
        :book="book"
        @remove-from-cart="removeFromCart" 
      />
    </div>
    <p v-if="cart.length === 0">No hay libros en el carrito.</p>
  </div>
</template>

<script>
import BookItem from './BookItem.vue';
import cartStore from '../store/cartStore.js';

export default {
  name: 'AppCart',
  components: {
    BookItem
  },
  computed: {
    cart() {
      return cartStore.cart;
    },
  },
  methods: {
    removeFromCart(bookId) {
      cartStore.removeFromCart(bookId);
    },
  },
};
</script>

<style scoped>
#cart {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  padding: 5px 0;
}
p {
  font-size: 1rem;
  color: #777;
}
</style>

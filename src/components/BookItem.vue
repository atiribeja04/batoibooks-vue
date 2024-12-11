<template>
  <div class="card" :data-id="book.id" :data-userId="book.userId">
    <img :src="book.photo" :alt="'Libro ' + book.id">
    <div>
      <h3>({{ book.id }})</h3>
      <h4 class="publisher">{{ book.publisher }}</h4>
      <p class="pages">{{ book.pages }} páginas</p>
      <p class="status">Estado: {{ book.status }}</p>
      <p class="comments">{{ book.comments }}</p>
      <p class="sold-date">{{ book.soldDate ? `Vendido el ${book.soldDate}` : 'En venta' }}</p>
      <h4 class="price">{{ book.price }} €</h4>
      <div>
        <button v-if="!inCart" class="add-to-cart" @click="addToCart">
          <span class="material-icons">add_shopping_cart</span>
        </button>
        <button v-if="inCart" class="remove-from-cart" @click="removeFromCart">
          <span class="material-icons">remove_shopping_cart</span>
        </button>
        <button v-if="!inCart" class="edit-book" @click="editBook">
          <span class="material-icons">edit</span>
        </button>
        <button v-if="!inCart" class="delete-book" @click="deleteBook(book.id)">
          <span class="material-icons">delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import cartStore from '../store/cartStore.js';
import appMessages from '../store/messageStore.js';

export default {
  props: {
    book: Object,
  },
  computed: {
    inCart() {
      return cartStore.cart.some(item => item.id === this.book.id);
    }
  },
  methods: {
    addToCart() {
      cartStore.addToCart(this.book);
      appMessages.addMessage(`Libro ${this.book.id} añadido al carrito.`);
    },
    removeFromCart() {
      cartStore.removeFromCart(this.book.id);
      appMessages.addMessage(`Libro ${this.book.id} removido del carrito.`);
    },
    editBook() {
      console.log(`Editar libro: ${this.book.id}`);
      appMessages.addMessage(`Libro ${this.book.id} listo para edición.`);
    },
    async deleteBook(id) {
      try {
        appMessages.addMessage(`Libro con ID ${id} eliminado correctamente.`);
      } catch (error) {
        console.error(`Error al eliminar el libro con ID ${id}:`, error);
        appMessages.addMessage(`Error al eliminar el libro con ID ${id}.`);
      }
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
}
button {
  margin-top: 5px;
}
.material-icons {
  vertical-align: middle;
}
</style>

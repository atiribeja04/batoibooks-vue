<template>
    <div id="book-list">
      <h2>Lista de Libros</h2>
      <div id="list">
        <BookItem
          v-for="book in books"
          :key="book.id"
          :book="book"
        />
      </div>
    </div>
  </template>
  
  <script>
  import BookItem from './BookItem.vue';
  
  export default {
    name: 'BooksList',
    components: {
      BookItem,
    },
    props: {
      books: {
        type: Array,
        required: false, 
      }
    },
  };
  </script>
  
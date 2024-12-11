<template>
  <div id="app">
    <AppMenu />
    <AppMessages />
    <BooksList :books="books" />
    <AddBook />
    <AppCart />
    <AppAbout />
  </div>
</template>
<script>
import bookStore from './store/bookStore'; 
import moduleStore from './store/moduleStore';
import AppMenu from './components/AppMenu.vue';
import AppMessages from './components/AppMessages.vue';
import BooksList from './components/BooksList.vue';
import AddBook from './components/AddBook.vue';
import AppCart from './components/AppCart.vue';
import AppAbout from './components/AppAbout.vue';

export default {
  name: 'App',
  components: {
    AppMenu,
    AppMessages,
    BooksList,
    AddBook,
    AppCart,
    AppAbout
  },
  computed: {
    books() {
      return bookStore.state.books;
    },
    modules() {
      return moduleStore.state.modules;
    }
  },
  created() {
    bookStore.fetchDBBooks();
  },
};
</script>

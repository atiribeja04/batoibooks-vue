<template>
    <div id="form">
      <h2 id="formTitle">Añadir libro</h2>
      <form @submit.prevent="addBook" id="bookForm">
        <input type="hidden" v-model="book.userId">
        <input type="hidden" v-model="book.bookId">
        <input type="hidden" v-model="book.photo">
        
        <div>
          <label for="id-module">Módulo:</label>
          <select v-model="book.idModule" id="id-module" name="id-module">
            <option disabled value="">- Selecciona un módulo -</option>
            <option v-for="module in modules" :key="module.code" :value="module.code">{{ module.cliteral }}</option>
          </select>
        </div>
        
        <div>
          <label for="publisher">Editorial:</label>
          <input type="text" v-model="book.publisher" id="publisher" name="publisher" required>
        </div>
        
        <div>
          <label for="price">Precio:</label>
          <input type="number" v-model="book.price" id="price" name="price" required>
        </div>
        
        <div>
          <label for="pages">Páginas:</label>
          <input type="number" v-model="book.pages" id="pages" name="pages" required>
        </div>
        
        <div>
          <label>Estado:</label>
          <label><input type="radio" v-model="book.status" value="new"> Nuevo</label>
          <label><input type="radio" v-model="book.status" value="good"> Usado</label>
          <label><input type="radio" v-model="book.status" value="bad"> Dañado</label>
        </div>
        
        <div>
          <label for="comments">Comentarios:</label>
          <textarea v-model="book.comments" id="comments" name="comments"></textarea>
        </div>
        
        <button type="submit" id="saveButton">Añadir</button>
        <button type="reset" id="resetButton" @click="resetForm">Reset</button>
      </form>
    </div>
  </template>
  
  <script>
import bookStore from '../store/bookStore';
import moduleStore from '../store/moduleStore';
import appMessages from '../store/messageStore.js';

export default {
  name: 'AddBook',
  data() {
    return {
      book: {
        userId: '1', 
        bookId: '',
        photo: 'placeholder.png', 
        idModule: '',
        publisher: '',
        price: '',
        pages: '',
        status: '',
        comments: '',
      },
      modules: [],
    };
  },
  async created() {
  try {
    await moduleStore.fetchDBModules()
    this.modules = moduleStore.state.modules;
  } catch (error) {
    console.error('Error al cargar los módulos:', error);
  }
},
  methods: {
    async addBook() {
      try {
        await bookStore.addBookToDB(this.book);
        console.log('Libro añadido correctamente.');
        appMessages.addMessage(`Libro añadido correctamente.`);
        this.resetForm();
      } catch (error) {
        console.error('Error al añadir el libro:', error);
        appMessages.addMessage(`Error al añadir el libro:`, error);
      }
    },
    resetForm() {
      this.book = {
        userId: '1',
        bookId: '',
        photo: 'default.png',
        idModule: '',
        publisher: '',
        price: '',
        pages: '',
        status: '',
        comments: '',
      };
    },
  },
};
</script>

  
  <style scoped>
  #form {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  form {
    display: grid;
    gap: 20px;
  }
  
  label {
    font-size: 1rem;
    margin-bottom: 5px;
  }
  
  input, select, textarea {
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 15px;
    font-size: 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button[type="reset"] {
    background-color: #f44336;
  }
  
  button:hover {
    opacity: 0.9;
  }
  </style>
  
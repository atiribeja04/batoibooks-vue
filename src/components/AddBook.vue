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
        <span class="error" v-if="errors.idModule">{{ errors.idModule }}</span>
      </div>
      
      <div>
        <label for="publisher">Editorial:</label>
        <input type="text" v-model="book.publisher" id="publisher" name="publisher">
        <span class="error" v-if="errors.publisher">{{ errors.publisher }}</span>
      </div>
      
      <div>
        <label for="price">Precio:</label>
        <input type="number" min="0" step="0.01" v-model="book.price" id="price" name="price">
        <span class="error" v-if="errors.price">{{ errors.price }}</span>
      </div>
      
      <div>
        <label for="pages">Páginas:</label>
        <input type="text" v-model="book.pages" id="pages" name="pages">
        <span class="error" v-if="errors.pages">{{ errors.pages }}</span>
      </div>
      
      <div>
        <label>Estado:</label>
        <label><input type="radio" v-model="book.status" value="new"> Nuevo</label>
        <label><input type="radio" v-model="book.status" value="good"> Usado</label>
        <label><input type="radio" v-model="book.status" value="bad"> Dañado</label><br>
        <span class="error" v-if="errors.status">{{ errors.status }}</span>
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
      errors: {},
    };
  },
  async created() {
    try {
      await moduleStore.fetchDBModules();
      this.modules = moduleStore.state.modules;
    } catch (error) {
      console.error('Error al cargar los módulos:', error);
    }
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.book.idModule) {
        this.errors.idModule = 'El módulo es obligatorio.';
      }

      if (!this.book.publisher) {
        this.errors.publisher = 'La editorial es obligatoria.';
      }

      if (!this.book.price) {
        this.errors.price = 'El precio es obligatorio.';
      } else if (isNaN(this.book.price) || this.book.price < 0) {
        this.errors.price = 'El precio debe ser un número mayor o igual a 0.';
      }

      if (!this.book.pages) {
        this.errors.pages = 'El número de páginas es obligatorio.';
      } else if (!Number.isInteger(Number(this.book.pages)) || this.book.pages < 0) {
        this.errors.pages = 'El número de páginas debe ser un entero mayor o igual a 0.';
      }

      if (!this.book.status) {
        this.errors.status = 'El estado es obligatorio.';
      }

      return Object.keys(this.errors).length === 0;
    },
    async addBook() {
  if (this.validateForm()) {
    try {
      await bookStore.addBookToDB(this.book);
      console.log('Libro añadido correctamente.');
      appMessages.addMessage(`Libro añadido correctamente.`);
      this.resetForm();
    } catch (error) {
      console.error('Error al añadir el libro:', error);
      appMessages.addMessage(error.message); 
    }
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
      this.errors = {};
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

  .error {
  color: #f44336; 
  font-size: 0.9rem; 
  margin-top: 5px; 
  display: block; 
  font-weight: bold;
}
  </style>
  
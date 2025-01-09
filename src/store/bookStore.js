import { reactive } from 'vue';
import axios from 'axios';

const state = reactive({
  books: [],
});

async function fetchDBBooks() {
  try {
    const response = await axios.get("http://localhost:3000/books");
    state.books = response.data;
  } catch (error) {
    console.error("Error al cargar los libros:", error);
  }
}



async function addBookToDB(newBook) {
  try {
    const existe = state.books.some(
      book => book.userId === newBook.userId && book.idModule === newBook.idModule
    );

    if (existe) {
      throw new Error("Ya existe ese libro.");
    }

    const response = await axios.post("http://localhost:3000/books", newBook);
    state.books.push(response.data);
  } catch (error) {
    console.error("Error al añadir el libro:", error);
    throw error;
  }
}

async function deleteBookFromDB(bookId) {
  try {
    await axios.delete(`http://localhost:3000/books/${bookId}`);
    state.books = state.books.filter(book => book.id !== bookId);
  } catch (error) {
    console.error("Error al borrar el libro:", error);
    throw error;
  }
}

async function updateBookInDB(updatedBook) {
  try {
    const response = await axios.put(`http://localhost:3000/books/${updatedBook.bookId}`, updatedBook);
    const index = state.books.findIndex(book => book.bookId === updatedBook.bookId);
    if (index !== -1) {
      state.books[index] = response.data; 
    }
  } catch (error) {
    console.error('Error al actualizar el libro:', error);
    throw error;
  }
}



export default {
  state,
  fetchDBBooks,
  addBookToDB,
  deleteBookFromDB,
  updateBookInDB,
};

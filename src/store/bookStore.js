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

export default {
  state,
  fetchDBBooks,
  addBookToDB,
  deleteBookFromDB,
};

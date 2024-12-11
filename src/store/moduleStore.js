import { reactive } from 'vue';
import axios from 'axios';

const state = reactive({
  modules: [],
});

async function fetchDBModules() {
  try {
    const response = await axios.get("http://localhost:3000/modules");
    state.modules = response.data;
  } catch (error) {
    console.error("Error al cargar los módulos:", error);
  }
}




export default {
  state,
  fetchDBModules,
};

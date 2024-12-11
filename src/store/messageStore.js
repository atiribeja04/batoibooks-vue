import { reactive } from 'vue';

const state = reactive({
  messages: [],
});

const appMessages = {
  get messages() {
    return state.messages;
  },

  addMessage(msg) {
    state.messages.push(msg);
    setTimeout(() => {
      state.messages.shift(); 
    }, 5000);
  },

  clearMessages() {
    state.messages = []; 
  },

  deleteMessage(index) {
    state.messages.splice(index, 1);
  },
};

export default appMessages;

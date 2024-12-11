<template>
  <div v-if="messages.length" id="messages">
    <div v-for="(message, index) in messages" :key="index">
      <p>{{ message }}</p>
    </div>
    <button class="delete-message" @click="deleteMessage(msg)">
          <span class="material-icons">delete</span>
        </button>
  </div>
</template>

<script>
import appMessages from '../store/messageStore.js';

export default {
  name: 'AppMessages',
  methods: {
    deleteMessage(msg) {
      appMessages.deleteMessage(msg);
    }
  },
  computed: {
    messages() {
      return appMessages.messages; 
    }
  }
};
</script>

<style scoped>
#messages {
  background-color: #5c5c5c;
  color: rgb(255, 255, 255);
  padding: 10px;
  border: 1px solid #ffffff;
  margin: 10px 0;
}
</style>

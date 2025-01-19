<template>
  <v-form @submit.prevent>
    <v-text-field
      v-model="userInput"
      :rules="rules"
      label="To translate"
      variant="underlined"
    />
    <v-btn
      class="btn-translate mt-2"
      type="submit"
      block
      variant="tonal"
      :disabled="loading"
      @click="fetchChatCompletion"
      >{{ loading ? "Carregando..." : "Enviar" }}</v-btn
    >
    {{ completionMessage }}
  </v-form>
</template>
  
  <script setup>
import { ref } from "vue";
import { getGroqChatCompletion } from "@/services/groqService";

const userInput = ref(""); // Texto digitado pelo usuário
const completionMessage = ref(""); // Resposta da API
const loading = ref(false); // Indica se a resposta está sendo carregada

async function fetchChatCompletion() {
  if (!userInput.value) {
    completionMessage.value = "Por favor, digite um texto.";
    return;
  }

  loading.value = true;
  completionMessage.value = ""; // Limpa a resposta anterior

  try {
    // Chama o serviço e obtém a resposta
    completionMessage.value = await getGroqChatCompletion(userInput.value);
  } catch (error) {
    console.error("Erro ao buscar resposta:", error);
    completionMessage.value = "Falha ao carregar a resposta.";
  } finally {
    loading.value = false;
  }
}
</script>
  

<style scoped>
.btn-translate {
  background: rgb(198, 239, 144);
  background: linear-gradient(
    39deg,
    rgba(198, 239, 144, 1) 0%,
    rgba(235, 183, 110, 1) 50%,
    rgba(203, 117, 91, 1) 100%
  );
  color: #201c1d;
}
</style>
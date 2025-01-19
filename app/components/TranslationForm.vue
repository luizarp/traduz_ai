<template>
  <v-form @submit.prevent>
    <v-text-field v-model="userInput" label="Text" variant="underlined" />
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          label="From"
          :items="[
            'California',
            'Colorado',
            'Florida',
            'Georgia',
            'Texas',
            'Wyoming',
          ]"
          variant="underlined"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          label="To"
          :items="[
            'California',
            'Colorado',
            'Florida',
            'Georgia',
            'Texas',
            'Wyoming',
          ]"
          variant="underlined"
        />
      </v-col>
    </v-row>
    <v-btn
      class="btn-translate mt-2"
      block
      variant="tonal"
      :disabled="loading"
      @click="fetchChatCompletion"
      >{{ loading ? "Carregando..." : "Enviar" }}</v-btn
    >
    <v-btn
      v-if="completionMessage"
      class="mt-2"
      block
      variant="tonal"
      @click="completionMessage = ''"
      >Reset</v-btn
    >
    {{ completionMessage }}
  </v-form>
</template>
  
  <script setup>
import { ref } from "vue";
import { getGroqChatCompletion } from "@/services/groqService";

const userInput = ref("");
const completionMessage = ref("");
const loading = ref(false);

async function fetchChatCompletion() {
  if (!userInput.value) {
    completionMessage.value = "Por favor, digite um texto.";
    return;
  }
  const test =
    "traduza para o inglês a frase a seguir: " +
    userInput.value +
    "retorne somente a tradução";
  loading.value = true;
  completionMessage.value = "";

  try {
    completionMessage.value = await getGroqChatCompletion(test);
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
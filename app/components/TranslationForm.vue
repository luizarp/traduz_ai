<template>
  <v-form @submit.prevent>
    <v-row>
      <v-col>
        <v-text-field v-model="userInput" label="Texto para tradução:" />
      </v-col>
    </v-row>

    <v-row class="mt-4 mt-md-8">
      <v-col cols="12" md="5">
        <v-select
          v-model="language_from"
          label="De:"
          :items="languages_list"
          item-title="language"
          item-value="language"
        />
      </v-col>
      <v-col
        cols="12"
        md="2"
        class="d-flex flex-row justify-center py-0 py-md-2"
      >
        <v-btn
          class="ma-2 d-none d-md-flex"
          variant="text"
          icon="mdi-swap-horizontal"
        />
        <v-btn class="ma-2 d-md-none" variant="text" icon="mdi-swap-vertical" />
      </v-col>
      <v-col cols="12" md="5">
        <v-select
          v-model="language_to"
          label="Para:"
          :items="languages_list"
          item-title="language"
          item-value="language"
        />
      </v-col>
    </v-row>

    <v-row class="mt-4 mt-md-8">
      <v-col cols="12">
        <v-btn
          class="btn-translate"
          block
          variant="tonal"
          :disabled="loading"
          @click="fetchChatCompletion"
          >{{ loading ? "Carregando..." : "Traduzir" }}</v-btn
        >
      </v-col>
      <v-col>
        <v-btn block variant="tonal" to="/">Voltar</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
  
  <script setup>
import { ref, reactive } from "vue";
import { getGroqChatCompletion } from "@/services/groqService";
import languages from "../assets/languages.json";

const userInput = ref("");
const completionMessage = ref("");
const loading = ref(false);
const languages_list = reactive(languages);
const language_from = ref("Português");
const language_to = ref("Inglês");

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
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
          @click="changeLanguage"
        />
        <v-btn
          class="ma-2 d-md-none"
          variant="text"
          icon="mdi-swap-vertical"
          @click="changeLanguage"
        />
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
      {{ completionMessage }}
    </v-row>
  </v-form>
</template>
  
<script setup>
import { ref, reactive } from "vue";
import { getGroqChatCompletion } from "@/services/groqService";
import languages from "../assets/languages.json";

const route = useRoute();
const router = useRouter();
const userInput = ref("");
const completionMessage = ref("");
const loading = ref(false);
const languages_list = reactive(languages);
const language_from = ref(route.query.from);
const language_to = ref(route.query.to);

function changeLanguage() {
  const l_from = language_from.value;
  language_from.value = language_to.value;
  language_to.value = l_from;
}

async function fetchChatCompletion() {
  if (!userInput.value) {
    alert("Por favor, digite um texto.");
    return;
  }

  const command = `Traduza a seguinte frase ${userInput.value} do ${language_from.value} para o ${language_to.value}. responda apenas a tradução, sem textos adicionais.`;

  loading.value = true;
  completionMessage.value = "";

  try {
    completionMessage.value = await getGroqChatCompletion(command);
  } catch (error) {
    console.error("Erro ao buscar resposta:", error);
    completionMessage.value = "Falha ao carregar a resposta.";
  } finally {
    saveTranslate(completionMessage);
    router.push({ path: "/result" });
    loading.value = false;
  }
}

async function saveTranslate(translation) {
  const translate = {
    text_translated: translation.value,
    language_from: language_from.value,
    language_to: language_to.value,
  };

  const dataJson = JSON.stringify(translate);

  const req = await fetch("http://localhost:8080/translations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: dataJson,
  });

  const res = await req.json();
  return res;
}
</script>
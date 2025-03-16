<template>
  <v-container>
    <v-row class="mt-4 mt-md-8">
      <v-col cols="12">
        <p>page result</p>
      </v-col>

      <v-col cols="12">
        <v-textarea label="Original" />
      </v-col>

      <v-col cols="12">
        <v-textarea
          v-model="result.text_translated"
          :label="result.language_to"
          readonly
          :append-icon="mdiContentCopy"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import { mdiContentCopy } from "@mdi/js";

const translations = reactive([]);
const result = ref("");

onMounted(async function getResult() {
  const req = await fetch("http://localhost:8080/translations");
  const data = await req.json();

  result.value = data[data.length - 1];
  translations.value = data;

  console.log(result.value);
});

// async function copyToClipboard() {
//   try {
//     await navigator.clipboard.writeText(result.value.text_translated);
//     alert("Texto copiado!");
//   } catch (err) {
//     console.error("Falha ao copiar o texto", err);
//   }
// }
</script>

<style>
</style>
<template>
  <v-container class="px-10 px-md-0">
    <v-row class="intro">
      <v-col cols="12">
        <h1 class="text-h4 text-md-h3 text-lg-h2 font-weight-bold">
          O Traduz.AI é uma ferramenta experimental para a tradução de textos
          utilizando Inteligência Artificial gratuita.
        </h1>
        <p class="body-1 text-md-h5 mt-5">
          Ideal para traduções simples e rápidas. Comece agora!
        </p>
      </v-col>
    </v-row>
    <v-row class="mb-2 mt-10">
      <v-col cols="12" class="py-0">
        <label>Selecione os idiomas para a tradução:</label>
      </v-col>
      <v-col>
        <v-select
          v-model="language_from"
          label="De:"
          :items="languages"
          variant="underlined"
          item-title="language"
          item-value="language"
        />
      </v-col>
      <v-col cols="1">
        <v-btn class="ma-2" icon="mdi-swap-horizontal" />
      </v-col>
      <v-col>
        <v-select
          v-model="language_to"
          label="Para:"
          :items="languages"
          variant="underlined"
          item-title="language"
          item-value="language"
        />
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col cols="12">
        <v-btn class="btn-translate mt-2" block variant="tonal" to="/translate"
          >Começar</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import languages from "../assets/languages.json";

export default {
  data() {
    return {
      languages: languages,
      language_to: "Inglês",
      language_from: "Português",
    };
  },
};
</script>


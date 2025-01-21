<template>
  <v-container class="px-10 px-md-0">
    <v-row class="intro">
      <v-col cols="12">
        <h1 class="text-h5 text-md-h3 text-lg-h2 font-weight-bold py-2">
          O Traduz.AI é uma ferramenta experimental para a tradução de textos
          utilizando Inteligência Artificial gratuita.
        </h1>
        <p class="text-md-h5 mt-md-5">
          Ideal para traduções simples e rápidas. Comece agora!
        </p>
      </v-col>
    </v-row>
    <v-row class="mb-2 mt-10">
      <v-col cols="12" class="py-0">
        <label class="text-caption text-md-body-1"
          >Selecione os idiomas para a tradução:</label
        >
      </v-col>
      <v-col cols="12" md="5">
        <v-select
          v-model="language_from"
          label="De:"
          :items="languages"
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
          :items="languages"
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

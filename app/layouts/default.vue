<template>
  <v-app>
    <AppHeader />

    <v-main class="d-flex justify-center align-center">
      <slot />
    </v-main>

    <AppFooter />
  </v-app>
</template>

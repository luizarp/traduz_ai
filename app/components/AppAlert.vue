<template>
  <v-alert
    closable
    title="Atenção"
    :text="textAlert"
    variant="tonal"
    :v-show="value"
  />
</template>

<script setup>
const props = defineProps({
  textAlert: {
    type: Object,
    required: true,
  },
  value: {
    type: Boolean,
    required: true,
  },
});
const { textAlert } = props;
</script>

<style>
</style>
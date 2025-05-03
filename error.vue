<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();
</script>

<template>
  <UApp>
    <AppHeader />
    <UMain>
      <UError
        :clear="{
          icon: 'ph:arrow-left',
          label: 'Volver al inicio',
        }"
        :error="{
          statusCode: error.statusCode,
          statusMessage: error.statusMessage,
          message: error.message,
        }"
      />
    </UMain>
    <AppFooter />
  </UApp>
</template>

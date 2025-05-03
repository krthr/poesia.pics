<script setup lang="ts">
defineOgImageComponent("Frame", {
  title: "💖 poesia.pics",
  description:
    "Transforma tus fotografías en hermosos poemas utilizando Inteligencia Artificial. Sube una imagen y descubre la poesía que esconde.",
  bg: "linear-gradient(to bottom right, #ff637e, #c70036)",
});
</script>

<template>
  <NuxtLoadingIndicator />

  <UApp id="main">
    <AppHeader />
    <UMain>
      <NuxtPage />
    </UMain>
    <AppFooter />
  </UApp>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

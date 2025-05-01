<script lang="ts" setup>
const socialNetworks = [
  {
    icon: "ph:instagram-logo",
    url: "https://instagram.com/wilson__tovar",
  },
  {
    icon: "ph:github-logo",
    url: "https://github.com/krthr",
  },
];
</script>

<template>
  <USeparator orientation="horizontal" />

  <UFooter title="Hecho con ">
    <template #left>
      <p class="inline-flex items-center space-x-1">
        <span>Hecho con</span>
        <UIcon name="ph:heart-fill" class="text-red-500 animate-heartbeat" />
        <span>por</span>
        <ULink class="font-bold" href="https://krthr.co" target="_blank">
          Wil
        </ULink>
      </p>
    </template>

    <template #right>
      <UButton
        v-for="({ icon, url }, index) in socialNetworks"
        :key="index"
        :icon="icon"
        color="neutral"
        variant="ghost"
        :to="url"
        target="_blank"
        aria-label="X"
      />
    </template>
  </UFooter>
</template>

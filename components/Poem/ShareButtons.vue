<script setup lang="ts">
import type { PoemJson } from "~/server/api/poems/[id].get";

const props = defineProps<{ poem: PoemJson }>();

const currentUrl = ref<string>("");

const title = props.poem.title;
const SHARE_BUTTONS = computed(() => [
  {
    icon: "ph:facebook-logo",
    url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl.value}`,
  },
  {
    icon: "ph:whatsapp-logo",
    url: `https://wa.me/?text=${title} ${currentUrl.value}`,
  },
  {
    icon: "ph:x-logo",
    url: `https://twitter.com/share?url=${currentUrl.value}&text=${title}`,
  },
]);

const isSharing = ref(false);
const canShare = ref(false);

async function share() {
  if (isSharing.value) {
    return;
  }

  isSharing.value = true;

  const payload = {
    title: props.poem.title,
    text: props.poem.poem,
    url: window.location.href,
  };

  try {
    await navigator.share(payload);
  } catch (error) {
    console.error(error);
  }

  isSharing.value = false;
}

if (import.meta.client) {
  currentUrl.value = window.location.href;
  canShare.value = "share" in navigator;
}
</script>

<template>
  <UPageLogos
    title="Comparte tu poema usando el hashtag #PoesiaPics"
    :ui="{ logos: 'justify-center gap-4' }"
  >
    <UButton
      v-for="({ icon, url }, index) in SHARE_BUTTONS"
      :key="index"
      :icon="icon"
      variant="ghost"
      color="neutral"
      size="xl"
      :href="url"
      target="_blank"
    />

    <UButton
      label="Compartir"
      icon="ph:share"
      variant="ghost"
      color="neutral"
      size="xl"
      :disabled="!canShare"
      :loading="isSharing"
      @click="share"
    />
  </UPageLogos>
</template>

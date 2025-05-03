<script setup lang="ts">
import type { PoemJson } from "~/server/api/poems/[id].get";

const props = defineProps<{ poem: PoemJson }>();
const poem = props.poem;

const IOS = /iPad|iPhone|iPod/;
const MACOS = /Mac OS X/;
const SAFARI = /safari|applewebkit/i;

async function generateImage() {
  console.log("generatingImage");

  try {
    const node = document.querySelector<HTMLDivElement>("#poem");

    if (!node) {
      throw new Error("No node found.");
    }

    const { toBlob } = await import("html-to-image");
    node.style.padding = "2rem";

    const userAgent = navigator.userAgent;

    if (
      SAFARI.test(userAgent) ||
      IOS.test(userAgent) ||
      MACOS.test(userAgent)
    ) {
      // https://github.com/bubkoo/html-to-image/issues/361#issuecomment-1402537176
      await toBlob(node);
      await toBlob(node);
      await toBlob(node);
    }

    const blob = await toBlob(node, {
      type: "image/jpeg",
      backgroundColor: "white",
      pixelRatio: 2,
    });

    node.style.padding = "0rem";

    if (!blob) {
      return;
    }

    return blob;
  } catch (error) {
    console.error(error);
  }
}

async function generateAndDownloadImage() {
  const title = poem.title;
  console.log({ title }, "generateAndDownloadImage");

  const blob = await generateImage();
  if (blob) {
    const dataUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = `${title.toLowerCase().trim()}-${Date.now()}.jpg`;
    a.href = dataUrl;
    a.click();

    URL.revokeObjectURL(dataUrl);
  }
}
</script>

<template>
  <div class="flex justify-center">
    <UButton
      variant="subtle"
      color="neutral"
      size="xl"
      icon="ph:download"
      @click="generateAndDownloadImage"
    >
      Descargar poema
    </UButton>
  </div>
</template>

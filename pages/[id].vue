<script setup lang="ts">
const id = useRoute().params["id"];

const { data, error } = await useFetch(`/api/poems/${id}`);

if (error.value) {
  throw createError({ ...error.value });
}

const currentUrl = window.location.href;
const SHARE_BUTTONS = [
  {
    icon: "ph:facebook-logo",
    url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
  },
  {
    icon: "ph:whatsapp-logo",
    url: `https://wa.me/?text=${data.value?.title} ${currentUrl}`,
  },
  {
    icon: "ph:x-logo",
    url: `https://twitter.com/share?url=${currentUrl}&text=${data.value?.title}`,
  },
];
</script>

<template>
  <UPage>
    <UPageBody>
      <UPageSection
        :title="data?.title"
        :ui="{
          container: 'py-2 sm:py-4 lg:py-8',
          title: 'font-serif italic',
          wrapper: 'order-last',
        }"
        orientation="horizontal"
      >
        <div class="w-full h-full flex justify-start lg:justify-end">
          <div class="w-full">
            <NuxtImg
              :placeholder="data?.imagePreview!"
              class="rounded-md w-full"
              format="auto"
              :src="data?.imagePath"
              :style="{ aspectRatio: data?.imageRatio }"
              width="100%"
            />
          </div>
        </div>

        <template #description>
          <p class="whitespace-pre-wrap font-serif">
            {{ data?.poem }}
          </p>

          <UBadge class="mt-4" color="neutral" variant="soft">
            {{ data?.mood }}
          </UBadge>

          <USeparator
            class="my-6 font-serif italic"
            label="poesia.pics"
            orientation="horizontal"
            type="dashed"
          />

          <div>
            <UAlert
              icon="ph:clock"
              :description="`Tu poema será eliminado en ${data?.remainingHours} horas`"
              color="warning"
              variant="soft"
            />
          </div>

          <!-- <UPageLogos
            title="Comparte tu poema usando el hashtag #PoesiaPics"
            :ui="{ logos: 'justify-center' }"
          >
            <UButton
              icon="ph:x-logo"
              variant="ghost"
              color="neutral"
              size="xl"
            />
            <UButton
              icon="ph:facebook-logo"
              variant="ghost"
              color="neutral"
              size="xl"
            />
            <UButton
              icon="ph:whatsapp-logo"
              variant="ghost"
              color="neutral"
              size="xl"
            />
          </UPageLogos> -->
        </template>
      </UPageSection>

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
        />
      </UPageLogos>
    </UPageBody>
  </UPage>
</template>

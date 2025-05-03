<script setup lang="ts">
import { MOODS_DICT } from "~/server/constants/moods";

const id = useRoute().params["id"];

const { data, error } = await useFetch(`/api/poems/${id}`);

if (error.value) {
  throw createError({ ...error.value });
}

const mood = data.value?.mood;
const moodLabel = mood ? MOODS_DICT[mood].label : undefined;
</script>

<template>
  <UPage>
    <UPageBody>
      <UPageSection
        id="poem"
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

          <UBadge v-if="moodLabel" class="mt-4" color="neutral" variant="soft">
            {{ moodLabel }}
          </UBadge>

          <USeparator
            class="my-6 font-serif italic"
            label="poesia.pics"
            orientation="horizontal"
            type="dashed"
          />
        </template>
      </UPageSection>

      <UPageSection :ui="{ container: 'py-0!' }">
        <div class="mx-auto max-w-[400px]">
          <UAlert
            icon="ph:clock"
            :description="`Tu poema será eliminado en ${data?.remainingHours} horas`"
            color="warning"
            variant="outline"
          />
        </div>
      </UPageSection>

      <PoemShareButtons :poem="data!" />
      <PoemDownload :poem="data!" />
    </UPageBody>
  </UPage>
</template>

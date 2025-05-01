<script setup lang="ts">
const id = useRoute().params["id"];

const { data, error } = await useFetch(`/api/poems/${id}`);

if (error.value) {
  throw createError({ ...error.value });
}
</script>

<template>
  <UPage>
    <UPageBody>
      <UPageSection
        :title="data?.title"
        :ui="{
          title: 'font-serif italic',
          description: 'whitespace-pre-wrap font-serif',
          wrapper: 'order-last',
        }"
        orientation="horizontal"
      >
        <div class="w-full h-full flex justify-start lg:justify-end">
          <NuxtImg
            :src="data?.imagePath!"
            :placeholder="data?.imagePreview!"
            class="rounded-md"
            format="auto"
            :style="{ aspectRatio: data?.imageRatio }"
          />
        </div>

        <template #description>
          <p>
            {{ data?.poem }}
          </p>

          <USeparator
            class="mt-6"
            label="poesia.pics"
            orientation="horizontal"
            type="dashed"
          />
        </template>
      </UPageSection>
    </UPageBody>
  </UPage>
</template>

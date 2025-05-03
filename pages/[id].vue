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
        </template>
      </UPageSection>

      <PoemShareButtons :poem="data!" />
    </UPageBody>
  </UPage>
</template>

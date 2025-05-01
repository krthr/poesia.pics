<script setup lang="ts">
import type { InputMenuItem } from "@nuxt/ui";

import { MOODS_LIST } from "~/server/constants/moods";

const toast = useToast();
const imageInput = ref<HTMLInputElement | null>(null);

const moods = computed(() =>
  MOODS_LIST.map(
    (mood) =>
      ({
        label: mood.label,
        key: mood.key,
      } as InputMenuItem)
  )
);

const form = reactive({ mood: "default", image: undefined, loading: false });

function pickImage() {
  imageInput.value!.click();
}

async function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.item(0);

  if (file) {
    form.loading = true;

    const formData = new FormData();
    formData.append("mood", form.mood);
    formData.append("image", file);

    const newPoem = await $fetch("/api/poems", {
      method: "POST",
      body: formData,
      ignoreResponseError: true,
    });

    if ("id" in newPoem) {
      toast.add({ title: "Poema creado exitosamente", color: "success" });
      await navigateTo({ name: "id", params: { id: newPoem.id } });
    } else {
      toast.add({
        description: newPoem.statusMessage,
        color: "error",
        title: "Ups",
      });
    }
  }

  form.loading = false;
}
</script>

<template>
  <UPage>
    <UPageHero
      description="Con Inteligencia Artificial convertimos tus fotografías en poemas."
      headline="¡Nueva versión!"
    >
      <template #title>
        Tus imágenes se <br />
        vuelven <span class="italic font-serif">poesía</span>
      </template>

      <template #links>
        <UForm
          :state="form"
          class="max-w-[450px] space-y-6"
          :disabled="form.loading"
        >
          <div class="flex flex-wrap justify-center space-x-4 items-end w-full">
            <UFormField name="mood" size="xl" class="max-w-[200px] w-full">
              <template #label>
                <span class="inline-flex items-center">
                  Selecciona la emoción
                  <UTooltip
                    class="ml-1"
                    text="La emoción puede influir en el resultado del poema. Por ejemplo, al seleccionar Melancolía tu poema puede sonar un poco más triste."
                  >
                    <UIcon name="ph:question" size="1.2em" />
                  </UTooltip>
                </span>
              </template>

              <USelect
                v-model="form.mood"
                :items="moods"
                value-key="key"
                size="xl"
                required
                :ui="{ base: 'w-full' }"
              />
            </UFormField>

            <UButton
              size="xl"
              :trailing-icon="form.loading ? '' : 'ph:upload'"
              :loading="form.loading"
              @click="pickImage"
            >
              <span class="max-sm:hidden">
                {{ form.loading ? "Escribiendo..." : "Subir Imagen" }}
              </span>
            </UButton>
          </div>

          <input
            ref="imageInput"
            name="image"
            type="file"
            accept="image/jpg,image/png,image/webp,image/jpeg,image/heic,image/jfif"
            hidden
            required
            @change="onFileChange"
          />

          <p class="max-w-[300px] text-xs mx-auto text-center">
            Puede que obtengas mejores resultados con fotografías de paisajes y
            retratos.
          </p>

          <div>
            <UAlert
              class="max-w-[420px] mx-auto"
              title="Pasadas 24 horas desde la creación del poema su contenido e imagen serán eliminados."
              color="warning"
              icon="ph:info"
              variant="soft"
            />
          </div>
        </UForm>
      </template>
    </UPageHero>
  </UPage>
</template>

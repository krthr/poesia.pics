<script setup lang="ts">
import { NuxtImg, NuxtLink } from "#components";
import type { TableColumn } from "@nuxt/ui";
import type { poemsWithExtraFields } from "~/server/db/schema";

const password = useRoute().query["password"];

const { data, status } = await useFetch("/api/poems", {
  query: { password },
  server: false,
});

const columns: TableColumn<typeof poemsWithExtraFields.$inferSelect> = [
  {
    id: "image",
    cell: ({ row }) => {
      const src = row.original.imageUrl + `?password=${password}`;

      return h(NuxtLink, { to: row.original.id, target: "_blank" }, [
        h(NuxtImg, {
          class: "max-w-[100px] rounded-md",
          src,
        }),
      ]);
    },
  },
  {
    accessorKey: "title",
    cell: ({ row }) => {
      return h("p", { class: "font-bold" }, [
        h(
          NuxtLink,
          { to: row.original.id, target: "_blank" },
          () => row.original.id
        ),
        h("br"),
        h(
          NuxtLink,
          { to: row.original.id, target: "_blank" },
          () => row.original.title
        ),
      ]);
    },
  },
  {
    accessorKey: "remainingHours",
    header: "Quedan",
    cell: ({ row }) => (row.original.remainingHours as number).toFixed(0),
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleString("es-CO", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    },
  },
];
</script>

<template>
  <UPage>
    <UPageSection title="Administrar poemas">
      <UTable
        :columns="columns"
        :data="data?.poems || []"
        :loading="status === 'pending'"
        sticky
        :ui="{ root: 'bg-white rounded-md' }"
      />
    </UPageSection>
  </UPage>
</template>

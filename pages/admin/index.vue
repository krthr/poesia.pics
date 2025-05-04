<script setup lang="ts">
import { NuxtLink } from "#components";
import type { TableColumn } from "@nuxt/ui";
import type { poemsWithExtraFields } from "~/server/db/schema";

const password = useRoute().query["password"];

const { data } = await useFetch("/api/poems", {
  query: { password },
  server: false,
});

const columns: TableColumn<typeof poemsWithExtraFields.$inferSelect> = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => {
      return h(
        NuxtLink,
        { to: row.getValue("id"), target: "_blank", class: "font-bold" },
        () => row.getValue("id")
      );
    },
  },
  { accessorKey: "title" },
  { accessorKey: "remainingHours" },
  {
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleString("es-CO", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
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
        sticky
        :ui="{ root: 'bg-white rounded-md' }"
      />
    </UPageSection>
  </UPage>
</template>

<template>
  <div>
    <div class="font-bold">{{ ProgramIndicator?.description }}</div>
    <div class="">{{ ProgramIndicator.Program.Partner.name }}</div>
    <div class="italic">{{ ProgramIndicator.Program.name }}</div>

    <!-- {{ data }} -->
    <div class="border-2" />
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;

const { data } = defineProps(["data"]);

const { data: ProgramIndicator } = await useFetch(
  `${BASE_URL}/programindicator/${data.ProgramIndicatorId}`
);
</script>

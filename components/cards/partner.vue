<template>
  <div
    class="flex flex-col justify-between primeBox text-sm px-2 hover:text-white hover:bg-stop hover:cursor-pointer mb-2"
  >
    <div class="text-center">
      <div class="font-bold">
        {{ partner.name }}
      </div>
      <div class="italic">
        {{ partner.chief }}
      </div>
      <div class="">
        {{ partner.Institution.name }}
      </div>
    </div>
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;

const { PartnerId } = defineProps(["PartnerId"]);
const { data: partner, status } = await useFetch(
  `${BASE_URL}/partner/${PartnerId}`
);
</script>

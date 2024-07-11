<template>
  <div class="w-[800px] border-4 h-full">
    <div class="px-2 font-bold">
      {{ title }}
    </div>
    <div class="px-2 italic">
      {{ description }}
    </div>
  </div>
</template>

<script setup>
const { title, description } = defineProps(["title", "description"]);
</script>

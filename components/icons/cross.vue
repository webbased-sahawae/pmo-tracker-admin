<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-dasharray="12"
      stroke-dashoffset="12"
      stroke-linecap="round"
      stroke-width="2"
      d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5"
    >
      <animate
        fill="freeze"
        attributeName="stroke-dashoffset"
        dur="0.4s"
        values="12;0"
      ></animate>
    </path>
  </svg>
</template>

<script setup>
const { width, height } = defineProps(["width", "height"]);
</script>

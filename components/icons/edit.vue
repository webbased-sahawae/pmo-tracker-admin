<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
  >
    <path fill="currentColor" fillOpacity="0" d="M20 7L17 4L8 13V16H11L20 7Z">
      <animate
        fill="freeze"
        attributeName="fill-opacity"
        begin="1.2s"
        dur="0.15s"
        values="0;0.3"
      ></animate>
    </path>
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <path stroke-dasharray="20" stroke-dashoffset="20" d="M3 21H21">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.3s"
          values="20;0"
        ></animate>
      </path>
      <path
        stroke-dasharray="44"
        stroke-dashoffset="44"
        d="M7 17V13L17 3L21 7L11 17H7"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.4s"
          dur="0.6s"
          values="44;0"
        ></animate>
      </path>
      <path stroke-dasharray="8" stroke-dashoffset="8" d="M14 6L18 10">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="1s"
          dur="0.2s"
          values="8;0"
        ></animate>
      </path>
    </g>
  </svg>
</template>

<script>
export default {
  name: "LineMdEditTwotoneFull",
};
</script>
<script setup>
const { width, height } = defineProps(["width", "height"]);
</script>

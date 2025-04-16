<!-- components/ChildComponent.vue -->
<template>
  <div>
    <PrimeButton @click="childMethod" label="Child 2" severity="danger" />
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["update"]);

const childMethod = () => {
  console.log("Button clicked in Child 2");
  emit("update");
  console.log("finish in Child 2");
};
</script>

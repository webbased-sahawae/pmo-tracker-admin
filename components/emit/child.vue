<!-- components/ChildComponent.vue -->
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const message = ref("Hello from Child Component!");

const childMethod = async () => {
  console.log("from another child");
};

// Expose the method to the parent
defineExpose({
  childMethod,
});
</script>

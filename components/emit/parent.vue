<!-- pages/index.vue or components/ParentComponent.vue -->
<template>
  <div>
    <EmitChild ref="childRef" />
    <EmitChild2 @update="callChildMethod" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const childRef = ref(null);
// console.log(childRef.value.childMethod);
const callChildMethod = () => {
  console.log(childRef.value.childMethod);
  if (childRef.value && childRef.value.childMethod) {
    childRef.value.childMethod();
  }
};
</script>

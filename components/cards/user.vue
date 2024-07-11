<template>
  <div
    class="flex flex-col justify-between primeBox text-sm px-2 hover:text-white hover:bg-stop hover:cursor-pointer"
  >
    <div class="text-center">
      <div class="font-bold">
        {{ user.name }}
      </div>
      <div class="text-sm">
        {{ user.Partner.name }}
      </div>
    </div>
    <div :class="`flex items-center  ${userLevelColor(user.UserLevel.name)}`">
      <span :class="`text-base`"
        >⦿
        <span class="text-xs">
          {{ user.UserLevel.name }}
        </span>
      </span>
    </div>
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;

const { UserId } = defineProps(["UserId"]);
const { data: user, status } = await useFetch(`${BASE_URL}/user/${UserId}`);
const userLevelColor = (value) => {
  if (value == "Pengurus") return "text-emerald-600";
  else if (value == "PMO") return "text-yellow-600";
  else if (value == "Guest") return "text-blue-600";
  else if (value == "Direksi") return "text-red-600";
  else return "";
};
</script>

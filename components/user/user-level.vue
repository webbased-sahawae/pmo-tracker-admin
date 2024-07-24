<template>
  <div>
    <ul>
      <li v-for="(level, index) in data" :key="index">
        <div class="flex items-center">
          <icons-cross
            width="15"
            class="text-pred cursor-pointer font-black"
            @click="
              () => {
                deleteLevel(level.id);
              }
            "
          />
          {{ level.UserLevel.name }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import pmoAPI from "../composables/rest-api";

import { useToast } from "primevue/usetoast";
const toast = useToast();

const { UserId } = defineProps(["UserId"]);

const { data } = await pmoAPI.getUserLevel(UserId);

const deleteLevel = async (levelId) => {
  try {
    toast.add({
      severity: "success",
      summary: 200,
      detail: "Cobaasdsd",
      life: 10000,
    });
    // console.log(levelId);
  } catch (error) {
    console.log(error);
  }
};
</script>

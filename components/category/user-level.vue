<template>
  <div>
    <ul>
      <li v-for="(level, index) in dataLevel" :key="index">
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

const dataLevel = ref([]);
const { UserId, onDelete } = defineProps(["UserId", "onDelete"]);

const { data } = await pmoAPI.getUserLevel(UserId);
dataLevel.value = data.value;
const deleteLevel = async (levelId) => {
  try {
    const {
      data: dataDeleted,
      error,
      status,
    } = await pmoAPI.deleteUserLevel(levelId);
    if (status.value == "error") throw error.value;
    const { data: dataAfterDelete } = await pmoAPI.getUserLevel(UserId);
    dataLevel.value = dataAfterDelete.value;
    toast.add({
      severity: "info",
      summary: 200,
      detail: dataDeleted.value,
      life: 10000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: error.statusCode,
      detail: error.data.message,
      life: 10000,
    });
  }
};
</script>

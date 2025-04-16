<template>
  <div>
    <ul>
      <li v-for="(assignment, index) in assignments" :key="assignment.id">
        <div class="flex items-center">
          <icons-cross
            width="15"
            class="text-pred cursor-pointer font-black"
            @click="
              () => {
                deleteAssignment(assignment.id);
              }
            "
          />
          {{ assignment.Partner.name }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import pmoAPI from "../composables/rest-api";
import { useToast } from "primevue/usetoast";
const toast = useToast();

// const isRefresh = ref(false);
const assignments = ref([]);
const props = defineProps(["UserId", "isRefresh"]);
const refreshData = async () => {
  const { data } = await pmoAPI.getAssignmentByUserId(props.UserId);
  assignments.value = data.value;
};
await refreshData();
const deleteAssignment = async (AssignmentId) => {
  try {
    const {
      data: dataDeleted,
      error,
      status,
    } = await pmoAPI.deleteAssignment(AssignmentId);
    if (status.value == "error") throw error.value;
    const { data: dataAfterDelete } = await pmoAPI.getAssignmentByUserId(
      props.UserId
    );
    assignments.value = dataAfterDelete.value;
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
watch(
  () => props.isRefresh,
  async () => {
    await refreshData();
  }
);
</script>

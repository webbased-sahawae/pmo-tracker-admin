<template>
  <div
    class="border-4 border-dsecondary p-2 rounded-2xl bg-white shadow-md delay-[5000ms]"
  >
    <h2
      class="text-lg font-semibold text-left mb-4 cursor-pointer"
      @click="toggleForm"
    >
      Assign PMO
    </h2>
    <transition name="slide-fade">
      <div v-if="showForm">
        <div class="mb-4">
          <AssignmentSearchUser :assignedUser="setSelectedUser" />
        </div>
        <div class="mb-4">
          <AssignmentSearchPartner :assignedPartner="setSelectedPartner" />
        </div>
        <div
          class="text-center"
          v-if="
            (selectedUser.name || selectedUser.email) && selectedPartner.name
          "
        >
          <button
            @click="createUserAssignment"
            class="px-4 py-2 bg-dsecondary text-white rounded-lg hover:bg-dsecondary-dark transition-colors duration-200"
          >
            Assign
            {{ selectedUser.name ? selectedUser.name : selectedUser.email }} to
            {{ selectedPartner.name }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import pmoAPI from "../composables/rest-api";
const emit = defineEmits(["refreshTable"]);

const selectedUser = ref({});
const selectedPartner = ref({});
const toast = useToast();
const showForm = ref(false);

const setSelectedUser = (value) => (selectedUser.value = value);
const setSelectedPartner = (value) => (selectedPartner.value = value);

const toggleForm = () => {
  selectedPartner.value = {};
  selectedUser.value = {};
  showForm.value = !showForm.value;
};

const toastMessage = (severity, code, message) => {
  toast.add({
    severity,
    summary: code,
    detail: message,
    life: 10000,
  });
};

const createUserAssignment = async () => {
  if (selectedUser.value && selectedPartner.value) {
    try {
      const {
        data: resultAddAssignment,
        status,
        error,
      } = await pmoAPI.createUserAssignment(
        selectedUser.value.id,
        selectedPartner.value.id
      );
      if (status.value == "error") throw error.value;

      console.log(resultAddAssignment);
      toast.add({
        severity: "success",
        summary: 200,
        detail: resultAddAssignment.value,
        life: 10000,
      });
      emit("refreshTable");
    } catch (error) {
      console.log(error);
      toast.add({
        severity: "error",
        summary: error.statusCode,
        detail: error.data.message,
        life: 10000,
      });
    }
  } else {
    toastMessage("error", 500, `Error: Please fill in all fields`);
  }
};
</script>

<style scoped>
.border-dsecondary {
  border-color: #ffb300; /* Replace with your desired secondary color */
}

.bg-dsecondary {
  background-color: #ffb300; /* Replace with your desired secondary color */
}

.hover\:bg-dsecondary-dark:hover {
  background-color: #ffb300; /* Replace with your desired darker secondary color */
}

.focus\:ring-dsecondary:focus {
  --tw-ring-color: #ffb300; /* Replace with your desired secondary color */
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

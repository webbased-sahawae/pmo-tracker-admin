<template>
  <div
    class="border-4 border-dsecondary p-2 rounded-2xl bg-white shadow-md delay-[5000ms]"
  >
    <h2
      class="text-lg font-semibold text-left mb-4 cursor-pointer"
      @click="toggleForm"
    >
      Add New User
    </h2>
    <transition name="slide-fade">
      <div v-if="showForm">
        <div class="mb-4">
          <input
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dsecondary"
            placeholder="Email"
            id="email"
            type="email"
            :value="email"
            @keydown="removeSpaces"
            @input="updateEmail"
          />
        </div>
        <div class="mb-4">
          <select
            v-model="selectedCategory"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dsecondary"
          >
            <option disabled value="">Select Category</option>
            <option
              v-for="userLevel in userLevelList"
              :key="userLevel.id"
              :value="userLevel.id"
            >
              {{ userLevel.name }}
            </option>
          </select>
        </div>
        <div class="text-center">
          <button
            @click="addUser"
            class="px-4 py-2 bg-dsecondary text-white rounded-lg hover:bg-dsecondary-dark transition-colors duration-200"
          >
            Add User
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
const email = ref("");
const selectedCategory = ref("");
const toast = useToast();
const showForm = ref(false);

const userLevelList = await pmoAPI.getUserLevelList();

const toggleForm = () => {
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

const removeSpaces = (e) => {
  if (e.key === " ") {
    e.preventDefault();
  }
};

const updateEmail = (e) => {
  email.value = e.target.value.toLowerCase();
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const addUser = async () => {
  if (email.value && selectedCategory.value) {
    if (!validateEmail(email.value)) {
      toastMessage("error", 500, `Error: Please enter a valid email address`);
      return;
    }
    try {
      const {
        data: createUser,
        error: errorCreateUser,
        status: createUserStatus,
      } = await pmoAPI.createUserAndLevel(email.value, selectedCategory.value);
      if (createUserStatus.value == "error") throw errorCreateUser.value;

      toast.add({
        severity: "success",
        summary: 200,
        detail: createUser.value,
        life: 10000,
      });
      emit("refreshTable");
      email.value = "";
      selectedCategory.value = "";
    } catch (error) {
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

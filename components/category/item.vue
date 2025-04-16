<template>
  <td class="py-2 px-4 border-b border-gray-300">{{ data.index + 1 }}</td>
  <td v-if="!isEdit && !isDelete" class="py-2 px-4 border-b border-gray-300">
    {{ data.category.name }}
  </td>
  <td v-if="isEdit && !isDelete" class="py-2 px-4 border-b border-gray-300">
    <input
      :value="editValue"
      @keydown="
        (e) => {
          editValue = e.target.value;
        }
      "
    />
    {{ editValue }}
  </td>
  <td v-if="!isEdit && isDelete" class="py-2 px-4 border-b border-gray-300">
    <div>
      <div class="flex gap-4 items-center">
        <span class="font-bold text-pred">
          {{ data.category.name }}
        </span>
        <span> change into </span>
        <select
          v-model="selectedCategory"
          class="px-3 text-complete font-bold py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dsecondary"
        >
          <option disabled value="">Choose a Replacement Category</option>
          <option
            v-for="category in categoriesOption"
            :key="category.id"
            :value="category.id"
            class="text-black"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>
  </td>

  <td class="py-2 px-4 border-b border-gray-300 h-full">
    <div v-if="!isEdit && !isDelete" class="flex gap-2">
      <button
        class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-200 flex items-center"
        @click="() => (isDelete = true)"
      >
        <icons-cross width="20" />
      </button>
      <button
        class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors duration-200 flex items-center"
        @click="
          () => {
            editValue = data.category.name;
            isEdit = !isEdit;
          }
        "
      >
        <icons-edit width="20" />
      </button>
    </div>
    <div v-if="isEdit && !isDelete" class="flex gap-2">
      <button
        class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors duration-200 flex items-center"
        @click="() => (isEdit = !isEdit)"
      >
        Cancel
      </button>
      <button
        class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-200 flex items-center"
      >
        Save
      </button>
    </div>
    <div v-if="!isEdit && isDelete" class="flex gap-2">
      <button
        class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-red-700 transition-colors duration-200 flex items-center"
        @click="
          () => {
            selectedCategory = '';
            isDelete = !isDelete;
          }
        "
      >
        Cancel
      </button>
      <button
        class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-200 flex items-center"
        @click="deleteCategory"
      >
        Delete
      </button>
    </div>
  </td>
</template>

<script setup>
import pmoAPI from "../composables/rest-api";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const { data } = defineProps(["data"]);
const isEdit = ref(false);
const isDelete = ref(false);
const editValue = ref("");
const selectedCategory = ref("");
const deleteCategory = async () => {
  if (selectedCategory.value.length < 1) {
    toast.add({
      severity: "error",
      summary: 500,
      detail: `Please select a replacement category for ${data.category.name} before delete!`,
      life: 10000,
    });
  }
};

const { data: categoriesOption } = await pmoAPI.getExceptedCategoryList(
  data.category.id
);
</script>
<style scoped>
.border-dsecondary {
  border-color: #ffb300; /* Replace with your desired secondary color */
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #f4f4f4;
}

.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.bg-red-500 {
  background-color: #f56565;
}

.hover\:bg-red-700:hover {
  background-color: #c53030;
}

.bg-yellow-500 {
  background-color: #ecc94b;
}

.hover\:bg-yellow-700:hover {
  background-color: #d69e2e;
}

.bg-green-500 {
  background-color: #4bec63;
}

.hover\:bg-green-700:hover {
  background-color: #36d62e;
}
</style>

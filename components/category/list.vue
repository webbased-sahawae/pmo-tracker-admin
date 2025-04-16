<template>
  <div class="border-4 border-dsecondary p-2 rounded-2xl bg-white shadow-md">
    <h2 class="text-lg font-semibold text-left mb-4">Categories</h2>

    <div class="mb-4"></div>
    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>
    <div v-else>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b border-gray-300 text-left">No</th>
            <th class="py-2 px-4 border-b border-gray-300 text-left">Name</th>
            <th class="py-2 px-4 border-b border-gray-300 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in data" :key="category.id">
            <category-item :data="{ category, index }" />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import pmoAPI from "../composables/rest-api";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const search = ref("");
const page = ref(1);
const data = ref([]);
const loading = ref(false);

const refreshList = async () => {
  const { data: dataAPI } = await pmoAPI.getCategoryList();

  // console.log(dataAPI);

  data.value = dataAPI.value;
};

// defineExpose({
//   refreshList,
// });
await refreshList();

watch([page, search], async () => {
  try {
    const { data: dataAPI } = await pmoAPI.getRegisteredUsers(
      search.value,
      page.value
    );
    data.value = dataAPI.value;
  } catch (error) {
    console.log(error);
  }
});
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
</style>

<template>
  <div class="border-4 border-dsecondary p-2 rounded-2xl bg-white shadow-md">
    <h2 class="text-lg font-semibold text-left mb-4">Registered Users</h2>
    {{ page }}
    <div class="">
      <div v-if="data.totalPages > 20">
        Page:
        <select
          @change="
            (e) => {
              page = e.target.value;
            }
          "
        >
          <option
            v-for="index in data.totalPages"
            :selected="data.currentPage == index"
            :value="index"
          >
            {{ index }}
          </option>
        </select>
      </div>
      <div v-if="data.totalPages <= 20" class="flex gap-2 flex-wrap">
        {{ data.totalPages == 1 ? "Page" : "Pages:" }}
        <div
          v-for="index in data.totalPages"
          :key="index"
          :class="`${
            data.currentPage == index ? 'text-blue font-bold' : 'cursor-pointer'
          }`"
          @click="() => (page = index)"
        >
          {{ index }}
        </div>
      </div>
    </div>
    <div class="mb-4">
      <input
        type="text"
        :value="search"
        @keyup="
          (e) => {
            if (e.target.value.length == 0) search = '';
          }
        "
        @change="
          (e) => {
            search = e.target.value;
          }
        "
        placeholder="Search users..."
        class="p-2 border rounded w-full"
      />
      {{ search }}
    </div>
    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>
    <div v-else>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b border-gray-300 text-left">No</th>
            <th class="py-2 px-4 border-b border-gray-300 text-left">Name</th>
            <th class="py-2 px-4 border-b border-gray-300 text-left">Email</th>
            <th class="py-2 px-4 border-b border-gray-300 text-left">Levels</th>
            <th class="py-2 px-4 border-b border-gray-300 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in data.users" :key="user.id">
            <td class="py-2 px-4 border-b border-gray-300">
              {{ user.recordNumber }}
            </td>
            <td class="py-2 px-4 border-b border-gray-300">{{ user.name }}</td>
            <td class="py-2 px-4 border-b border-gray-300">{{ user.email }}</td>
            <td class="py-2 px-4 border-b border-gray-300">
              <user-level :UserId="user.id" :key="`userLevel${user.id}`" />
              <!-- as/s -->
            </td>
            <td class="py-2 px-4 border-b border-gray-300">
              <button
                @click="deleteUser(user.id)"
                class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-200 flex items-center"
              >
                <icons-delete-user />
                User
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import pmoAPI from "../composables/rest-api";

const search = ref("");
const page = ref(1);
const data = ref({});
const loading = ref(false);

const { data: dataAPI } = await pmoAPI.getRegisteredUsers(
  search.value,
  page.value
);
data.value = dataAPI.value;
const deleteUser = async (userId) => {
  try {
    // Simulate API call to delete user
    // const response = await fetch(`https://your-api-endpoint.com/deleteUser/${userId}`, {
    //   method: 'DELETE'
    // });
    // if (!response.ok) {
    //   throw new Error('Failed to delete user');
    // }

    // Remove user from local array
    users.value = users.value.filter((user) => user.id !== userId);
    alert("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Failed to delete user");
  }
};

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

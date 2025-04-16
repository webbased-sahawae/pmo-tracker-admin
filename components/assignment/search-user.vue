<template>
  <div class="card flex justify-content-center">
    <PrimeDropdown
      v-model="selectedUser"
      :options="users"
      filter
      :optionLabel="searchUser"
      placeholder="Enter Name or Email"
      class="w-full md:w-14rem"
      @filter="(e) => (filterKey = e.value)"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex align-items-center flex-col">
          <div v-if="slotProps.value.name" class="flex gap-2">
            <IconsUser width="20" />
            <div>{{ slotProps.value.name }}</div>
          </div>
          <div v-if="slotProps.value.email" class="flex gap-2">
            <IconsEmail width="20" />
            <div>{{ slotProps.value.email }}</div>
          </div>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="flex align-items-center flex-col">
          <div v-if="slotProps.option.name" class="flex gap-2">
            <!-- <IconsUser width="20" /> -->
            <div>{{ slotProps.option.name }}</div>
          </div>
          <div v-if="slotProps.option.email" class="flex gap-2">
            <!-- <IconsEmail width="20" /> -->
            <div>{{ slotProps.option.email }}</div>
          </div>
        </div>
      </template>
    </PrimeDropdown>
  </div>
</template>

<script setup>
import pmoAPI from "../composables/rest-api";
const { assignedUser } = defineProps(["assignedUser"]);
const filterKey = ref("");
const selectedUser = ref();
const users = ref([]);

const { data: dataInit } = await pmoAPI.getRegisteredUsers(filterKey.value);
users.value = dataInit.value.users;

const searchUser = (user) => {
  return `${user.name} ${user.email}`;
};

watch(selectedUser, () => {
  assignedUser(selectedUser.value);
});

watch(filterKey, async () => {
  try {
    // if (filterKey.value.length > 3) console.log(filterKey.value);
    const { data: dataAPI } = await pmoAPI.getRegisteredUsers(filterKey.value);
    users.value = dataAPI.value.users;
  } catch (error) {
    console.log(error);
  }
});
</script>

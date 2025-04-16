<template>
  <div class="flex flex-col gap-2">
    <UserAdd @refresh-table="() => (isRefresh = true)" />
    <UserList ref="refUserList" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const refUserList = ref(null);
const isRefresh = ref(false);

watch(isRefresh, async () => {
  console.log("REFRESHING DATA");
  if (refUserList.value && refUserList.value.refreshList && isRefresh) {
    await refUserList.value.refreshList();
  }
  isRefresh.value = false;
});
</script>

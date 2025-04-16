<template>
  <div class="flex flex-col gap-2">
    <AssignmentAdd @refresh-table="() => (isRefresh = true)" />
    <AssignmentUserList ref="refAssignmentList" />
  </div>
</template>
<script setup>
const refAssignmentList = ref(null);
const isRefresh = ref(false);

watch(isRefresh, async () => {
  if (
    refAssignmentList.value &&
    refAssignmentList.value.refreshData &&
    isRefresh
  ) {
    await refAssignmentList.value.refreshData();
  }
  isRefresh.value = false;
});
</script>

<template>
  <div class="px-5">
    <FormsProgram />
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;
const { dataProgram } = useProgram();
const { ProgramId } = useRoute().params;
const { data } = await useFetch(`${BASE_URL}/program/${ProgramId}`);
dataProgram.value = {
  program: {
    id: data.value.id,
    PartnerId: data.value.PartnerId,
    name: data.value.name,
    rapimnas: data.value.rapimnas,
  },
  vision: data.value.ProgramVisions ? data.value.ProgramVisions : [],
  driver: data.value.ProgramDrivers ? data.value.ProgramDrivers : [],
  indicator: data.value.ProgramIndicators ? data.value.ProgramIndicators : [],
  phase: data.value.ProgramPhases ? data.value.ProgramPhases : [],
  PartnerPosition: data.value.ProgramPartnerPosition
    ? data.value.ProgramPartnerPosition
    : [],
  partner: data.value.ProgramPartner ? data.value.ProgramPartner : [],
  priority: data.value.ProgramPriority ? data.value.ProgramPriority : [],
};
</script>

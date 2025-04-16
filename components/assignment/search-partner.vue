<template>
  <div class="card flex justify-content-center">
    <PrimeDropdown
      v-model="selectedPartner"
      :options="partners"
      filter
      :optionLabel="searchPartner"
      placeholder="Enter Bidang / Badan / Pokja / Assosiasi / Perusahaan"
      class="w-full md:w-14rem"
      @filter="(e) => (filterKey = e.value)"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex align-items-center flex-col">
          <div v-if="slotProps.value.name" class="flex gap-2">
            <IconsSunny width="20" />
            <div>{{ slotProps.value.name }}</div>
          </div>
          <div v-if="slotProps.value.chief" class="flex gap-2">
            <IconsUser width="20" />
            <div>{{ slotProps.value.chief }}</div>
          </div>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="flex align-items-center flex-col">
          <div v-if="slotProps.option.name" class="flex gap-2">
            <!-- <IconsSunny width="20" /> -->
            <div>{{ slotProps.option.name }}</div>
          </div>
          <div v-if="slotProps.option.chief" class="flex gap-2">
            <!-- <IconsUser width="20" /> -->
            <div>{{ slotProps.option.chief }}</div>
          </div>
        </div>
      </template>
    </PrimeDropdown>
  </div>
</template>

<script setup>
import pmoAPI from "../composables/rest-api";
const { assignedPartner } = defineProps(["assignedPartner"]);

const filterKey = ref("");
const selectedPartner = ref();
const partners = ref([]);

const refreshData = async (value) => {
  const { data: dataInit } = await pmoAPI.searchPartners(value);
  partners.value = dataInit.value.partners;
};

await refreshData();
const searchPartner = (partner) => {
  return `${partner.name} ${partner.chief}`;
};

watch(selectedPartner, () => {
  assignedPartner(selectedPartner.value);
});

watch(filterKey, async () => {
  try {
    // if (filterKey.value.length > 3) console.log(filterKey.value);
    await refreshData(filterKey.value);
    // const { data: dataAPI } = await pmoAPI.searchPartners(filterKey.value);
    // partners.value = dataAPI.value.partners;
  } catch (error) {
    console.log(error);
  }
});
</script>

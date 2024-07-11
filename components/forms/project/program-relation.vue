<template>
  <div>
    <div class="flex flex-col gap-2">
      <div
        :class="`cursor-pointer ${!openAddKpi && 'buttonAdd'}`"
        @click.prevent="openAddKpi = !openAddKpi"
      >
        {{ openAddKpi ? "New KPI" : "+ Add KPI" }}
      </div>
      <div
        :class="` duration-1000 overflow-hidden overflow-y-scroll w-full  ${
          openAddKpi ? 'max-h-[50vh] p-4 primeBox' : 'max-h-[0vh]'
        } `"
      >
        <p class="leading-none">
          Select programs to add <br /><i
            >if this project relates to any program(s)</i
          >
        </p>
        <select
          class="w-full text-white bg-white"
          @change="
            (e) => {
              !listPrograms
                .map((el) => JSON.stringify(el))
                .includes(JSON.stringify({ ProgramId: e.target.value })) &&
                listPrograms.push({ ProgramId: e.target.value });
            }
          "
        >
          <option disabled selected>Select Program</option>
          <option v-for="item in programs" :value="item.id">
            {{ item.name }}
          </option>
        </select>

        <div v-if="listKPI.length">
          Select KPI

          <div class="rounded-2xl border-4">
            <div
              v-for="item in listKPI"
              class="hover:bg-ongoing rounded-2xl p-2 cursor-pointer hover:text-white"
              @click.prevent="
                {
                  !project.ProjectIndicators.map((el) =>
                    JSON.stringify(el)
                  ).includes(
                    JSON.stringify({
                      ProgramIndicatorId: item.id,
                      ProgramId: item.Program.id,
                    })
                  ) &&
                    project.ProjectIndicators.push({
                      ProgramIndicatorId: item.id,
                      ProgramId: item.Program.id,
                    });
                }
              "
            >
              <div class="flex flex-col">
                <b>
                  {{ item.description }}
                </b>
                <i>
                  <!-- {{ item.Program.name }} -->
                  {{ item.Program.name }}
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div
          v-for="item in project.ProjectIndicators.filter(
            (el) => !el.deletedAt
          )"
          :key="item.ProgramIndicatorId"
        >
          <div
            class="hover:text-stop cursor-pointer"
            @click.prevent="() => (item.deletedAt = new Date())"
          >
            <CardsProjectIndicator :data="item" />
            <!-- {{ item }} -->
          </div>
        </div>
      </div>
      <!-- {{ project.ProjectIndicators }} -->
    </div>
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;
const { project } = useProject();
const openAddKpi = ref(false);
const listPrograms = ref([]);
const { trace } = useTrace();
const listKPI = ref([]);
const { data: programs, status } = await useFetch(
  `${BASE_URL}/program/department/${trace.value.PartnerId}`
);

watch(listPrograms.value, async (newProg, oldProg) => {
  const {
    data: kpi,
    status,
    error,
  } = await useFetch(`${BASE_URL}/ProgramIndicator/`, {
    query: { ProgramList: JSON.stringify(listPrograms.value) },
  });
  listKPI.value = kpi.value;
});
</script>

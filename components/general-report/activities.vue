<template>
  <div class="w-full">
    <div
      class="flex border-b-2 border-b-dprimary w-full flex justify-between px-2 font-bold"
    >
      <div class="flex gap-2">
        <div
          :class="`hover:border-y-dprimary border-y-transparent border-y-2 w-full flex justify-center hover:font-bold cursor-pointer uppercase duration-500 text-nowrap ${
            queries.time == 'future' ? 'font-bold text-dsecondary' : ''
          }`"
          @click="
            () => {
              queries.time = 'future';
              queries.page = 1;
              // queries.search = undefined;
              queries.isComplete = 'all';
            }
          "
        >
          Onward Activites
        </div>
        <div
          :class="`hover:border-y-dprimary border-y-transparent border-y-2 w-full flex justify-center hover:font-bold cursor-pointer uppercase duration-500 text-nowrap ${
            queries.time == 'past' ? 'font-bold text-dsecondary' : ''
          }`"
          @click="
            () => {
              queries.time = 'past';
              queries.page = 1;
              // queries.search = undefined;
            }
          "
        >
          Past Activities
        </div>
      </div>

      <div class="flex gap-2">
        <div v-if="queries.time == 'past'">
          <div
            class="cursor-pointer"
            v-if="queries.isComplete == 'all'"
            @click="() => (queries.isComplete = 'complete')"
          >
            All Activity
          </div>
          <div
            class="cursor-pointer"
            v-if="queries.isComplete == 'complete'"
            @click="() => (queries.isComplete = 'incomplete')"
          >
            Finished Activity
          </div>
          <div
            class="cursor-pointer"
            v-if="queries.isComplete == 'incomplete'"
            @click="() => (queries.isComplete = 'all')"
          >
            Unfinished Activity
          </div>
        </div>
        <div
          class="text-sm cursor-pointer rounded-2xl px-2 border-x-2 border-x-dprimary"
        >
          <div>
            Search |<input
              class="border-transparent"
              :value="queries.search"
              :onchange="
                (e) => {
                  queries.search = e.target.value;
                  queries.page = 1;
                }
              "
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="error && status == 'error'"
      class="flex flex-col justify-center items-center text-pred"
    >
      <div class="w-[5vw]">
        <IconsEmojiFrown />
      </div>
      <div class="font-bold">
        {{ error.statusCode }}: {{ error.data.message }}
      </div>
    </div>
    <div
      v-if="status == 'pending'"
      class="flex flex-col justify-center items-center p-5"
    >
      <img src="~/assets/logo/kadin.png" width="15%" />
      <span class="font-bold"> Loading data ... </span>
    </div>
    <div v-if="status == 'success'">
      <div class="px-2 leading-none">
        <div>Number of activities: {{ Activities.count }}</div>
        <div class="flex">
          Page:
          <div class="flex gap-2">
            <div
              v-for="(n, index) in Activities.last_page"
              :class="`cursor-pointer ${
                Activities.current_page - 1 == index
                  ? 'font-bold text-dsecondary'
                  : ''
              }`"
              @click="
                () => {
                  queries.page = index + 1;
                }
              "
            >
              {{ index + 1 }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2 p-2 h-full overflow-y-auto">
        <div v-for="activity in Activities.rows">
          <div
            :class="`${activity.Project ? 'cursor-pointer' : ''}`"
            @click="
              () => {
                if (activity.Project)
                  navigateTo(`/tracker/project/${activity.Project.id}`);
              }
            "
          >
            <GeneralReportCardsActivity :data="activity" :key="activity.id" />
          </div>
        </div>
      </div>
      <div class="flex">
        Page:
        <div class="flex gap-2">
          <div
            v-for="(n, index) in Activities.last_page"
            :class="`cursor-pointer ${
              Activities.current_page - 1 == index
                ? 'font-bold text-dsecondary'
                : ''
            }`"
            @click="
              () => {
                queries.page = index + 1;
              }
            "
          >
            {{ index + 1 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;
const { InstitutionId } = defineProps(["InstitutionId"]);
const queries = ref({
  time: "future",
  data_per_page: 10,
  page: 1,
  isComplete: "all",
  search: undefined,
});

const {
  data: dataActivities,
  status,
  error,
} = await useFetch(`${BASE_URL}/activity/institution/${InstitutionId}`, {
  query: queries,
});

const Activities = ref(dataActivities);

// watch(queries.value.time, async () => {
//   try {
//     dataStatus.value = "loading";
//     console.log("enter");
//     // Activities.value = await useFetch(
//     //   `${BASE_URL}/activity/institution/${InstitutionId}`,
//     //   { query: queries }
//     // );
//     dataStatus.value = "success";
//   } catch (error) {
//     dataStatus.value = "error";
//   }
// });
</script>

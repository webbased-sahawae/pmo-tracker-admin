<template>
  <div class="mt-4 flex flex-col gap-2">
    <div
      :class="`duration-1000 flex gap-2 w-full items-between justify-between`"
    >
      <div
        :class="`duration-500 border-grey-200 hover:border-ongoing hover:bg-ongoing hover:text-white border-2 w-full flex justify-center cursor-pointer rounded-2xl ${
          queryTime == 'all' && 'border-ongoing'
        }`"
        @click.prevent="
          () => {
            queryTime = 'all';
          }
        "
      >
        All
      </div>
      <div
        :class="`duration-500 border-grey-200 hover:border-ongoing hover:bg-ongoing hover:text-white border-2 w-full flex justify-center cursor-pointer rounded-2xl ${
          queryTime == 'past' && 'border-ongoing'
        }`"
        @click.prevent="
          () => {
            queryTime = 'past';
          }
        "
      >
        Past
      </div>
      <div
        :class="`duration-500 border-grey-200 hover:border-ongoing hover:bg-ongoing hover:text-white border-2 w-full flex justify-center cursor-pointer rounded-2xl ${
          queryTime == 'future' && 'border-ongoing'
        }`"
        @click.prevent="
          () => {
            queryTime = 'future';
          }
        "
      >
        Future
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <div v-for="activity in Activities" :class="`cursor-pointer`">
        <!-- {{ activity }} -->
        <CardsMiniActivity :activity="activity" :key="activity.id" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { KADIN_LOGO } from "~/constants/urls";
const { BASE_URL } = useRuntimeConfig().public;
const queryTime = ref("all");
const { ProjectId } = useRoute().params;

const borderStatus = (startDate, summary) => {
  if (new Date(startDate) <= new Date()) {
    switch (summary) {
      case null:
        return {
          border: "border-stop",
          text: "text-white bg-stop hover:bg-white hover:text-stop",
        };
        break;
      default:
        return {
          border: "border-complete",
          text: " hover:bg-complete hover:text-white",
        };
        break;
    }
  } else {
    return {
      border: "border-ongoing",
      text: " hover:bg-ongoing hover:text-white",
    };
  }
};
const Activities = ref([]);

const { data: rawActivities } = await useFetch(
  `${BASE_URL}/activity/project/${ProjectId}`,
  {
    query: { time: queryTime.value },
  }
);
Activities.value = rawActivities.value;
watch(queryTime, async () => {
  console.log("Query time: " + queryTime.value);
  const { data } = await useFetch(`${BASE_URL}/activity/project/${ProjectId}`, {
    query: { time: queryTime.value },
  });
  Activities.value = data.value;
});
</script>

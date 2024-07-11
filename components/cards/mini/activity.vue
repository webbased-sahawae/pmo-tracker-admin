<template>
  <div
    :class="` duration-1000 ${
      activityModal &&
      'bg-white bg-opacity-50 w-[100vw] h-[100vh] fixed inset-0 flex justify-center py-4 gap-2 '
    }`"
  >
    <div
      :class="`bg-white border-2 rounded-2xl px-2 py-1 overflow-auto ${
        activityModal && 'max-w-[75vw] pb-4'
      } ${borderStatus(activity.start, activity.summary).border}`"
    >
      <div class="flex gap-2" v-if="activityModal">
        <div
          class="border-2 border-x-slate-500 rounded-full px-2 hover:bg-stop hover:border-x-red-700 hover:text-white hover:font-bold"
          @click="editActivity"
          v-if="trace.PartnerId"
        >
          Edit
        </div>
        <div
          class="border-2 border-x-slate-500 rounded-full px-2 hover:bg-ongoing hover:border-x-blue-700 hover:text-white hover:font-bold"
          @click="
            () => {
              activityModal = false;
            }
          "
        >
          Close
        </div>
        <div
          class="border-2 border-x-slate-500 rounded-full px-2 hover:bg-stop hover:border-x-red-700 hover:text-white hover:font-bold"
          @click="deleteActivity"
          v-if="trace.PartnerId"
        >
          Delete
        </div>
      </div>
      <div
        @click="
          () => {
            activityModal = true;
          }
        "
        :class="`duration-500 rounded-2xl px-4 py-1 leading-none cursor-pointer ${
          borderStatus(activity.start, activity.summary).text
        }`"
      >
        <div class="">
          <div>
            <div class="w-full flex justify-between items-center">
              <h2 class="uppercase">
                {{ activity.title }}
              </h2>
              <div
                class="italic font-bold text-sm border-x-2 border-dprimary px-2 rounded-xl"
                v-if="activity.ProjectId"
              >
                {{ activity.score }}%
              </div>
            </div>
            <div class="text-sm">{{ activity.Category.name }}</div>
            <div class="text-sm">{{ activity.location }}</div>
          </div>
        </div>
        <div class="flex text-sm italic font-bold leading-none">
          <div>{{ dates(activity.start, activity.end) + ", " }}</div>
        </div>
        <div
          :class="`w-full border-2 rounded-full ${
            borderStatus(activity.start, activity.summary).border
          }`"
        />
      </div>

      <div v-if="activityModal" class="px-4">
        <h2>Discussion Points</h2>
        <div class="flex flex-col gap-2">
          <div
            v-for="(Discussions, index) in activity.Discussions"
            :class="`border-x-4 px-2 rounded-xl ${
              borderStatus(activity.start, activity.summary).border
            }`"
          >
            <div class="flex">
              <h2>{{ index + 1 }}. {{ Discussions.topic }}</h2>
              <div v-if="Discussions.speaker">- {{ Discussions.speaker }}</div>
            </div>
            <p>{{ Discussions.description }}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 v-if="activityModal" class="mt-2">Summary</h2>
        <p class="leading-none text-justify px-4">
          {{ activity.summary }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { dates } from "~/helpers/get-date.js";
const { activity } = defineProps(["activity"]);
const { activity: activityDetail } = useActivity();
const { trace } = useTrace();

const { BASE_URL } = useRuntimeConfig().public;
const activityModal = ref(false);
const { ProjectId } = useRoute().params;
const editActivity = async () => {
  try {
    activityDetail.value.info = activity;
    delete activityDetail.value.info.Discussions;
    activityDetail.value.Discussions = activity.Discussions || [];
    await navigateTo("/tracker/activity/edit");
  } catch (error) {
    console.log(error);
  }
  // console.log(activityDetail.value.info);
};

const deleteActivity = async () => {
  try {
    // console.log(activity.id);
    await useFetch(`${BASE_URL}/activity/${activity.id}`, { method: "DELETE" });
    activityModal.value = false;
    await refreshNuxtData();
  } catch (error) {
    // toastMessage('error',error)
    console.log(error);
  }
};
const borderStatus = (startDate, summary) => {
  if (new Date(startDate) <= new Date()) {
    switch (summary) {
      case null:
        return {
          border: "border-stop",
          text: "text-white bg-stop hover:bg-white hover:text-stop",
        };

      default:
        return {
          border: "border-complete",
          text: " hover:bg-complete hover:text-white",
        };
    }
  } else {
    return {
      border: "border-ongoing",
      text: " hover:bg-ongoing hover:text-white",
    };
  }
};
</script>

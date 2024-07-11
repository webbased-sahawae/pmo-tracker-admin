<template>
  <div
    :class="`w-full border-4 pb-2 px-2 rounded-2xl flex flex-col h-full cursor-pointer transition ease-in-out duration-500 ${
      projectStatus(ProjectScores).border
    }`"
    @click.prevent="
      async () => {
        try {
          await navigateTo(`/tracker/project/${ProjectId}`);
          console.log('move');
        } catch (error) {
          console.log(error);
        }
      }
    "
  >
    <div>
      <div class="flex justify-center">
        <img
          :src="`${
            logoId ? `${BASE_URL}/project/image/${logoId}` : KADIN_LOGO
          }`"
          class="h-[10vh] w-full object-contain rounded-2xl"
        />
      </div>
      <div
        :class="`rounded-full border-4 w-full ${
          projectStatus(ProjectScores).border
        }`"
      />
    </div>
    <div class="flex flex-col justify-between h-full gap-2">
      <div>
        <h3 class="font-bold text-base text-center">{{ title }}</h3>
        <div class="text-sm italic text-center">{{ projectCategory }}</div>
        <div v-if="ProjectScores">
          Progress status:
          <span class="font-bold text-dprimary"> {{ ProjectScores }}% </span>
        </div>
        <div class="text-sm">{{ dates() }}</div>
      </div>
      <div>
        Latest activity:
        <div class="text-sm italic text-stop">
          {{
            Math.ceil(
              (new Date() - new Date("02/27/2024")) / (1000 * 60 * 60 * 24)
            )
          }}
          days ago
        </div>
      </div>
      <div class="h-full">
        <div class="flex font-bold">
          <img src="~/assets/icons/sinergy.png" width="15" /> Sinergy:
          <span class="text-blue-700">
            {{ sinergy.length }}
          </span>
        </div>
        <div v-for="institution in institutions">
          <div
            v-if="
              sinergy.filter((el) => el.Institution.id == institution.id).length
            "
          >
            <!-- {{ sinergy }} -->
            <span class="font-bold">
              {{
                sinergy.filter((el) => el.Institution.id == institution.id)
                  .length
              }}
            </span>
            {{ institution.name }}
          </div>
        </div>
      </div>
    </div>
    <!-- {{ sinergy }} -->
    <!-- {{ ProjectId }} -->
  </div>
</template>
<script setup>
import { KADIN_LOGO } from "~/constants/urls";
const { BASE_URL } = useRuntimeConfig().public;
const projectStatus = (value) => {
  if (value > 80)
    return {
      BarColor: "accent-complete",
      title: "Very Impactful",
      text: "text-complete",
      border: "border-complete",
      hoverborder: "hover:border-complete",
    };
  else if (value > 40)
    return {
      BarColor: "accent-ongoing",
      text: "text-ongoing",
      title: "Highly Impactful",
      border: "border-ongoing",
      hoverborder: "hover:border-ongoing",
    };
  else
    return {
      BarColor: "accent-stop",
      text: "text-stop",
      title: "Impactful",
      border: "border-stop",
      hoverborder: "hover:border-stop",
    };
};

const {
  ProjectId,
  logoId,
  title,
  projectCategory,
  startDate,
  endDate,
  sinergy,
} = defineProps([
  "ProjectId",
  "logoId",
  "title",
  "projectCategory",
  "startDate",
  "endDate",
  "sinergy",
]);

const { data: ProjectScores } = await useFetch(
  `${BASE_URL}/project/scores/${ProjectId}`
);
const dates = () => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (
    start.getMonth() == end.getMonth() &&
    start.getFullYear() == end.getFullYear()
  ) {
    return `${
      start.getDate() == end.getDate()
        ? start.getDate()
        : `${start.getDate()} - ${end.getDate()}`
    } ${start.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}`;
  } else {
    if (start.getFullYear() == end.getFullYear()) {
      return `${start.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
      })} - ${end.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`;
    } else {
      return `${start.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })} - ${end.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`;
    }
  }
};

const { data: institutions } = await useFetch(`${BASE_URL}/institution`);
</script>

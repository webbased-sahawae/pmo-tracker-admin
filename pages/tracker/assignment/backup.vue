<template>
  <div class="w-full">
    <select
      @change="
        async (e) => {
          await navigateTo({
            path: '/tracker/assignment',
            query: { PartnerId: e.target.value },
          });
        }
      "
    >
      <option disabled selected>Seluruh Bidang/Badan</option>
      <option
        v-for="item in PartnerList"
        :value="item.id"
        :selected="PartnerId == item.id"
      >
        {{ item.name }}
      </option>
    </select>
    <div class="flex flex-col items-center gap-2 leading-none mb-6">
      <h1 class="line-none">{{ data.PartnerDetail.name }}</h1>
      <span class="italic line-none">{{ data.PartnerDetail.chief }}</span>
    </div>
    <div class="flex flex-col gap-2 px-4">
      <div class="primeBox w-full p-2 gap-2 flex flex-col">
        <!-- {{ ProgramPartner }} -->
        <div
          class="buttonAdd"
          @click.prevent="() => navigateTo('/tracker/assignment/add/')"
        >
          <p class="">+ Program</p>
        </div>

        <CardsProgramDetail
          v-for="program in data.ProgramPartner"
          :data="program"
        />
      </div>
      <div class="primeBox w-full h-full">
        <div class="font-bold px-2">Program tambahan</div>
        <div class="flex flex-col justify-start gap-2 p-2">
          <div
            class="buttonAdd"
            @click.prevent="() => navigateTo('/tracker/project/add/')"
          >
            + Program tambahan diluar rapimnas
          </div>
          <div class="flex gap-2">
            <div
              v-for="project in data.ProjectsNonProgram"
              class="md:w-[23vw] w-screen"
            >
              <CardsMiniProject
                :ProjectId="project.id"
                :title="project.title"
                :projectCategory="project.Category.name"
                :status="project.status"
                :startDate="project.start"
                :endDate="project.end"
                :sinergy="project.PartnerProjects"
                :logoId="project.image && project.id"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="primeBox w-full h-full">
        <div class="font-bold px-2">
          Aktifitas pengurus Kadin diluar Program
        </div>
        <div class="flex flex-col justify-start gap-2 p-2">
          <div
            class="buttonAdd"
            @click.prevent="() => navigateTo('/tracker/activity/add/')"
          >
            + Aktifitas diluar Program
          </div>
          <div class="flex gap-2 flex-wrap">
            <div
              v-for="activity in data.listActivities"
              :key="activity.id"
              :class="`cursor-pointer w-[23vw]`"
            >
              <CardsMiniActivity :activity="activity" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { watch } from "vue";
const { BASE_URL, INSTITUTION_ID } = useRuntimeConfig().public;
const { PartnerId } = useRoute().query;
const { trace } = useTrace();
const data = ref({
  ProgramPartner: [],
  listActivities: [],
  ProjectsNonProgram: [],
  PartnerDetail: {},
});

// trace.value.ProgramId && delete trace.value.ProgramId;
// console.log(useRoute());
watch(useRoute(), async (val) => {
  try {
    const { data: ProgramPartner } = await useFetch(
      `${BASE_URL}/program/department/${val.query.PartnerId}`
    );
    data.value.ProgramPartner = ProgramPartner.value;
    const { data: listActivities } = await useFetch(
      `${BASE_URL}/activity/nonproject/${val.query.PartnerId}`
    );
    data.value.listActivities = listActivities.value;
    const { data: ProjectsNonProgram } = await useFetch(
      `${BASE_URL}/project/non/${val.query.PartnerId}`
    );
    data.value.ProjectsNonProgram = ProjectsNonProgram.value;
    const { data: PartnerDetail } = await useFetch(
      `${BASE_URL}/partner/${val.query.PartnerId}`
    );

    data.value.PartnerDetail = PartnerDetail.value;

    if (val.query.PartnerId) trace.value.PartnerId = val.query.PartnerId;
  } catch (error) {
    console.log(error);
  }

  // console.log(trace.value.access_token);
});
const { data: PartnerList } = await useFetch(
  `${BASE_URL}/partner/institution/${INSTITUTION_ID}`,
  {
    headers: {
      access_token: useCookie("access_token").value,
    },
  }
);

onMounted(async () => {
  const { data: ProgramPartner } = await useFetch(
    `${BASE_URL}/program/department/${PartnerId}`
  );
  // console.log(listActivities.value);
  data.value.ProgramPartner = ProgramPartner.value;
  const { data: listActivities } = await useFetch(
    `${BASE_URL}/activity/nonproject/${PartnerId}`
  );
  data.value.listActivities = listActivities.value;

  const { data: ProjectsNonProgram } = await useFetch(
    `${BASE_URL}/project/non/${PartnerId}`
  );
  data.value.ProjectsNonProgram = ProjectsNonProgram.value;

  const { data: PartnerDetail } = await useFetch(
    `${BASE_URL}/partner/${PartnerId}`
  );
  data.value.PartnerDetail = PartnerDetail.value;
  trace.value.PartnerId = PartnerId;

  console.log("finish mount");
});
</script>

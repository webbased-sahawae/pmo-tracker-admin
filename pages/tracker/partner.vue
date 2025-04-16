<template>
  <div class="w-full">
    <select
      @change="
        async (e) => {
          await navigateTo({
            path: '/tracker/partner',
            query: { PartnerId: e.target.value },
          });
        }
      "
    >
      <option
        v-for="item in PartnerList"
        :value="item.id"
        :selected="PartnerId == item.id"
      >
        {{ item.name }}
      </option>
    </select>
    <div class="flex flex-col items-center gap-2 leading-none mb-6">
      <h1 class="line-none">{{ data.PartnerDetail?.name }}</h1>
      <span class="italic line-none">{{ data.PartnerDetail.chief }}</span>
    </div>
    <div class="flex flex-col gap-2 px-4">
      <div class="primeBox w-full p-2 gap-2 flex flex-col">
        <!-- {{ ProgramPartner }} -->
        <div class="font-bold">Program Rapimnas</div>

        <CardsProgramDetail
          v-for="program in data.ProgramPartner"
          :data="program"
          :key="program.id"
        />
      </div>
      <div class="primeBox w-full h-full">
        <div class="font-bold px-2">Project Non-Program</div>
        <div class="flex flex-col justify-start gap-2 p-2">
          <!-- {{ data.ProjectsNonProgram }} -->
          <div class="flex flex-wrap gap-2">
            <div
              v-for="project in data.ProjectsNonProgram"
              class="md:w-[19vw] w-screen"
              :key="project.id"
            >
              <!-- {{ project }} -->
              <CardsMiniProject
                :ProjectId="project.id"
                :title="project.title"
                :projectCategory="project.Category.name"
                :startDate="project.start"
                :endDate="project.end"
                :sinergy="project.Partners"
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
          <div class="flex gap-2 flex-wrap">
            <div
              v-for="activity in data.listActivities"
              :key="activity.id"
              :class="`cursor-pointer w-[23vw]`"
            >
              <!-- <CardsMiniActivity :activity="activity" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
const { BASE_URL } = useRuntimeConfig().public;
const { INSTITUTION_ID } = useRuntimeConfig().public;
const { PartnerId } = useRoute().query;
const { trace } = useTrace();
delete trace.value.ProjectId;
delete trace.value.PartnerId;
const data = ref({
  ProgramPartner: [],
  listActivities: [],
  ProjectsNonProgram: [],
  PartnerDetail: {},
});

const { data: ProgramPartner } = await useFetch(
  `${BASE_URL}/program/department/${PartnerId}`
);
data.value.ProgramPartner = ProgramPartner.value;
const { data: listActivities } = await useFetch(
  `${BASE_URL}/activity/nonproject/${PartnerId}`
);
// console.log(listActivities.value);
data.value.listActivities = listActivities.value;

const { data: ProjectsNonProgram } = await useFetch(
  `${BASE_URL}/project/non/${PartnerId}`
);
data.value.ProjectsNonProgram = ProjectsNonProgram.value;

const { data: PartnerDetail } = await useFetch(
  `${BASE_URL}/partner/${PartnerId}`
);
data.value.PartnerDetail = PartnerDetail.value;
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
  console.log("finish mount");
});
</script>

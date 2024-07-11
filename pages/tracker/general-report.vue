<template>
  <div>
    <div
      class="flex w-full justify-between px-6 py-2 gap-4 mb-2 border-b-2 border-b-dprimary"
    >
      <div
        :class="`hover:border-y-dprimary border-y-transparent border-y-2 w-full flex justify-center hover:font-bold cursor-pointer uppercase duration-500 ${
          institutionActive.quarter == 'all' ? 'font-bold text-dsecondary' : ''
        }`"
        @click="
          () => {
            institutionActive.quarter = 'all';
          }
        "
      >
        Overall
      </div>
      <div
        :class="`hover:border-y-dprimary border-y-transparent border-y-2 w-full flex justify-center hover:font-bold cursor-pointer uppercase duration-500 ${
          institutionActive.quarter == 1 ? 'font-bold text-dsecondary' : ''
        }`"
        @click="
          () => {
            institutionActive.quarter = 1;
          }
        "
      >
        Quarter 1
      </div>
      <div
        :class="`hover:border-y-dprimary border-y-transparent border-y-2 w-full flex justify-center hover:font-bold cursor-pointer uppercase duration-500 ${
          institutionActive.quarter == 2 ? 'font-bold text-dsecondary' : ''
        }`"
        @click="
          () => {
            institutionActive.quarter = 2;
          }
        "
      >
        Quarter 2
      </div>
      <div
        :class="`hover:border-y-dprimary border-y-transparent border-y-2 w-full flex justify-center hover:font-bold cursor-pointer uppercase duration-500 ${
          institutionActive.quarter == 3 ? 'font-bold text-dsecondary' : ''
        }`"
        @click="
          () => {
            institutionActive.quarter = 3;
          }
        "
      >
        Quarter 3
      </div>
      <div
        :class="`hover:border-y-dprimary border-y-transparent border-y-2 w-full flex justify-center hover:font-bold cursor-pointer uppercase duration-500 ${
          institutionActive.quarter == 4 ? 'font-bold text-dsecondary' : ''
        }`"
        @click="
          () => {
            institutionActive.quarter = 4;
          }
        "
      >
        Quarter 4
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-6 gap-4">
        <div
          class="col-span-2 rounded-2xl border-4 border-dprimary flex flex-col items-center text-dprimary"
        >
          <h2 class="border-b-2 border-b-dprimary w-full flex justify-center">
            Progress Program
          </h2>
          <div v-if="recapStatus.status == 'pending'" class="flex w-[7vw]">
            <IconsLoading />
          </div>
          <div
            v-if="
              recapStatus.status == 'success' &&
              !institutionActive.programPercentage
            "
            class="flex w-full h-full justify-center items-center uppercase font-bold"
          >
            No Program recorded
          </div>
          <div
            v-if="
              recapStatus.status == 'success' &&
              institutionActive.programPercentage
            "
            class="flex w-full h-full flex-col justify-center items-center"
          >
            <span
              :class="`font-bold text-6xl ${
                projectStatus(institutionActive.programPercentage).text
              }`"
              >{{ institutionActive.programPercentage }}%</span
            >
            <span class="text-xs font-bold text-blue">{{
              institutionActive.quarter == "all"
                ? `Status Program dari 1 Januari ${new Date().getFullYear()} sampai ${new Date().toLocaleDateString(
                    "id-ID",
                    { day: "2-digit", month: "long", year: "numeric" }
                  )}`
                : ""
            }}</span>
            <span
              :class="`font-bold text-base italic ${
                projectStatus(institutionActive.programPercentage).text
              }`"
              >{{
                projectStatus(institutionActive.programPercentage).title
              }}</span
            >
          </div>
        </div>
        <div
          class="col-span-2 rounded-2xl flex justify-center flex-col items-center leading-none"
        >
          <div class="w-[30%]">
            <img src="../../assets/logo/kadin.png" />
          </div>
          <div
            class="text-2xl font-bold text-dprimary w-full justify-center flex flex-col items-center leading-none"
          >
            <div>{{ SYSTEM_NAME }} {{ new Date().getFullYear() }}</div>
            <div class="uppercase text-dsecondary">
              {{ institutionActive.name }}
            </div>
          </div>
          <div class="text-dprimary">
            {{ SYSTEM_DESCRIPTION }}
          </div>
        </div>
        <div
          class="col-span-2 rounded-2xl border-4 border-dprimary flex flex-col items-center text-dprimary"
        >
          <h2 class="border-b-2 border-b-dprimary w-full flex justify-center">
            Sinergy Recap
          </h2>
          <div class="p-2 w-full text-black flex flex-col gap-2">
            <div v-for="(institution, index) in sinergyRecap">
              <p>
                {{ index + 1 }}. Bersinergi dengan
                <b class="text-blue"
                  >{{ institution.TotalPartner }}
                  {{
                    institution.id == "14a870b2-6f40-4120-9c3f-2d7c2379442d"
                      ? "Bidang/Badan"
                      : institution.name
                  }}</b
                >
                sebanyak
                <b class="text-dsecondary hover:text-black duration-1000"
                  >{{ institution.TotalSinergy }} kali</b
                >
                dalam
                <b class="text-dsecondary hover:text-black duration-1000"
                  >{{ institution.TotalProject }} Program</b
                >
              </p>
            </div>
            <!-- <table class="w-full table-auto">
              <thead>
                <tr>
                  <th>Jumlah Sinergi</th>
                  <th>Jumlah Program</th>
                  <th>Jumlah Bidang/Badan/Lembaga</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="institution in dataSinergy">
                  <td>
                    {{ institution.name }}
                  </td>
                  <td>
                    {{ institution.TotalSinergy }}
                  </td>
                  <td>
                    {{ institution.TotalProject }}
                  </td>
                  <td>
                    {{ institution.TotalPartner }}
                  </td>
                </tr>
              </tbody>
            </table> -->
          </div>
        </div>
      </div>
      <div class="grid grid-cols-6 gap-4">
        <div
          class="col-span-6 rounded-2xl border-4 border-dprimary flex flex-col items-center text-dprimary"
        >
          <!-- <div class="flex w-full gap-4 px-4 border-b-2 border-b-dprimary">
            <div
              :class="`hover:border-y-dprimary border-y-transparent border-y-2 w-fit flex justify-center hover:font-bold cursor-pointer uppercase duration-500 ${
                detailTab == 'activities' && 'font-bold text-dsecondary'
              }`"
              @click="() => (detailTab = 'activities')"
            >
              Activities
            </div>
            <div
              :class="`hover:border-y-dprimary border-y-transparent border-y-2 w-fit flex justify-center hover:font-bold cursor-pointer uppercase duration-500 ${
                detailTab == 'projects' && 'font-bold text-dsecondary'
              }`"
              @click="() => (detailTab = 'projects')"
            >
              Projects
            </div>
            <div
              :class="`hover:border-y-dprimary border-y-transparent border-y-2 w-fit flex justify-center hover:font-bold cursor-pointer uppercase duration-500 ${
                detailTab == 'programs' && 'font-bold text-dsecondary'
              }`"
              @click="() => (detailTab = 'programs')"
            >
              Programs
            </div>
            <div
              :class="`hover:border-y-dprimary border-y-transparent border-y-2 w-fit flex justify-center hover:font-bold cursor-pointer uppercase duration-500 ${
                detailTab == 'departments' && 'font-bold text-dsecondary'
              }`"
              @click="() => (detailTab = 'departments')"
            >
              Departments
            </div>
          </div> -->
          <div class="h-full overflow-hidden h-max">
            <GeneralReportActivities
              v-if="detailTab == 'activities'"
              :InstitutionId="institutionActive.id"
              :key="institutionActive.id"
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { SYSTEM_DESCRIPTION, SYSTEM_NAME } from "~/constants/ids";
const { BASE_URL } = useRuntimeConfig().public;

const { INSTITUTION_ID } = useRuntimeConfig().public;
const { trace } = useTrace("trace");
trace.value = {};
const recapStatus = ref({ status: "pending", error: null });
const detailTab = ref("activities");
const institutionActive = ref({
  id: INSTITUTION_ID,
  name: "KADIN INDONESIA",
  quarter: "all",
  programPercentage: 0,
});
const sinergyRecap = ref({});

const { data: rawRecap, status: rawRecapStatus } = await useFetch(
  `${BASE_URL}/institution/recap/${institutionActive.value.id}`,
  {
    query: {
      quarter: institutionActive.value.quarter,
      year: new Date().getFullYear(),
    },
  }
);

const { data: dataSinergy } = await useFetch(
  `${BASE_URL}/institution/sinergy`,
  {
    query: {
      quarter: institutionActive.value.quarter,
      year: new Date().getFullYear(),
    },
  }
);
sinergyRecap.value = dataSinergy.value;
institutionActive.value.programPercentage = rawRecap.value;
recapStatus.value.status = rawRecapStatus.value;
watch(institutionActive.value, async () => {
  try {
    console.log(institutionActive.value);
    recapStatus.value.status = "pending";

    const { data: dataSinergy } = await useFetch(
      `${BASE_URL}/institution/sinergy`,
      {
        query: {
          quarter: institutionActive.value.quarter,
          year: new Date().getFullYear(),
        },
      }
    );
    sinergyRecap.value = dataSinergy.value;

    const {
      data: rawRecap,
      status: newRecapStatus,
      error,
    } = await useFetch(
      `${BASE_URL}/institution/recap/${institutionActive.value.id}`,
      { query: { quarter: institutionActive.value.quarter, year: "2024" } }
    );
    institutionActive.value.programPercentage = rawRecap.value;
    recapStatus.value = { status: newRecapStatus.value, error };
  } catch (error) {
    recapStatus.value = { status: error, error };
  }
});
const projectStatus = (value) => {
  if (value > 80)
    return {
      BarColor: "accent-complete",
      title: "Very Impactful",
      text: "text-complete",
      border: "border-complete",
    };
  else if (value > 40)
    return {
      BarColor: "accent-ongoing",
      text: "text-ongoing",
      title: "Highly Impactful",
      border: "border-ongoing",
    };
  else
    return {
      BarColor: "accent-stop",
      text: "text-stop",
      title: "Impactful",
      border: "border-stop",
    };
};
</script>

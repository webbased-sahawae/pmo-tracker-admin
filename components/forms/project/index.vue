<template>
  <div class="px-5 py-4">
    <div class="flex flex-col items-center">
      <div class="flex flex-col items-center">
        <label class="text-xl font-bold">
          {{ PartnerDetail?.name }}
        </label>
      </div>
      <div class="flex w-[50vw] justify-around gap-2">
        <div
          :class="
            activeTab == 'kpi'
              ? 'flex justify-center border-b-8 w-full font-bold cursor-pointer	items-center text-center'
              : 'flex justify-center border-b-4 w-full cursor-pointer	items-center text-center'
          "
          @click.prevent="setTab('kpi')"
        >
          KPI
        </div>
        <div
          :class="
            activeTab == 'info'
              ? 'flex justify-center border-b-8 w-full font-bold cursor-pointer	items-center text-center'
              : 'flex justify-center border-b-4 w-full cursor-pointer	items-center text-center'
          "
          @click.prevent="setTab('info')"
        >
          Info
        </div>
        <div
          :class="
            activeTab == 'background'
              ? 'flex justify-center border-b-8 w-full font-bold cursor-pointer	items-center text-center'
              : 'flex justify-center border-b-4 w-full cursor-pointer	items-center text-center'
          "
          @click.prevent="setTab('background')"
        >
          Background
        </div>
        <div
          :class="
            activeTab == 'ProjectRundown'
              ? 'flex justify-center border-b-8 w-full font-bold cursor-pointer	items-center text-center'
              : 'flex justify-center border-b-4 w-full cursor-pointer	items-center text-center'
          "
          @click.prevent="setTab('ProjectRundown')"
        >
          Rundown
        </div>

        <div
          :class="
            activeTab == 'sinergy'
              ? 'flex justify-center border-b-8 w-full font-bold cursor-pointer	items-center text-center'
              : 'flex justify-center border-b-4 w-full cursor-pointer	items-center text-center'
          "
          @click.prevent="setTab('sinergy')"
        >
          Sinergy
        </div>
      </div>
      <div
        class="flex flex-col p-2 h-[75vh] xl:p-10 py-5 w-[100vw] xl:w-[50vw]"
      >
        <div class="h-[80vh] overflow-y-auto">
          <FormsProjectInfo v-if="activeTab == 'info'" />
          <FormsProjectBackground v-if="activeTab == 'background'" />
          <FormsProjectRundown v-if="activeTab == 'ProjectRundown'" />
          <FormsProjectSinergy v-if="activeTab == 'sinergy'" />
          <FormsProjectProgramRelation v-if="activeTab == 'kpi'" />
        </div>
        <div>
          <div class="flex max-w-[100vw] gap-4">
            <button
              :disabled="
                !(
                  project.project.title &&
                  project.project.start &&
                  project.project.end &&
                  project.project.CategoryId
                )
              "
              :class="`${
                project.project.title &&
                project.project.start &&
                project.project.end &&
                project.project.CategoryId
                  ? 'buttonAdd'
                  : 'border-4 border-disable rounded-full text-disable hover:bg-transparent'
              }`"
              style="width: 100%"
              type="button"
              @click.prevent="submitProject"
            >
              {{ !project?.project?.id ? "Submit" : "Update" }}
            </button>

            <button
              class="buttonDelete"
              style="width: 100%"
              type="button"
              :onclick="
                () => {
                  warn('coba warning');
                  navigateTo({
                    path: `/tracker/assignment`,
                    query: { PartnerId: trace.PartnerId },
                  });
                }
              "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { warn } from "vue";
import useICookie from "~/composables/cookie";
import { useToast } from "primevue/usetoast";
const { SYSTEM_PRIVILEGE } = useRuntimeConfig().public;
const { BASE_URL } = useRuntimeConfig().public;

const toast = useToast();

const toastMessage = (severity, code, message) => {
  toast.add({
    severity,
    summary: code,
    detail: message,
    life: 10000,
  });
};
const { trace } = useTrace();
const { project } = useProject();
project.value.PartnerId = trace.value.PartnerId;
project.value.project.ProgramId = trace.value.ProgramId;

// PartnerProgram = ProgramDetail.value;

const { data: PartnerDetail, status } = await useFetch(
  `${BASE_URL}/partner/${trace.value.PartnerId}`
);

const activeTab = ref("kpi");

const setTab = (valInput) => {
  activeTab.value = valInput;
};

const submitProject = async () => {
  try {
    if (
      project.value.project.title &&
      project.value.project.start &&
      project.value.project.end &&
      project.value.project.CategoryId
    ) {
      const { data: responseData, error } = await useFetch(
        `${BASE_URL}/project`,
        {
          method: "post",
          body: project.value,
          watch: false,
          headers: {
            access_token: useICookie.get("access_token"),
            UserLevelId: SYSTEM_PRIVILEGE,
          },
        }
      );

      if (error.value) throw error.value;
      toastMessage(
        "success",
        200,
        project.value.project.id
          ? `${project.value.project.title} has been updated!`
          : `${project.value.project.title} has been created!`
      );

      await navigateTo({
        path: "/tracker/assignment",
        query: { PartnerId: trace.value.PartnerId },
      });
    }
  } catch (error) {
    toastMessage("error", error.statusCode, error.statusMessage);
  }
};
const resetStateProject = () => {
  project.value = {
    project: {
      ProgramId: null,
      CategoryId: null,
      title: null,
      location: null,
      start: null,
      end: null,
      background: null,

      status: 1,
    },
    ProjectRundown: [],
    ProjectInvitation: [],
    Sinergy: [],
    ProjectIndicators: [],
  };
};

onBeforeUnmount(() => {
  resetStateProject();
});
</script>

<template>
  <div>
    <div
      v-if="imageUpload"
      class="fixed inset-0 bg-opacity-25 w-[100vw] h-[100vh] flex items-center bg-white justify-center"
    >
      <div
        class="bg-white rounded-2xl shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"
      >
        <div
          class="p-2 flex w-[100%] justify-between"
          @click.prevent="
            () => {
              imageUpload = false;
            }
          "
        >
          <h2 class="uppercase text-center w-full">Upload Logo</h2>
          <IconsCross
            class="cursor-pointer hover:text-stop hover:font-bold"
            width="1em"
            @click.prevent="
              () => {
                imageUpload = false;
              }
            "
          />
        </div>
        <div class="pb-2">
          <FormsImage :ProjectId="ProjectId" @setModal="updateModalValue" />
        </div>
      </div>
    </div>
    <div
      class="flex flex-col items-center xl:flex-row xl:items-start xl:justify-center gap-2 overflow-hidden w-full"
    >
      <div
        :class="`border-4 duration-1000 xl:max-w-[50vw] rounded-2xl p-2 w-[100vw]`"
      >
        <div v-if="trace.PartnerId" class="flex w-full gap-4 my-2 w-[50%]">
          <div
            class="buttonAdd px-2"
            style="width: 100%"
            @click="
              () => {
                navigateTo('/tracker/project/edit');
              }
            "
          >
            Edit
          </div>
          <div
            class="buttonDelete px-2"
            style="width: 100%"
            @click="
              () => {
                deleteProject();
              }
            "
          >
            Delete
          </div>
        </div>
        <!-- {{ ProjectDetail }} -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center px-4">
            <img
              :src="`${
                ProjectDetail.image
                  ? `${BASE_URL}/project/image/${ProjectId}`
                  : KADIN_LOGO
              }`"
              class="h-[10vh] w-[10vw] object-contain rounded-2xl"
              @click.prevent="
                () => {
                  imageUpload = true;
                }
              "
            />
            <div class="flex flex-col xl:flex-row">
              <div class="leading-none">
                <h1>
                  {{ ProjectDetail.title }}
                </h1>
                <h3
                  v-if="ProjectDetail.ProjectScores"
                  :class="`${projectStatus().text}`"
                >
                  {{ projectStatus().title }}:
                  {{ ProjectDetail.ProjectScores }}%
                </h3>

                <p class="text-sm italic">{{ ProjectDetail.Category.name }}</p>
                <div class="flex items-center gap-1 font-bold">
                  <IconsLocation width="1em" />{{ ProjectDetail.location }}
                </div>
                <div class="flex items-center gap-1">
                  <IconsCalendar width="1em" />{{
                    dates(ProjectDetail.start, ProjectDetail.end).date
                  }}
                </div>
                <div
                  v-if="ProjectDetail.folderUrl"
                  class="flex items-center mt-1 gap-1 cursor-pointer hover:font-bold"
                  @click="
                    async () => {
                      await navigateTo(ProjectDetail.folderUrl, {
                        open: {
                          target: '_blank',
                        },
                      });
                    }
                  "
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYvVAUxzhs2ny4F3YwVq8RQt9aXOFURbu6Ug&s"
                    class="h-4 object-conatain"
                  />Folder File
                </div>
              </div>
            </div>
          </div>
          <div class="xl:hidden block">
            <div
              v-if="!detailOpen"
              class="cursor-pointer flex gap-1 hover:text-complete"
              @click.prevent="detailOpen = !detailOpen"
            >
              <IconsInformation width="1em" /> More detail ...
              {{ detailOpen }}
            </div>
            <div
              v-if="detailOpen"
              class="cursor-pointer flex gap-1 hover:text-stop"
              @click.prevent="detailOpen = !detailOpen"
            >
              <IconsInformation width="1em" /> Less detail ...
              {{ detailOpen }}
            </div>
          </div>
          <div :class="`flex flex-col gap-2`">
            <div>
              <h2>Background</h2>

              <div class="text-justify">
                <p>{{ ProjectDetail.background }}</p>
              </div>
            </div>
            <div>
              <h2
                @click.prevent="
                  () => {
                    rundownExpand = !rundownExpand;
                  }
                "
              >
                Rundowns
              </h2>
              <div class="overflow-auto p-2">
                <ClientOnly>
                  <table class="border-2 w-[100vw]">
                    <tr class="border-2">
                      <th>Date</th>
                      <th>Time</th>
                      <th>Agenda</th>
                      <th>Location</th>
                      <th>Speaker</th>
                      <th>Notes</th>
                    </tr>
                    <tr
                      v-for="rundown in ProjectDetail.ProjectRundowns"
                      :key="rundown.id"
                    >
                      <td class="border-2 w-fit text-nowrap p-2">
                        {{
                          new Date(rundown.start).toLocaleString("default", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          })
                        }}
                      </td>
                      <td class="border-2 w-fit text-nowrap p-2">
                        {{
                          new Date(rundown.start).toLocaleString("default", {
                            timeStyle: "short",
                            hour12: false,
                          })
                        }}
                        -
                        {{
                          new Date(rundown.end).toLocaleString("default", {
                            timeStyle: "short",
                            hour12: false,
                          })
                        }}
                      </td>
                      <td class="border-2 font-bold p-2">
                        {{ rundown.title }}
                      </td>
                      <td class="border-2 text-pretty p-2">
                        {{ rundown.location }}
                      </td>
                      <td class="border-2 text-pretty">
                        {{ rundown.speaker }}
                      </td>
                      <td class="border-2 text-center">{{ rundown.notes }}</td>
                    </tr>
                  </table>
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="border-4 xl:w-[25vw] hidden xl:block rounded-2xl p-2">
          <h2>Project Sinergy</h2>
          <div v-for="institution in institutionList" :key="institution.id">
            <div
              v-if="
                ProjectDetail.Partners.filter(
                  (el) => el.Institution.id == institution.id
                ).length
              "
            >
              <ul class="font-bold">
                {{
                  institution.name
                }}
              </ul>
              <li
                class="cursor-pointer"
                v-for="(partner, index) in ProjectDetail.Partners.filter(
                  (el) => el.Institution.id == institution.id
                )"
                @click="
                  () => {
                    navigateTo({
                      path: '/tracker/partner',
                      query: { PartnerId: partner.id },
                    });
                  }
                "
              >
                {{ partner.name }}
              </li>
            </div>
          </div>
        </div>
        <div class="border-4 xl:w-[25vw] hidden xl:block rounded-2xl p-2">
          <div
            v-if="trace.PartnerId"
            class="buttonAdd"
            @click.prevent="
              () => {
                trace.ProjectId = ProjectId;
                navigateTo('/tracker/activity/add');
              }
            "
          >
            + Activity
          </div>

          <CardsProjectActivity />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { KADIN_LOGO } from "~/constants/urls";
import { useToast } from "primevue/usetoast";
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
const { ProjectId } = useRoute().params;
const detailOpen = ref(false);
const imageUpload = ref(false);
const rundownExpand = ref(false);
const updateModalValue = (value) => {
  imageUpload.value = value;
};
const { data: ProjectDetail } = await useFetch(
  `${BASE_URL}/project/${ProjectId}`
);

const dates = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const result = {};
  if (
    start.getMonth() == end.getMonth() &&
    start.getFullYear() == end.getFullYear()
  ) {
    result.date = `${
      start.getDate() == end.getDate()
        ? start.getDate()
        : `${start.getDate()} - ${end.getDate()}`
    } ${start.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    })}`;
  } else {
    if (start.getFullYear() == end.getFullYear()) {
      result.date = `${start.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
      })} - ${end.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`;
    } else {
      result.date = `${start.toLocaleDateString("id-ID", {
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
  return { date: result.date };
};

const projectStatus = () => {
  if (ProjectDetail.value.ProjectScores > 80)
    return {
      BarColor: "accent-complete",
      title: "Very Impactful",
      text: "text-complete",
      border: "border-complete",
    };
  else if (ProjectDetail.value.ProjectScores > 40)
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

const deleteProject = async () => {
  try {
    const { error, status } = await useFetch(
      `${BASE_URL}/project/${ProjectId}`,
      {
        method: "delete",
        watch: false,
      }
    );
    if (status.value == "error") throw error.value;

    toastMessage("info", "Delete", "Project has been deleted!");
    await navigateTo(`/tracker/assignment?PartnerId=${trace.value.PartnerId}`);
  } catch (error) {
    toastMessage("error", error.statusCode, error.statusMessage);
  }
};
const { data: institutionList, status } = await useFetch(
  `${BASE_URL}/institution`
);
onMounted(async () => {
  trace.value.ProjectId = ProjectId;
});
</script>

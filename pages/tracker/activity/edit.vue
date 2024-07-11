<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col w-full xl:w-[75vw] gap-2">
      <!-- Info -->
      <!-- {{ trace }} -->
      <div class="leading-none">
        <h1 class="text-xl font-bold text-center" v-if="trace.ProjectId">
          {{ ProjectDetail.title }}
        </h1>
        <h2
          :class="
            trace.ProjectId
              ? 'text-center font-normal'
              : 'text-xl font-bold text-center'
          "
        >
          {{ PartnerDetail?.name }}
        </h2>
      </div>
      <div>
        <div
          @click.prevent="openContainer.info = !openContainer.info"
          :class="`cursor-pointer ${openContainer.info && 'font-bold'}`"
        >
          Activity Info
        </div>
        <div
          :class="`primeBox duration-1000 overflow-hidden ${
            openContainer.info ? 'max-h-[150vh]' : 'max-h-[0vh]'
          }`"
        >
          <div class="p-2">
            <FormsActivityInfo />
          </div>
        </div>
      </div>
      <!-- Attendance -->
      <div v-if="false">
        <div
          @click.prevent="openContainer.attendance = !openContainer.attendance"
          class="hover:cursor-pointer"
        >
          Attendance
        </div>
        <div
          :class="`primeBox duration-1000 overflow-hidden ${
            openContainer.attendance ? 'max-h-[150vh]' : 'max-h-[0vh]'
          }`"
        >
          <div class="flex flex-col gap-2 p-2">
            <div class="flex gap-2 flex-wrap">
              <div
                class="buttonAdd"
                @click.prevent="() => activity.attendance.push('')"
              >
                + Attendance
              </div>
            </div>
            <div class="grid xl:grid-cols-12 grid-cols-6 gap-2">
              <div
                class="flex items-center justify-center md:col-span-6 col-span-6 gap-2"
              >
                <label class="flex flex-[1]" for="attendance-name">Name</label>
                <input
                  id="attendance-name"
                  type="text"
                  class="flex flex-[8] w-full"
                />
              </div>
              <div
                class="flex items-center justify-center md:col-span-6 col-span-6 gap-2"
              >
                <label class="flex flex-[1]" for="attendance-institution"
                  >Institution</label
                >
                <input
                  id="attendance-institution"
                  type="text"
                  class="flex flex-[8] w-full"
                />
              </div>
              <div
                class="flex items-center justify-center col-span-6 md:col-span-6 gap-2"
              >
                <label class="flex flex-[1]" for="attendance-position"
                  >Position</label
                >
                <input
                  id="attendance-position"
                  type="text"
                  class="flex flex-[8] w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Discussion -->
      <div>
        <div
          @click.prevent="
            openContainer.Discussions = !openContainer.Discussions
          "
          :class="`cursor-pointer ${openContainer.Discussions && 'font-bold'}`"
        >
          Discussion Points
        </div>
        <div
          :class="`primeBox duration-1000 overflow-hidden ${
            openContainer.Discussions ? 'max-h-[150vh]' : 'max-h-[0vh]'
          }`"
        >
          <div class="flex flex-col gap-2 p-2">
            <div
              class="buttonAdd"
              @click.prevent="
                () =>
                  activity.Discussions.push({
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  })
              "
            >
              + Discussion
            </div>
            <div
              v-for="(item, index) in activity.Discussions.filter(
                (el) => !el?.deletedAt
              )"
              class="flex w-full gap-2"
            >
              <FormsActivityDiscussion :data="item" :index="index + 1" />
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div>
        <div
          @click.prevent="openContainer.summary = !openContainer.summary"
          :class="`cursor-pointer ${openContainer.summary && 'font-bold'}`"
        >
          Summary
        </div>
        <div
          :class="`primeBox duration-1000 overflow-hidden ${
            openContainer.summary ? 'max-h-[150vh]' : 'max-h-[0vh]'
          }`"
        >
          <div class="flex flex-col gap-2 p-2">
            <div class="flex w-full gap-2">
              <textarea
                class="px-2 w-full"
                :value="activity.info.summary"
                @keyup="
                  (e) => {
                    activity.info.summary = e.target.value;
                  }
                "
                rows="5"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-full gap-4">
        <div
          class="buttonAdd"
          style="width: 100%"
          @click.prevent="
            () => {
              createActivity();
            }
          "
        >
          {{ activity.info.id ? "Update" : "Submit" }}
        </div>
        <div
          class="buttonDelete"
          style="width: 100%"
          @click.prevent="
            () => {
              $router.back();
            }
          "
        >
          Cancel
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useICookie from "~/composables/cookie";
import { useToast } from "primevue/usetoast";
const { BASE_URL } = useRuntimeConfig().public;
const { SYSTEM_PRIVILEGE } = useRuntimeConfig().public;
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
const { activity } = useActivity();

activity.value.info.start = `${
  activity.value.info.start.split("T")[0]
}T${new Date(activity.value.info.start).toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
})}`;

activity.value.info.end = `${activity.value.info.end.split("T")[0]}T${new Date(
  activity.value.info.end
).toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
})}`;

const createActivity = async () => {
  try {
    const data = { ...trace.value, ...activity.value };
    // console.log(data);
    const {
      data: responseData,
      status,
      error,
    } = await useFetch(`${BASE_URL}/activity`, {
      method: "post",
      body: data,
      watch: false,
      headers: {
        access_token: useICookie.get("access_token"),
        UserLevelId: SYSTEM_PRIVILEGE,
      },
    });
    if (error.value) throw error.value;
    toastMessage(
      "success",
      200,
      activity.value.info.id
        ? `${activity.value.info.title} has been updated!`
        : `${activity.value.info.title} has been created!`
    );
    await navigateTo(`/tracker/project/${trace.value.ProjectId}`);
  } catch (error) {
    console.log(error);
    toastMessage("error", error.statusCode, error.statusMessage);
    // console.log(Object.keys(error));
  }
};

const { data: PartnerDetail } = await useFetch(
  `${BASE_URL}/partner/${trace.value.PartnerId}`
);

const { data: ProjectDetail } = await useFetch(
  `${BASE_URL}/project/${trace.value.ProjectId}`
);

const openContainer = ref({
  info: false,
  Discussions: false,
  outcome: false,
  todo: false,
  attendance: false,
  summary: false,
});
</script>

<template>
  <div class="primeBox">
    <div class="flex flex-col primeBox">
      <div class="flex justify-between items-center px-4">
        <div class="flex flex-row">
          <h1
            class="hover:cursor-pointer"
            @click.prevent="openProject = !openProject"
          >
            {{ data.name }}
          </h1>
          <div
            :class="`flex justify-center items-center border-2 rounded-full w-4 h-4 text-xs font-bold text-slate-400 hover:cursor-pointer hover:border-indigo-700 hover:text-indigo-700 transition ease-in-out duration-500 ${
              openInfo ? 'border-lime-700 text-lime-700' : ''
            }`"
            @click.prevent="openInfo = !openInfo"
          >
            !
          </div>
        </div>
        <div class="flex gap-2">
          <div
            :class="`flex justify-center items-center border-2 border-black font-black rounded-full w-6 h-6 text-xs hover:cursor-pointer hover:border-indigo-700 hover:text-indigo-700 transition ease-in-out duration-500`"
            @click.prevent="navigateTo(`/tracker/assignment/edit/${data.id}`)"
          >
            ✎
          </div>
          <div
            :class="`flex justify-center items-center border-2 border-black font-black rounded-full w-6 h-6 text-xs hover:cursor-pointer hover:border-red-700 hover:text-white hover:bg-red-700 transition ease-in-out duration-500`"
            @click.prevent="deleteProgram(data.id)"
          >
            x
          </div>
        </div>
      </div>
      <!-- Program Info -->
      <div
        :class="`primeBox duration-1000 overflow-hidden ${
          openInfo ? 'max-h-[150vh] overflow-y-auto' : 'max-h-[0vh]'
        }`"
        @click.prevent="openInfo = false"
      >
        <CardsProgramInfo :ProgramDetail="ProgramDetail ? ProgramDetail : []" />
      </div>
      <!-- End of Program Info -->
      <!-- Project List -->
      <div>
        <div
          :class="`primeBox duration-1000 overflow-hidden flex flex-col gap-2 ${
            openProject ? 'max-h-[150vh] p-2 ' : 'max-h-[0vh]'
          }`"
        >
          <div class="flex flex-wrap justify-start gap-2">
            <div v-for="project in Projects" class="md:w-[23vw] w-screen">
              <!-- {{ project }} -->
              <!-- {{ project.Partners }} -->
              <CardsMiniProject
                :ProjectId="project.id"
                :title="project.title"
                :projectCategory="project.Category.name"
                :startDate="project.start"
                :endDate="project.end"
                :sinergy="project.Partners"
                :logoId="project.image && project.id"
                :key="project.id"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- End Project List -->
    </div>
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;

const { trace } = useTrace();
const openInfo = ref(false);
const openProject = ref(false);
const { data } = defineProps(["data"]);
const { data: ProgramDetail } = await useFetch(
  `${BASE_URL}/program/${data.id}`
);
const { data: Projects } = await useFetch(
  `${BASE_URL}/project/program/${data.id}`
);

const deleteProgram = async (ProgramId) => {
  try {
    console.log("clicked");
    await useFetch(`${BASE_URL}/program/${ProgramId}`, { method: "DELETE" });
    reloadNuxtApp({ ttl: 0 });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="w-full">
    <Head
      ><Title>
        {{ PartnerDetail?.name }}
      </Title>
    </Head>

    <FormsProject />
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;

const { trace } = useTrace();
const { project } = useProject();

const { data: PartnerDetail, status } = await useFetch(
  `${BASE_URL}/partner/${trace.value.PartnerId}`
);

const { data: ProjectDetail, status: statusProject } = await useFetch(
  `${BASE_URL}/project/${trace.value.ProjectId}`
);
const {
  id: ProjectId,
  folderUrl,
  title,
  location,
  start,
  end,
  background,
  image,
} = ProjectDetail.value;
project.value.project = {
  id: ProjectId,
  folderUrl,
  title,
  location,
  start: `${start.split("T")[0]}T${new Date(start).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })}`,
  end: `${end.split("T")[0]}T${new Date(end).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })}`,
  background,
  image,
  image: false,
};

project.value.project.CategoryId = ProjectDetail.value.Category.id;
project.value.ProjectRundown = ProjectDetail.value.ProjectRundowns;
project.value.Sinergy = ProjectDetail.value.Partners;
project.value.ProjectIndicators = ProjectDetail.value.ProgramIndicators.map(
  (el) => {
    return {
      id: el.ProjectProgramIndicator.id,
      ProgramIndicatorId: el.id,
      ProgramId: el.Program.id,
    };
  }
);
// console.log(trace.value.PartnerId);
// onMounted(async () => {});
</script>

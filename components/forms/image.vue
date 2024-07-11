<template>
  <div class="flex px-4">
    <input
      type="file"
      accept="image/png,image/jpeg"
      class="border-0"
      @change="
        (e) => {
          formData.append('logo', e.target.files[0]);
        }
      "
    />
    <div
      class="cursor-pointer border-2 rounded-full border-ongoing px-2 hover:text-white hover:bg-ongoing"
      @click.prevent="
        () => {
          sendFile();
        }
      "
    >
      Upload Logo
    </div>
    <!-- {{ typeof setModal }} -->
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;

const { ProjectId } = defineProps(["ProjectId"]);
const emit = defineEmits(["setModal"]);
const formData = new FormData();

const sendFile = async () => {
  try {
    await useFetch(`${BASE_URL}/project/image/${ProjectId}`, {
      method: "POST",
      body: formData,
    });
    emit("setModal", false);

    // navigateTo(`/tracker/project/${ProjectId}`);
    // window.location.reload(true);
    reloadNuxtApp();
    // console.log("move");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div :class="`border-4 rounded-2xl px-2 flex ${isNotComplete()?.class}`">
    <div class="w-[10%] flex justify-center items-center">
      <img
        v-if="!isNotComplete()?.isTrue && !image"
        src="../../../assets/logo/kadin.png"
      />

      <img
        v-if="!isNotComplete()?.isTrue && image"
        :src="`${BASE_URL}/project/image/${data.Project.id}`"
        class="xl:max-h-[5em]"
      />
      <!-- {{ image }} -->
      <div class="flex justify-center items-center text-pred">
        <IconsWarning v-if="isNotComplete()?.isTrue" />
      </div>
    </div>
    <div class="w-full p-2">
      <div class="flex justify-between items-start">
        <div class="leading-none">
          <h2 class="uppercase">
            {{ data.title }}
          </h2>
          <h6>Location: {{ data.location }}</h6>
          <span>{{ dates(data.start, data.end) }}</span>
        </div>
        <span class="italic" v-if="data.Project?.title"
          >Project Name:
          <span class="font-bold">
            {{ data.Project?.title }}
          </span>
        </span>
        <span class="italic font-bold text-stop" v-if="!data.Project?.title">
          Non-Project Activity
        </span>
      </div>
      <p>{{ data.summary }}</p>
    </div>
  </div>
</template>
<script setup>
import { dates } from "~/helpers/get-date";
const { BASE_URL } = useRuntimeConfig().public;
const { data } = defineProps(["data"]);
const image = ref(false);

if (data.Project?.id) {
  const { data: imagedata, status } = await useFetch(
    `${BASE_URL}/project/image/${data.Project.id}`,
    { responseType: "json" }
  );
  console.log(status.value);
  if (status.value == "success") image.value = true;
}
// console.log(status.value);
// if (status.value == "success")
//   image.value = btoa(String.fromCharCode(...new Uint8Array(imagedata.value)));
// console.log(image.value);

// console.log(Buffer.from(imagedata));

// console.log(data.summary);
const isNotComplete = () => {
  if (!data.summary && new Date(data.end) < new Date())
    return { class: "border-pred text-pred items-center", isTrue: true };
};
</script>

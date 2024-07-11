<template>
  <div
    class="shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] p-2 rounded-2xl transition ease-in-out delay-400 hover:scale-105 hover:cursor-pointer bg-gray-100 flex flex-col gap-2 my-2"
  >
    <div class="text-center flex flex-col items-center">
      {{ ProgramId }}
      <div class="font-extrabold">Indonesia Sharia Economic Forum 2024</div>
      <div>15 June 2024 - 20 June 2024</div>
      <div class="flex gap-2">
        <div class="flex flex-col items-center">
          <img
            src="~/assets/icons/flyer.png"
            width="20vw"
            alt="flyer"
            class="src"
          />
          <!-- <span> flyer </span> -->
        </div>
        <div class="flex flex-col items-center">
          <img
            src="~/assets/icons/photo.png"
            width="20vw"
            alt="photo"
            class="src"
          />
          <!-- <span> flyer </span> -->
        </div>
        <div class="flex flex-col items-center">
          <img
            src="~/assets/icons/video.png"
            width="20vw"
            alt="video"
            class="src"
          />
          <!-- <span> flyer </span> -->
        </div>
        <div class="flex flex-col items-center">
          <img
            src="~/assets/icons/release.png"
            width="20vw"
            alt="video"
            class="src"
          />
          <!-- <span> flyer </span> -->
        </div>
      </div>
      <div class="border-[1px] w-[75%] border-black mt-2" />
    </div>
    <div class="italic text-xs">
      <div>last activity:</div>
      <div class="font-bold">Rapat persiapan dan sponsorship</div>
      <div>Menara Kadin, Ruang Sinarmas</div>
      <div>Mon, 15 Jan 2024</div>
    </div>
  </div>
</template>
<script setup>
const { ProgramId } = defineProps(["ProgramId"]);
</script>

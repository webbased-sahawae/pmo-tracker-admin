<template>
  <div class="flex flex-col gap-2 w-full">
    <div
      @click.prevent="
        () => {
          isOpen = !isOpen;
        }
      "
    >
      <h2
        class="cursor-pointer text-pretty w-full flex leading-none"
        v-if="data.topic"
      >
        {{ index + "." }} {{ data.topic }}
        <h3 v-if="!isOpen" class="italic font-normal">- {{ data.speaker }}</h3>
      </h2>
    </div>
    <div
      :class="`duration-1000 overflow-hidden ${
        isOpen ? 'max-h-[50vw]' : 'max-h-[0vw]'
      } flex gap-2`"
    >
      <div class="flex flex-col gap-2 w-full">
        <div class="flex flex-col w-full">
          <label> Topic </label
          ><input
            placeholder="Topic"
            :value="data.topic"
            @keyup="
              (e) => {
                data.topic = e.target.value;
              }
            "
            @change="
              (e) => {
                data.updatedAt = new Date();
              }
            "
          />
        </div>
        <div class="flex flex-col w-full">
          <label> Speaker </label>
          <input
            placeholder="Speaker"
            :value="data.speaker"
            @change="
              (e) => {
                data.updatedAt = new Date();
              }
            "
            @keyup="
              (e) => {
                data.speaker = e.target.value;
              }
            "
          />
        </div>
        <div class="flex flex-col w-full">
          <label> Discussion </label>
          <textarea
            rows="5"
            class="px-2 w-full"
            :value="data.description"
            @keyup="
              (e) => {
                data.description = e.target.value;
              }
            "
            @change="
              (e) => {
                data.updatedAt = new Date();
              }
            "
          />
        </div>
      </div>

      <div
        class="w-fit h-fit buttonDelete"
        @click.prevent="
          () => {
            data.deletedAt = new Date();
          }
        "
      >
        <IconsCross width="1em" />
      </div>
    </div>
  </div>
</template>
<script setup>
const { data, index } = defineProps(["data", "index"]);
const isOpen = ref(true);
</script>

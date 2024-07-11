<template>
  <div class="relative">
    <input
      @focus="searchResultOpen.search = true"
      @blur="searchResultOpen.search = false"
      type="text"
      list="browsers"
      class="w-full"
      @keyup="
        (e) => {
          searchFuntion(e.target.value);
          search = e.target.value;
          ``;
        }
      "
    />
    <div
      :class="`flex flex-col mt-2 absolute child bg-white w-full  ${
        !searchResult?.value?.length && 'hidden'
      }  ${
        !searchResultOpen.result && !searchResultOpen.search && 'hidden'
      } rounded-2xl max-h-[25vw] overflow-scroll`"
    >
      <div
        v-for="item in searchResult.value"
        class="whitespace-normal hover:bg-blue-700 hover:text-white hover:cursor-pointer px-4 rounded-full duration-500"
        @click.prevent="chooseResult(item)"
        @mouseover="searchResultOpen.result = true"
        @mouseout="searchResultOpen.result = false"
      >
        <span class="font-bold">
          {{ item[titleField] }}
        </span>
        <div class="">{{ item[descriptionField] }}</div>
        <div class="italic">{{ item.Institution.name }}</div>
      </div>
    </div>
    {{ searchResult?.value?.length }}
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;

let { apiRoute, setValue, titleField, descriptionField } = defineProps([
  "apiRoute",
  "setValue",
  "titleField",
  "descriptionField",
]);
const search = ref("");
const searchResult = ref([]);
const searchFuntion = async (searchValue) => {
  if (search.value.length > 2) {
    const { data: partners, status } = await useFetch(
      `${BASE_URL}${apiRoute}${searchValue}`
    );
    searchResult.value = partners;
  } else searchResult.value = [];
};
const searchResultOpen = ref({ search: false, result: false });

const chooseResult = (item) => {
  !setValue.map((el) => JSON.stringify(el)).includes(JSON.stringify(item)) &&
    setValue.push(item);

  searchResultOpen.value.result = false;
};
</script>

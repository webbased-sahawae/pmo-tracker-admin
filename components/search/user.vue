<template>
  <div class="relative">
    {{ searchResultOpen }}
    {{ search }}
    <input
      @focus="searchResultOpen.search = true"
      @blur="searchResultOpen.search = false"
      type="text"
      list="browsers"
      class="w-full px-2"
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
      } rounded-2xl max-h-[25vh] overflow-y-auto`"
    >
      <div
        v-for="item in searchResult.value"
        class="whitespace-normal hover:bg-blue-700 hover:text-white hover:cursor-pointer px-4 rounded-full duration-500"
        @click.prevent="chooseResult(item)"
        @mouseover="searchResultOpen.result = true"
        @mouseout="searchResultOpen.result = false"
      >
        <span class="font-bold">
          {{ item.name }}
        </span>
        <div class="">{{ item.Partner.name }}</div>
        <div class="italic" v-if="item.position">{{ item.position }}</div>
      </div>
    </div>
    {{ searchResult?.value?.length }}
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;

const { setValue } = defineProps(["setValue"]);
const search = ref("");
const searchResult = ref([]);
const searchFuntion = async (searchValue) => {
  if (search.value.length > 1) {
    const { data: users, status } = await useFetch(
      `${BASE_URL}/user/search/${searchValue}`
    );
    searchResult.value = users;
  } else searchResult.value = [];
};
const searchResultOpen = ref({ search: false, result: false });

const chooseResult = (item) => {
  if (!setValue.map((el) => JSON.stringify(el)).includes(JSON.stringify(item)))
    setValue.push(item);
  searchResultOpen.value.result = false;
};
</script>

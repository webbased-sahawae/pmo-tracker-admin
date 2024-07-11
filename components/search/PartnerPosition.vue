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
          console.log('asadasd');

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
          {{ item.Position.name }}
        </span>
        <!-- <div class="italic">{{ item[descriptionField] }}</div> -->
      </div>
    </div>
    {{ searchResult?.value?.length }}
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;
const { dataProgram } = useProgram();

const search = ref("");
const searchResult = ref([]);
const searchFuntion = async (searchValue) => {
  console.log(useTrace().trace.value.PartnerId);
  if (search.value.length > 2) {
    const { data: partners, status } = await useFetch(
      `${BASE_URL}/PartnerPosition/search/${useTrace().trace.value.PartnerId}`,
      { query: { search: searchValue } }
    );
    searchResult.value = partners;
  } else searchResult.value = [];
};
const searchResultOpen = ref({ search: false, result: false });

const chooseResult = (item) => {
  !dataProgram.value.PartnerPosition.map((el) => JSON.stringify(el)).includes(
    JSON.stringify(item)
  ) && dataProgram.value.PartnerPosition.push(item);
  console.log(item);
  searchResultOpen.value.result = false;
};
</script>

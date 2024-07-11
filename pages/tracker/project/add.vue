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
const { data: PartnerDetail, status } = await useFetch(
  `${BASE_URL}/partner/${trace.value.PartnerId}`
);

// console.log(trace.value.PartnerId);
// onMounted(async () => {});
</script>

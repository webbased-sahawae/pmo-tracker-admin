<template>
  <div class="flex flex-col gap-2">
    <SearchSinergy
      :set-value="project.Sinergy"
      :api-route="'/partner/search/'"
      title-field="name"
      description-field="chief"
    />
    <div>
      <div v-for="institution in institutionList">
        {{ institution.name }}
        <div
          v-for="(partner, index) in project.Sinergy.filter(
            (el) => !el.deletedAt && el.InstitutionId == institution.id
          )"
          :key="partner.id"
          @click.prevent="
            () => {
              if (!partner.isOwner) partner.deletedAt = new Date();
            }
          "
        >
          <div class="flex flex-wrap">
            <CardsPartner :PartnerId="partner.id" />
          </div>
        </div>
      </div>
    </div>
    <!-- {{ institutionList }} -->
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;

const { project } = useProject();

const { data: institutionList, status } = await useFetch(
  `${BASE_URL}/institution`
);
</script>

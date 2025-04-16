<template>
  <div class="py-4 rounded-se-2xl bg-dprimary flex flex-col h-full w-full">
    <div class="p-4 w-full">
      <div class="text-primary text-sm mb-2 flex gap-2 w-full">
        <img :src="user.picture" class="rounded-full" width="75" />
        <div>
          <div>{{ user.name }}</div>
          <div class="text-xs italic truncate w-full">{{ user.email }}</div>
          <div @click="navigateTo('/login')" class="cursor-pointer">Logout</div>
        </div>
      </div>
    </div>
    <div
      class="text-wrap text-secondary cursor-pointer border-y-dprimary hover:text-primary hover:border-y-[#FFF] duration-1000 border-y-2 px-4"
      @click="
        () => {
          navigateTo('/tracker/general-report');
        }
      "
    >
      General Report
    </div>
    <div
      class="text-wrap text-secondary cursor-pointer border-y-dprimary hover:text-primary hover:border-y-[#FFF] duration-1000 border-y-2 px-4"
      @click="
        () => {
          navigateTo(
            '/tracker/partner?PartnerId=8ca69da3-4f05-4768-8748-89a04a536aed'
          );
        }
      "
    >
      Report Bidang / Badan
    </div>
    <div
      class="text-wrap text-secondary cursor-pointer border-y-dprimary hover:text-primary hover:border-y-[#FFF] duration-1000 border-y-2 px-4"
      @click="
        () => {
          navigateTo('/tracker/user');
        }
      "
    >
      User
    </div>
    <div
      class="text-wrap text-secondary cursor-pointer border-y-dprimary hover:text-primary hover:border-y-[#FFF] duration-1000 border-y-2 px-4"
      @click="
        () => {
          navigateTo('/tracker/assignment');
        }
      "
    >
      Assignment
    </div>
    <!-- <div
      class="text-wrap text-secondary cursor-pointer border-y-dprimary hover:text-primary hover:border-y-[#FFF] duration-1000 border-y-2 px-4"
      @click="
        () => {
          navigateTo('/tracker/user');
        }
      "
    >
      Department
    </div> -->
    <div>
      <div
        class="mt-4 text-wrap text-secondary border-y-dprimary duration-1000 border-y-2 px-4 border-t-2 border-t-white pt-2 font-bold underline"
      >
        Project and Activity
      </div>
      <div class="px-4">
        <div
          class="text-wrap text-secondary cursor-pointer border-y-dprimary hover:text-primary hover:border-y-[#FFF] duration-1000 border-y-2 px-4"
          @click="
            () => {
              navigateTo('/tracker/project/management/category');
            }
          "
        >
          Categories
        </div>
        <div
          class="text-wrap text-secondary cursor-pointer border-y-dprimary hover:text-primary hover:border-y-[#FFF] duration-1000 border-y-2 px-4"
          @click="
            () => {
              navigateTo('/tracker/project/management');
            }
          "
        >
          Impacts
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import pmoAPI from "../composables/rest-api";

const { data: user } = await pmoAPI.getWithAccess();
</script>

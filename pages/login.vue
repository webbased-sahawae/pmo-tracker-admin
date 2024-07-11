<template>
  <div
    class="flex h-[100vh] w-[100vw] justify-center items-center flex-col gap-4"
  >
    <div
      class="col-span-2 rounded-2xl flex justify-center flex-col items-center leading-none"
    >
      <div class="w-[10%]">
        <img src="~/assets/logo/kadin.png" />
      </div>
      <div
        class="text-2xl font-bold text-dprimary w-full justify-center flex flex-col items-center leading-none"
      >
        <div>{{ SYSTEM_NAME }} {{ new Date().getFullYear() }}</div>
        <div class="text-dprimary text-base">
          {{ SYSTEM_DESCRIPTION }}
        </div>
      </div>
      <div class="uppercase font-bold text-xl text-dsecondary">
        Sekretariat Kadin Indonesia
      </div>
    </div>

    <GoogleSignInButton
      @success="handleLoginSuccess"
      @error="handleLoginError"
    ></GoogleSignInButton>
  </div>
</template>

<script setup>
import { GoogleSignInButton } from "vue3-google-signin";
import useICookie from "~/composables/cookie";
import pmoAPI from "~/composables/rest-api";
import { SYSTEM_DESCRIPTION, SYSTEM_NAME } from "~/constants/ids";
import { useToast } from "primevue/usetoast";

// console.log(useRuntimeConfig().public);
const toast = useToast();

const toastMessage = (severity, code, message) => {
  toast.add({
    severity,
    summary: code,
    detail: message,
    life: 10000,
  });
};

useSeoMeta({
  title: `${SYSTEM_NAME} ${new Date().getFullYear()}`,
  ogTitle: `${SYSTEM_NAME} ${new Date().getFullYear()}`,
  description: `${SYSTEM_NAME} (${SYSTEM_DESCRIPTION}): ${new Date().getFullYear()}`,
  ogDescription: `${SYSTEM_NAME} (${SYSTEM_DESCRIPTION}): ${new Date().getFullYear()}`,
  ogImage:
    "https://mlyvovd6bvsz.i.optimole.com/cb:zMs_.21389/w:53/h:51/q:mauto/f:best/https://kadin.id/wp-content/uploads/Kadin-Logo-tanpa-text-1.png",
  twitterCard: "summary_large_image",
});

// handle success event
const handleLoginSuccess = async (response) => {
  try {
    const { credential } = response;
    const { data: login_data, error } = await pmoAPI.login(credential);
    if (error?.value?.statusCode) throw error.value;
    console.log(
      "================================================================"
    );
    console.log(login_data.value);
    console.log(
      "================================================================"
    );
    toastMessage(
      "success",
      "Login Success",
      `Login as ${login_data.value.name}`
    );

    await useICookie.set("access_token", login_data.value.access_token);
    await navigateTo({
      path: "/tracker/general-report",
    });
  } catch (error) {
    toastMessage("error", error.statusCode, error.statusMessage);
  }
};

// handle an error event
const handleLoginError = () => {
  toastMessage("error");
};
</script>

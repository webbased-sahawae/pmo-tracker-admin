<template>
  <div class="flex gap-2 flex-col">
    <h1 class="text-center uppercase">
      {{ PartnerDetail?.name }}
    </h1>
    <!-- Program -->
    <div class="flex flex-col">
      <h2>Program</h2>
      <input
        placeholder="Nama Program"
        :value="dataProgram.program.name"
        @keyup="
          (e) => {
            dataProgram.program.name = e.target.value;
          }
        "
      />
    </div>
    <!-- Visi Program -->
    <div class="flex flex-col">
      <div>
        <h2>Visi Program</h2>
      </div>
      <div class="flex flex-col gap-2">
        <div
          v-for="(vision, index) in dataProgram.vision.filter(
            (el) => !el.deletedAt
          )"
          class="flex flex-row gap-6 items-center"
        >
          <textarea
            rows="2"
            :placeholder="`Visi program ke-${index + 1}`"
            class="w-full"
            :value="vision.description"
            @keyup="
              (e) => {
                vision.description = e.target.value;
              }
            "
          />
          <div
            class="buttonDelete"
            :onclick="() => (vision.deletedAt = new Date())"
          >
            X
          </div>
        </div>
        <div
          class="buttonAdd"
          @click.prevent="
            () => {
              dataProgram.vision.push({});
            }
          "
        >
          Add vision
        </div>
      </div>
    </div>
    <!-- Pendorong Eksekusi Program -->
    <div class="flex flex-col">
      <h2>Pendorong Eksekusi Program</h2>
      <div class="flex flex-col gap-2">
        <div
          v-for="(driver, index) in dataProgram.driver.filter(
            (el) => !el.deletedAt
          )"
          class="flex flex-row gap-6 items-center"
        >
          <textarea
            rows="2"
            :placeholder="`Pendorong eksekusi program ke-${index + 1}`"
            class="w-full"
            :value="driver.description"
            @keyup="
              (e) => {
                driver.description = e.target.value;
              }
            "
          />
          <div
            class="buttonDelete"
            :onclick="() => (driver.deletedAt = new Date())"
          >
            X
          </div>
        </div>
        <div
          class="buttonAdd"
          @click.prevent="
            () => {
              dataProgram.driver.push({});
            }
          "
        >
          Add Program Driver
        </div>
      </div>
    </div>
    <!-- KPI Yang dipantau -->
    <div class="flex flex-col">
      <h2>KPI yang dipantau</h2>
      <div class="flex flex-col gap-2">
        <div
          v-for="(indicator, index) in dataProgram.indicator.filter(
            (el) => !el.deletedAt
          )"
          class="flex flex-row gap-6 items-center"
        >
          <textarea
            rows="2"
            :placeholder="`KPI yang dipantau ke-${index + 1}`"
            class="w-full"
            :value="indicator.description"
            @keyup="
              (e) => {
                indicator.description = e.target.value;
              }
            "
          />
          <div
            class="buttonDelete"
            :onclick="() => (indicator.deletedAt = new Date())"
          >
            X
          </div>
        </div>
        <div
          class="buttonAdd"
          @click.prevent="
            () => {
              dataProgram.indicator.push({});
            }
          "
        >
          Add KPI
        </div>
      </div>
    </div>
    <!-- Tahapan Eksekusi -->
    <div class="flex flex-col">
      <h2>Tahapan Eksekusi</h2>
      <div class="flex flex-col gap-2">
        <div
          v-for="(phase, index) in dataProgram.phase.filter(
            (el) => !el.deletedAt
          )"
          class="flex flex-row gap-6 items-center"
        >
          <textarea
            rows="2"
            :placeholder="`Tahapan Eksekusi ke-${index + 1}`"
            class="w-full"
            :value="phase.description"
            @keyup="
              (e) => {
                phase.description = e.target.value;
              }
            "
          />
          <div>
            <h3>Execution periode</h3>
            <select
              name="quarter"
              @change="
                (e) => {
                  phase.quarter = e.target.value;
                }
              "
            >
              <option value="1">Q1</option>
              <option value="2">Q2</option>
              <option value="3">Q3</option>
              <option value="4">Q4</option>
            </select>
          </div>
          <div
            class="buttonDelete"
            :onclick="() => (phase.deletedAt = new Date())"
          >
            X
          </div>
        </div>
        <div
          class="buttonAdd"
          @click.prevent="
            () => {
              dataProgram.phase.push({ quarter: 1 });
            }
          "
        >
          Add Tahapan Eksekusi
        </div>
      </div>
    </div>

    <!-- Keterkaitan 17 Program -->
    <div class="flex flex-col">
      <h2>Keterkaitan 17 Prioritas</h2>
      <div class="flex gap-4">
        <div class="flex gap-2">
          <input placeholder="Type to search" @keyup="searchPriority" />
          <div class="flex gap-2"></div>
        </div>
        <div
          class="flex flex-row gap-2 primeBox p-2 w-full overflow-scroll scroll-smooth"
        >
          <CardsButtonToAdd
            v-for="priority in priorities.value"
            :title="priority.name"
            :description="priority.chief"
            :key="priority.id"
            @click.prevent="addId('priority', { PriorityId: priority.id })"
          />
        </div>
      </div>

      <div
        class="flex flex-row flex-wrap gap-2 p-2 w-full"
        v-if="dataProgram.priority?.filter((el) => !el.deletedAt).length"
      >
        <CardsButtonAdded
          v-for="(item, index) in dataProgram.priority.filter(
            (el) => !el.deletedAt
          )"
          :FieldId="item.PriorityId"
          :onclick="() => (item.deletedAt = new Date())"
          field="priority"
          :key="item.PriorityId"
        />
      </div>
    </div>
    <div>
      <!-- {{ stayPage }} -->
      <div
        @click.prevent="stayPage = !stayPage"
        class="cursor-pointer"
        v-if="dataProgram.program.id"
      >
        <input type="checkbox" :checked="stayPage" />
        Stay on this page after submit
      </div>
      <div class="flex max-w-[100vw] gap-4">
        <button
          class="buttonAdd"
          style="width: 100%"
          type="submit"
          @click.prevent="submitProgram"
        >
          {{ !dataProgram.program.id ? "Submit" : "Update" }}
        </button>
        <button
          class="buttonDelete"
          style="width: 100%"
          type="button"
          :onclick="
            () => {
              navigateTo({ path: `/program`, query: trace.PartnerId });
            }
          "
        >
          Cancel
        </button>
      </div>
    </div>
    <!-- {{ dataProgram.PartnerPosition }} -->
  </div>
</template>
<script setup>
import { uniqueArray } from "~/helpers/array.js";
const { BASE_URL } = useRuntimeConfig().public;
const { trace } = useTrace();
const stayPage = ref(true);

const { data: PartnerDetail, status } = await useFetch(
  `${BASE_URL}/partner/${trace.value.PartnerId}`
);

const { dataProgram } = useProgram();
// dataProgram.program.PartnerId = trace.value.PartnerId;
dataProgram.value.program.PartnerId = trace.value.PartnerId;
// PartnerPositions module
const PartnerPositions = ref([]);
const searchPartnerPositions = async (e) => {
  if (e.target.value.length > 2) {
    const { data: ProgramPartnerPositions, status } = await useFetch(
      `${BASE_URL}/PartnerPosition/search/${trace.PartnerId}`,
      { query: { search: e.target.value } }
    );
    if (ProgramPartnerPositions)
      PartnerPositions.value = ProgramPartnerPositions;
    else PartnerPositions.value = [];
  }
  if (e.target.value.length < 3) PartnerPositions.value = [];
};

// Partner module
const partners = ref([]);
const searchPartners = async (e) => {
  if (e.target.value.length > 2) {
    const { data: StratgicPartner, status } = await useFetch(
      `${BASE_URL}/partner/search/${e.target.value}`
    );
    if (StratgicPartner) partners.value = StratgicPartner;
    else partners.value = [];
  }
  if (e.target.value.length < 3) partners.value = [];
};
// Priority module
const priorities = ref([]);
const searchPriority = async (e) => {
  if (e.target.value.length > 2) {
    const { data: ProgramPriorities, status } = await useFetch(
      `${BASE_URL}/priority/search/${e.target.value}`
    );
    if (ProgramPriorities) priorities.value = ProgramPriorities;
    else priorities.value = [];
  }
  if (e.target.value.length < 3) priorities.value = [];
};

const addId = (fieldName, value) => {
  console.log(fieldName, value);

  dataProgram.value[fieldName] = uniqueArray([
    ...dataProgram.value[fieldName],
    value,
  ]);
};

const submitProgram = async () => {
  if (!dataProgram.value.program.name) console.log("input program name");
  else {
    const { data: responseData } = await useFetch(`${BASE_URL}/program/`, {
      method: "post",
      body: dataProgram.value,
    });
    console.log(responseData);
    if (!stayPage.value || dataProgram.value.program.id) {
      console.log("move!!!");
      await navigateTo(`/tracker/assignment/${trace.value.PartnerId}`);
    } else
      dataProgram.value = {
        program: { PartnerId: trace.value.PartnerId },
        vision: [],
        driver: [],
        indicator: [],
        phase: [],
        PartnerPosition: [],
        partner: [],
        priority: [],
      };
  }
};

onBeforeUnmount(() => {
  console.log("about to go");
  dataProgram.value = {
    program: { PartnerId: trace.value.PartnerId },
    vision: [],
    driver: [],
    indicator: [],
    phase: [],
    PartnerPosition: [],
    partner: [],
    priority: [],
  };
});
</script>

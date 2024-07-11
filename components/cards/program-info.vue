<template>
  <div class="flex flex-col gap-2 primeBox">
    <div class="flex flex-col p-2">
      <div class="flex gap-2">
        <img
          src="~/assets/icons/vision.png"
          class="object-contain"
          width="15"
        />
        <h2>Visi Program</h2>
      </div>
      <div
        v-for="(vision, index) in ProgramDetail.ProgramVisions"
        class="flex gap-2 items-start"
      >
        <div class="flex">
          {{ index + 1 }}.
          <div>
            {{ vision.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col p-2">
      <div class="flex gap-2">
        <img
          src="~/assets/icons/driver.png"
          class="object-contain"
          width="15"
        />
        <h2>Pendorong Eksekusi Program</h2>
      </div>
      <div
        v-for="(driver, index) in ProgramDetail.ProgramDrivers"
        class="flex gap-2 items-start"
      >
        <div class="flex">
          {{ index + 1 }}.
          <div>
            {{ driver.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col p-2">
      <div class="flex gap-2">
        <img
          src="~/assets/icons/indicator.png"
          class="object-contain"
          width="15"
        />
        <h2>KPI yang dipantau</h2>
      </div>
      <div
        v-for="(indicator, index) in ProgramDetail.ProgramIndicators"
        class="flex gap-2 items-start"
      >
        <div class="flex">
          {{ index + 1 }}.
          <div>
            {{ indicator.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col p-2">
      <div class="flex gap-2">
        <img src="~/assets/icons/phase.png" class="object-contain" width="15" />
        <h2>Tahapan Eksekusi</h2>
      </div>
      <div
        v-for="(phase, index) in ProgramDetail.ProgramPhases"
        class="flex gap-2 items-start"
      >
        <div class="flex">
          {{ index + 1 }}.
          <div>
            {{ phase.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col p-2">
      <div class="flex gap-2">
        <img
          src="~/assets/icons/PartnerPosition.png"
          class="object-contain"
          width="15"
        />
        <h2>PIC (Komtap)</h2>
      </div>
      <div
        v-for="(PartnerPosition, index) in ProgramDetail.ProgramPartnerPosition"
        class="flex gap-2 items-start"
      >
        <div class="flex">
          {{ index + 1 }}.
          <div>
            {{ PartnerPosition.Position.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col p-2">
      <div class="flex gap-2">
        <img
          src="~/assets/icons/partner.png"
          class="object-contain"
          width="15"
        />
        <h2>Mitra Strategis</h2>
      </div>
      <div
        v-for="(partner, index) in ProgramDetail.ProgramPartner"
        class="flex gap-2 items-start"
      >
        <div class="flex">
          {{ index + 1 }}.
          <div>
            {{ partner.Partner.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col p-2">
      <div class="flex gap-2">
        <img
          src="~/assets/icons/priority.png"
          class="object-contain"
          width="15"
        />
        <h2>Keterkaitan 17 Program</h2>
      </div>
      <div>
        <div
          v-for="(priority, index) in ProgramDetail.ProgramPriority"
          class="flex gap-2 items-start"
        >
          <div class="flex">
            {{ index + 1 }}.
            <div>
              {{ priority.Priority.keyword }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ ProgramDetail }} -->
  </div>
</template>
<script setup>
const { ProgramDetail } = defineProps(["ProgramDetail"]);
</script>

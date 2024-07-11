<template>
  <div class="flex flex-col gap-6">
    <div>
      <FormsProjectRundown />
    </div>
    <div class="primeBox p-4 flex flex-col gap-2">
      <table class="hidden md:table w-full table-auto">
        <tr>
          <th>No</th>
          <th>Date</th>
          <th>Time</th>
          <th>Rundown</th>
          <th>Location</th>
          <th>Speaker / Moderator</th>
          <th>Notes</th>
        </tr>
        <tr v-for="(item, index) in project.ProjectRundown" :data="item">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ dateConvert(item.start).date }}</td>
          <td class="text-center">
            {{ dateConvert(item.start).time }} -
            {{ dateConvert(item.end).time }}
          </td>
          <td class="text-center long-cell">{{ item.title }}</td>
          <td class="text-center long-cell">{{ item.location }}</td>
          <td class="text-center long-cell">{{ item.speaker }}</td>
          <td class="text-center long-cell">{{ item.notes }}</td>
        </tr>
      </table>
      <CardsRundown v-for="item in project.ProjectRundown" :data="item" />
    </div>
  </div>
</template>

<script setup>
const { project } = useProject();

const dateConvert = (value) => {
  const event = new Date(value);
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return {
    date: event.toLocaleDateString("id-ID", dateOptions),
    time: event.toLocaleTimeString("id-ID", { timeStyle: "short" }),
  };
};
</script>
<style scoped>
th,
td {
  border-width: 2px;
  text-wrap: wrap;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.long-cell {
  text-align: left;
}
</style>

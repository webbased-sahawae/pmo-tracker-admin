<template>
  <div>
    <div class="flex flex-col gap-2">
      <div class="flex flex-col gap-2">
        <div
          :class="`flex px-4 items-center border-2 rounded-full hover:cursor-pointer hover:border-indigo-700 hover:text-indigo-700 transition ease-in-out duration-500 ${
            openInfo ? '' : ''
          }`"
          @click.prevent="openInfo = !openInfo"
        >
          {{ openInfo ? "New Rundown" : "+ Add Rundown" }}
        </div>
        <div
          :class="`flex gap-2 flex-col duration-1000 overflow-hidden ${
            openInfo ? 'max-h-[150vh]' : 'max-h-[0vh]'
          }`"
        >
          <div class="flex flex-col">
            Title
            <input
              class="px-2 w-full"
              type="text"
              :value="projectForm.title"
              @keyup="
                (e) => {
                  // console.log(e.target);

                  projectForm.title = e.target.value;
                }
              "
            />
          </div>
          <div class="flex flex-col">
            Venue
            <input
              class="px-2 w-full"
              type="text"
              :value="projectForm.location"
              @keyup="
                (e) => {
                  // console.log(e.target);

                  projectForm.location = e.target.value;
                }
              "
            />
          </div>
          <div class="flex items-center gap-2">
            <div class="flex w-full items-center gap-2">
              <div class="flex w-full items-center">
                Start:
                <input
                  type="datetime-local"
                  class="w-full px-2"
                  :value="projectForm.start"
                  @change="
                    (e) => {
                      console.log(e.target);

                      projectForm.start = e.target.value;
                    }
                  "
                />
              </div>
              <div class="flex w-full items-center">
                End:
                <input
                  class="w-full items-center px-2"
                  type="datetime-local"
                  :value="projectForm.end"
                  :min="projectForm.start"
                  @change="
                    (e) => {
                      console.log(e.target);

                      projectForm.end = e.target.value;
                    }
                  "
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col w-full">
            Speaker / Moderator
            <textarea
              class="w-full px-2"
              rows="5"
              placeholder="Description"
              :value="projectForm.speaker"
              @keyup="
                (e) => {
                  console.log(e.target);

                  projectForm.speaker = e.target.value;
                }
              "
            />
          </div>
          <div class="flex flex-col w-full">
            Notes
            <textarea
              class="w-full px-2"
              rows="5"
              placeholder="Notes"
              :value="projectForm.notes"
              @keyup="
                (e) => {
                  console.log(e.target);

                  projectForm.notes = e.target.value;
                }
              "
            />
          </div>
          <div
            class="buttonAdd"
            style="width: 100%"
            @click.prevent="
              () => {
                // console.log(projectForm.title);
                if (projectForm.title) {
                  project.ProjectRundown.push(projectForm);
                  project.ProjectRundown = project.ProjectRundown.sort(
                    (a, b) => {
                      if (!a.start && b.start) {
                        return -1;
                      } else if (a.start || !b.start) {
                        return 1;
                      }
                      // a must be equal to b
                      return 0;
                    }
                  ).sort((a, b) => {
                    if (!a.start && !b.start) {
                      if (a.title < b.title) {
                        return -1;
                      } else if (a.title > b.title) {
                        return 1;
                      }
                    } else {
                      if (a.start < b.start) {
                        return -1;
                      } else if (a.start > b.start) {
                        return 1;
                      }
                    }
                  });
                  projectForm = {};
                }
              }
            "
          >
            Add
          </div>
        </div>
      </div>
    </div>
    <table
      class="border-2"
      v-if="project.ProjectRundown.filter((el) => !el.deletedAt).length"
    >
      <tr class="border-2">
        <th>Date</th>
        <th>Time</th>
        <th>Agenda</th>
        <th>Location</th>
        <th>Speaker</th>
        <th>Notes</th>
        <th>Action</th>
      </tr>
      <tr
        v-for="rundown in project.ProjectRundown.filter((el) => !el.deletedAt)"
      >
        <td class="border-2">
          {{
            new Date(rundown.start).toLocaleString("default", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })
          }}
        </td>
        <td class="border-2">
          {{
            new Date(rundown.start).toLocaleString("default", {
              timeStyle: "short",
              hour12: false,
            })
          }}
          -
          {{
            new Date(rundown.end).toLocaleString("default", {
              timeStyle: "short",
              hour12: false,
            })
          }}
        </td>
        <td class="border-2 text-center">{{ rundown.title }}</td>
        <td class="border-2 text-center">{{ rundown.location }}</td>
        <td class="border-2 text-center">{{ rundown.speaker }}</td>
        <td class="border-2 text-center">{{ rundown.notes }}</td>
        <td class="border-2 text-center">
          <span
            class="hover:text-stop cursor-pointer font-bold"
            @click.prevent="
              () => {
                rundown.deletedAt = new Date();
              }
            "
            >X</span
          >
        </td>
      </tr>
    </table>
    {{ project.ProjectRundown }}
  </div>
</template>
<script setup>
const { project } = useProject();
const projectForm = ref({});
const openInfo = ref(false);
</script>

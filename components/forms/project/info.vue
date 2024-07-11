<template>
  <div class="">
    <div class="flex gap-2 flex-col">
      <div class="flex flex-col">
        <label>Project name</label
        ><input
          class="px-2"
          placeholder="Project name"
          :value="project.project.title"
          @keyup="
            (e) => {
              project.project.title = e.target.value;
            }
          "
        />
      </div>
      <div class="flex flex-col">
        <label>Project Folder URL</label
        ><input
          class="px-2"
          placeholder="Project Folder URL"
          :value="project.project.folderUrl"
          @keyup="
            (e) => {
              project.project.folderUrl = e.target.value;
            }
          "
        />
      </div>

      <div class="flex flex-col">
        <label>Venue</label
        ><input
          class="px-2"
          placeholder="Venue"
          :value="project.project.location"
          @keyup="
            (e) => {
              project.project.location = e.target.value;
            }
          "
        />
      </div>
      <div class="flex flex-col">
        <div>
          <label>Jenis Aktifitas</label>
        </div>
        <select
          name="project"
          id="project"
          @change="
            (e) => {
              project.project.CategoryId = e.target.value;
            }
          "
        >
          <option disabled :selected="!project.project.CategoryId">
            Please choose the project type
          </option>
          <option
            v-for="item in categories"
            :selected="item.id == project.project.CategoryId"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col">
        <div class="flex gap-4 p-2 flex-wrap">
          <div class="flex">
            <h3 class="me-2">Start</h3>
            <div>
              <input
                class="px-2"
                type="datetime-local"
                :value="project.project.start"
                @change="
                  (e) => {
                    project.project.start = e.target.value;
                  }
                "
              />
            </div>
          </div>
          <div class="flex">
            <h3 class="me-2">End</h3>
            <div>
              <input
                class="px-2"
                type="datetime-local"
                :value="project.project.end || project.project.start"
                :min="project.project.start"
                @change="
                  (e) => {
                    project.project.end = e.target.value;
                  }
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ project.project.indicator }} -->
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;

const { project } = useProject();

const { data: categories } = await useFetch(`${BASE_URL}/category`);
</script>

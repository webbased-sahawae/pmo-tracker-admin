<template>
  <div class="">
    <div class="flex gap-2 flex-col cursor-pointer">
      <div
        @click.prevent="
          () => {
            activity.info.isMain = !activity.info.isMain ? 1 : 0;
          }
        "
        class="flex items-center gap-2 font-bold"
      >
        <input
          type="range"
          max="1"
          min="0"
          :value="!activity.info.isMain ? 0 : 1"
          class="w-10 p-0 h-5 accent-complete"
        />
        <div>
          {{ activity.info.isMain ? "Main Activity" : "Side Activity" }}
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex flex-col leading-none">
          <label>Activity name</label
          ><input
            class="px-2"
            placeholder="Activity name"
            :value="activity.info.title"
            @keyup="
              (e) => {
                activity.info.title = e.target.value;
              }
            "
          />
        </div>

        <div class="flex flex-col leading-none" v-if="trace.ProjectId">
          <label>Activity score</label>
          <input
            class="px-2"
            placeholder="Activity score"
            type="number"
            min="0"
            max="100"
            :value="activity.info.score"
            @keyup="
              (e) => {
                activity.info.score = e.target.value;
              }
            "
          />
        </div>
      </div>
      <div class="flex flex-col">
        <label>Venue</label
        ><input
          class="px-2"
          placeholder="Venue"
          :value="activity.info.location"
          @keyup="
            (e) => {
              activity.info.location = e.target.value;
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
              activity.info.CategoryId = e.target.value;
            }
          "
        >
          <option disabled :selected="!activity.info.CategoryId">
            Please choose the project type
          </option>
          <option
            v-for="item in categories"
            :selected="item.id == activity.info.CategoryId"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col">
        <div class="flex gap-4 p-2">
          <div class="flex">
            <h3 class="me-2">Start</h3>
            <div>
              <input
                class="px-2"
                type="datetime-local"
                :value="activity.info.start"
                @change="
                  (e) => {
                    activity.info.start = e.target.value;
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
                :value="activity.info.end"
                :min="activity.info.start"
                @change="
                  (e) => {
                    activity.info.end = e.target.value;
                  }
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col hidden">
      <div>
        <label>Public Relation Request</label>
      </div>
      <div>
        <div class="flex gap-2 items-center">
          <input
            type="checkbox"
            :checked="activity.info.flyer"
            @click.prevent="activity.info.flyer = !activity.info.flyer"
          />
          <img
            src="~/assets/icons/flyer.png"
            alt="flyer"
            class="src"
            width="20vw"
          />
          <label>Flyer</label>
        </div>
        <div class="flex gap-2 items-center">
          <input
            type="checkbox"
            :checked="activity.info.photo"
            @click.prevent="activity.info.photo = !activity.info.photo"
          />
          <img
            src="~/assets/icons/photo.png"
            alt="photo"
            class="src"
            width="20vw"
          />
          <label>Photo</label>
        </div>
        <div class="flex gap-2 items-center">
          <input
            type="checkbox"
            :checked="activity.info.video"
            @click.prevent="activity.info.video = !activity.info.video"
          />
          <img
            src="~/assets/icons/video.png"
            alt="video"
            class="src"
            width="20vw"
          />
          <label>Video</label>
        </div>
        <div class="flex gap-2 items-center">
          <input
            type="checkbox"
            :checked="activity.info.release"
            @click.prevent="activity.info.release = !activity.info.release"
          />
          <img
            src="~/assets/icons/release.png"
            alt="release"
            class="src"
            width="20vw"
          />
          <label>Release</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { BASE_URL } = useRuntimeConfig().public;
const { trace } = useTrace();

const { activity } = useActivity();
const { data: categories } = await useFetch(`${BASE_URL}/category`);

onUnmounted(() => {
  activity.value = {
    info: {
      id: null,
      title: null,
      location: null,
      CategoryId: null,
      PartnerId: null,
      ProjectId: null,
      start: null,
      // score: 0,
      end: null,
      summary: null,
      isMain: false,
    },

    Discussions: [],

    summary: "",
  };
});
</script>

<template>
  <div>
    <div class="flex flex-col gap-2">
      <div
        :class="`flex px-4 items-center border-2 rounded-full hover:cursor-pointer hover:border-indigo-700 hover:text-indigo-700 transition ease-in-out duration-500 ${
          openInfo ? '' : ''
        }`"
        @click.prevent="openInfo = !openInfo"
      >
        {{ openInfo ? "New Invitation" : "+ Add Invitation" }}
      </div>
      <div
        :class="`flex gap-2 flex-col duration-1000 overflow-hidden ${
          openInfo ? 'max-h-[150vh]' : 'max-h-[0vh]'
        }`"
      >
        <div class="flex flex-col gap-2">
          <div class="flex flex-col">
            <label>Name</label>
            <input
              :value="invitation.name"
              @keyup="
                (e) => {
                  invitation.name = e.target.value;
                }
              "
            />
          </div>
          <div class="flex flex-col">
            <label>Jabatan</label>
            <input
              :value="invitation.position"
              @keyup="
                (e) => {
                  invitation.position = e.target.value;
                }
              "
            />
          </div>
          <div class="flex flex-col">
            <label>Instansi</label>
            <input
              :value="invitation.institution"
              @keyup="
                (e) => {
                  invitation.institution = e.target.value;
                }
              "
            />
          </div>
          <!-- <div class="flex flex-col">
            <label>Status</label>
            <select @change="(e) => (invitation.status = e.target.value)">
              <option disabled :selected="!invitation.status && true">
                Please Select Status
              </option>
              <option
                value="confirm"
                :selected="invitation.status == 'confirm' && true"
              >
                Confirm
              </option>
              <option
                value="tentative"
                :selected="invitation.status == 'tentative' && true"
              >
                Tentative
              </option>
              <option
                value="regret"
                :selected="invitation.status == 'regret' && true"
              >
                Regret
              </option>
            </select>
          </div> -->
          <div
            class="buttonAdd"
            style="width: 100%"
            @click.prevent="
              () => {
                project.ProjectInvitation.push(invitation);
                invitation = {};
              }
            "
          >
            Add
          </div>
        </div>
      </div>
    </div>
    {{ invitation }}
  </div>
</template>
<script setup>
const { project } = useProject();
const invitation = ref({});
const openInfo = ref(false);

// const searchUser = ref([]);
</script>

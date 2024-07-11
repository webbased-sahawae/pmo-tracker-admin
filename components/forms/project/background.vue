<template>
  <div>
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <div>Background</div>
        <textarea
          :value="project.background"
          @keyup="
            (e) => {
              console.log(e.target);

              project.project.background = e.target.value;
            }
          "
          rows="15"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
const { project } = useProject();
</script>

<template>
  <li class="my-4 border border-gray-400 rounded-lg p-4">
    <h1 class="text-xl font-bold pb-1">
      Index: <span class="text-lg font-light">{{ student.id || "N/A" }}</span>
    </h1>
    <h1 class="text-xl font-bold pb-1">
      Name: <span class="text-lg font-light">{{ student.Name }}</span>
    </h1>
    <h1 class="text-xl font-bold pb-1">
      Date of Birth: <span class="text-lg font-light">{{ student.DoB }}</span>
    </h1>
    <h1 class="text-xl font-bold pb-1">
      Municipality:
      <span class="text-lg font-light">{{ student.Municipality }}</span>
    </h1>
    <h1 class="text-xl font-bold pb-1">
      ArchiveDate:
      <span class="text-lg font-light">{{ student.archiveDate }}</span>
    </h1>

    <div class="flex justify-end pb-1">
      <button @click="restoreStudent" class="text-blue-500 mr-2">Restore</button>

    </div>
  </li>
</template>

<script>
export default {
  props: {
    student: Object,
  },

  methods: {
    restoreStudent() {
      this.$emit("restore", this.student.id, this.student.originalValues);
    },
  },
};
</script>

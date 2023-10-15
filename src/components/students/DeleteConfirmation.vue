<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div class="bg-white rounded-lg p-6 max-w-sm w-full">
      <h2 class="text-xl mb-4">
        Are you sure you want to delete this student?
      </h2>
      <div class="flex justify-end">
        <button @click="cancel" class="text-blue-500 mr-2">Cancel</button>
        <button @click="deleteStudent" class="text-red-500">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    deleteStudent() {
      this.$emit("delete", this.id); 
    },
  },
};
</script>

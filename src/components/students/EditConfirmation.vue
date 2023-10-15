<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="bg-white rounded-lg p-6 max-w-sm w-full">
      <h2 class="text-2xl mb-4">Edit Student</h2>
      <form @submit.prevent="updateStudent">
        <div class="mb-4">
          <label for="name" class="block mb-2">Name:</label>
          <input
            type="text"
            id="name"
            v-model="form.Name"
            class="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>
        <div class="mb-4">
          <label for="dob" class="block mb-2">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            v-model="form.DoB"
            class="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>
        <div class="mb-4">
          <label for="municipality" class="block mb-2">Municipality:</label>
          <input
            type="text"
            id="municipality"
            v-model="form.Municipality"
            class="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>
        <div class="mb-4">
          <label for="archiveDate" class="block mb-2">Archive Date:</label>
          <input
            type="text"
            id="archiveDate"
            v-model="form.ArchiveDate"
            class="w-full px-2 py-1 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Update
        </button>
        <button @click="cancelEdit" class="text-red-500">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "Name", "DoB", "Municipality", "ArchiveDate"],
  data() {
    return {
      form: {
        Name: "",
        DoB: "",
        Municipality: "",
        ArchiveDate: "",
      },
    };
  },

  created() {
    this.form.Name = this.Name;
    this.form.DoB = this.DoB;
    this.form.Municipality = this.Municipality;
    this.form.ArchiveDate = this.ArchiveDate;
  },
  methods: {
    cancelEdit() {
      this.$emit("cancel");
    },
    updateStudent() {
     
      this.$emit("update", this.form);
      this.cancelEdit(); 
    },
  },
};
</script>



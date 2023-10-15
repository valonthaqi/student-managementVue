<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="bg-white rounded-lg p-6 max-w-sm w-full">
      <h2 class="text-2xl mb-4">Register Student</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4" :class="{ invalid: !form.name.isValid }">
          <label for="name" class="block mb-2">Name:</label>
          <input
            type="text"
            id="name"
            v-model.trim="form.name.val"
            class="w-full px-2 py-1 border border-gray-300 rounded"
          />
          <p v-if="!form.name.isValid">Name must not be empty!</p>
        </div>
        <div class="mb-4" :class="{ invalid: !form.dob.isValid }">
          <label for="dob" class="block mb-2">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            v-model="form.dob.val"
            class="w-full px-2 py-1 border border-gray-300 rounded"
          />
          <p v-if="!form.dob.isValid">Date of Birth must not be empty!</p>
        </div>
        <div class="mb-4" :class="{ invalid: !form.municipality.isValid }">
          <label for="municipality" class="block mb-2">Municipality:</label>
          <input
            type="text"
            id="municipality"
            v-model.trim="form.municipality.val"
            class="w-full px-2 py-1 border border-gray-300 rounded"
          />
          <p v-if="!form.municipality.isValid">
            Municipality must not be empty!
          </p>
        </div>
        <p v-if="formIsValid">
          Please fill all the above requirements and submit again!
        </p>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          @click="submitForm"
        >
          Register
        </button>
        <button @click="cancel" class="text-red-500">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: {
          val: "",
          isValid: true,
          formIsValid: true,
        },
        dob: {
          val: "",
          isValid: true,
        },
        municipality: {
          val: "",
          isValid: true,
        },
        archiveDate: {
          val: "",
          isValid: false,
        },
        formIsValid: true,
      },
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    validateForm() {
      this.formIsValid = true;
      if (!this.form.name.val || this.form.name.val.trim() === "") {
        this.form.name.isValid = false;
        this.formIsValid = false;
      }
      if (!this.form.dob.val || this.form.dob.val.trim() === "") {
        this.form.dob.isValid = false;
        this.formIsValid = false;
      }
      if (
        !this.form.municipality.val ||
        this.form.municipality.val.trim() === ""
      ) {
        this.form.municipality.isValid = false;
        this.formIsValid = false;
      }
      // No need to check 'archiveDate' in this case
    },

    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        Name: this.form.name.val,
        DoB: this.form.dob.val,
        Municipality: this.form.municipality.val,
        ArchiveDate: this.form.archiveDate.val || null,
      };

    

      if (
        Object.entries(formData).some(
          ([key, value]) =>
            key !== "ArchiveDate" && (value === null || value.trim() === "")
        )
      ) {
       
        return;
      }

      this.$emit("save-data", formData);
    },
  },
};
</script>

<style scoped>
.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}
</style>

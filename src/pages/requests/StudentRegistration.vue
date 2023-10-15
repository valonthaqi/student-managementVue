<template>
  <div>
    <StudentRegistration
      @cancel="cancel"
      @register="submitForm"
      @save-data="saveData"
    ></StudentRegistration>
  </div>
</template>

<script>
import StudentRegistration from "@/components/students/StudentRegistration.vue";

export default {
  components: {
    StudentRegistration,
  },


  methods: {
    cancel() {
      this.$emit("cancel");
    },
    saveData(data) {
      this.$store.dispatch("students/registerStudent", data);
      this.$router.replace("/archive");
    },
  },
};
</script>

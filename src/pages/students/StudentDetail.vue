<template>
  <section class="mt-12" v-if="student">
    <div class="max-w-xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4 text-indigo-700">
        {{ student.Name }}
      </h2>
    </div>
    <base-card class="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div class="flex flex-wrap items-center justify-center gap-6">
        <div class="w-full sm:w-1/3 text-center">
          
          <h1 class="text-2xl font-bold">Date Of Birth:</h1>
          <h3 class="text-xl text-gray-600">{{ student.DoB }}</h3>
        </div>
        <div class="w-full sm:w-1/3 text-center">
          <h1 class="text-2xl font-bold">Municipality:</h1>
          <span class="text-black-700">{{ student.Municipality }}</span>
        </div>
        <div class="w-full sm:w-1/3 text-center">
          <h1 class="text-2xl font-bold">Archive Date:</h1>
          <h3 class="text-xl text-gray-600">
            {{ student.ArchiveDate }}
          </h3>
        </div>
      </div>
    </base-card>
  </section>
</template>


<script>
export default {
  data() {
    return {
      student: null,
    };
  },
  created() {
    const studentId = this.$route.params.id;
    this.fetchStudentData(studentId);
  },
  methods: {
    fetchStudentData(studentId) {
      const storedStudents = JSON.parse(localStorage.getItem("students")) || [];

      let student = storedStudents.find((student) => student.id === studentId);

      if (!student) {
        student = storedStudents.find(
          (student) => student.id === studentId.toString()
        ); 
      }

      if (!student) {
        student = storedStudents.find((s) => s.id === studentId);
      }

      if (student) {
        this.student = student;
      } else {
        this.student = null;
      }
    },
  },
};
</script>

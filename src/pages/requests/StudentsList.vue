<template>
  <section>
    <div>
      <base-card class="w-full max-w-3xl mx-auto mt-4">
        <div class="flex justify-between mb-4">
          <div class="flex items-center">
            <input
              v-model="searchQuery"
              placeholder="Search students"
              class="px-2 py-1 border border-gray-300 rounded"
            />
            <button
              @click="clearSearch"
              class="ml-2 px-2 py-1 bg-gray-200 rounded"
            >
              Clear
            </button>
          </div>
          <div>
            <base-button
              mode="outline"
              class="px-4 py-2 bg-blue-500 text-white rounded"
              @click="refreshPage"
              >Refresh</base-button
            >
            <base-button class="px-4 py-2 bg-blue-500 text-white rounded">
              <button @click.stop="showRegisterConfirmation" class="mr-2">
                Register Student
              </button>
            </base-button>
          </div>
        </div>
        <ul v-if="hasStudents" class="list-none m-0 p-0">
          <student-item
            v-for="student in students"
            :key="student.id"
            :student="student"
            @update="updateStudent"
          ></student-item>
        </ul>
        <h3 v-else>No students found</h3>
      </base-card>
    </div>
    <div
      v-if="showRegisterConfirmationDialog"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      @click="cancelRegister"
    >
      <StudentRegistration
        v-if="showRegisterConfirmationDialog"
        @cancel="cancelRegister"
        @register="registerStudent"
        class="w-[40%]"
        @click.stop
      ></StudentRegistration>
    </div>
  </section>
</template>

<script>
import StudentItem from "@/components/students/StudentItem.vue";
import StudentRegistration from "./StudentRegistration.vue";

export default {
  components: {
    StudentItem,
    StudentRegistration,
  },
  data() {
    return {
      searchQuery: "",
      currentPage: 1,
      pageSize: 10,
      showRegisterConfirmationDialog: false,
      form: {
        name: "",
        dob: "",
        municipality: "",
        archiveDate: "",
      },
      lastAssignedId: 0,
    };
  },
  computed: {
    filteredStudents() {
      const query = this.searchQuery.toLowerCase();
      return this.$store.getters["students/students"].filter((student) => {
        const idMatch =
          student.id &&
          typeof student.id === "string" &&
          student.id.toLowerCase().includes(query);
        const nameMatch = student.Name?.toString()
          .toLowerCase()
          .includes(query);
        const dobMatch = student.DoB?.toString().toLowerCase().includes(query);
        const municipalityMatch = student.Municipality?.toString()
          .toLowerCase()
          .includes(query);
        const archiveDateMatch = student.ArchiveDate?.toString()
          .toLowerCase()
          .includes(query);
        return (
          idMatch ||
          nameMatch ||
          dobMatch ||
          municipalityMatch ||
          archiveDateMatch
        );
      });
    },

    students() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredStudents.slice(startIndex, endIndex);
    },
    hasStudents() {
      return this.filteredStudents.length > 0;
    },
    pageCount() {
      return Math.ceil(this.filteredStudents.length / this.pageSize);
    },
  },
  created() {
    this.loadStudents();
  },
  methods: {
    clearSearch() {
      this.searchQuery = "";
    },
    changePage(page) {
      this.currentPage = page;
    },
    refreshPage() {
      window.location.reload();
    },
    showRegisterConfirmation() {
      this.showRegisterConfirmationDialog = true;
    },
    cancelRegister() {
      this.showRegisterConfirmationDialog = false;
    },
    registerStudent() {
      const newStudent = {
        id: this.lastAssignedId + 1,
        Name: this.form.name,
        DoB: this.form.dob,
        Municipality: this.form.municipality,
        ArchiveDate: this.form.archiveDate,
      };

      this.lastAssignedId++;

      this.$store.commit("students/addStudent", newStudent);

      // console.log("Student registered:", newStudent);
      this.showRegisterConfirmationDialog = false;
    },

    editStudent(updatedStudent) {
      const index = this.students.findIndex(
        (student) => student.id === updatedStudent.id
      );
      if (index !== -1) {
        this.students.splice(index, 1, updatedStudent);
      }
    },
    updateStudent(updatedStudent) {
      const index = this.students.findIndex(
        (student) => student.id === updatedStudent.id
      );
      if (index !== -1) {
        this.students.splice(index, 1, updatedStudent);
      }

      this.$store.dispatch("students/updateStudent", updatedStudent);
    },
    loadStudents() {
      this.$store.dispatch("students/loadStudents");
    },
  },
};
</script>

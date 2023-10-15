<template>
  <li class="my-4 border border-gray-400 rounded-lg p-4">
    <h1 class="text-xl font-bold pb-1">
      Index: <span class="text-lg font-light">{{ student.id }}</span>
    </h1>
    <h1 class="text-xl font-bold pb-1">
      Name:
      <span v-if="!showEditConfirmationDialog" class="text-lg font-light">{{
        studentName
      }}</span>
      <input
        v-else
        v-model="form.Name"
        class="text-lg font-light border border-gray-300 rounded-lg p-2"
      />
    </h1>
    <h1 class="text-xl font-bold pb-1">
      Date of Birth:
      <span v-if="!showEditConfirmationDialog" class="text-lg font-light">{{
        studentDoB
      }}</span>
      <input
        v-else
        v-model="form.DoB"
        class="text-lg font-light border border-gray-300 rounded-lg p-2"
      />
    </h1>
    <h1 class="text-xl font-bold pb-1">
      Municipality:
      <span v-if="!showEditConfirmationDialog" class="text-lg font-light">{{
        studentMunicipality
      }}</span>
      <input
        v-else
        v-model="form.Municipality"
        class="text-lg font-light border border-gray-300 rounded-lg p-2"
      />
    </h1>
    
    <div class="flex justify-end">
      <button @click="showEditConfirmation" class="text-blue-500 mr-2">
        {{ showEditConfirmationDialog ? "Save" : "Edit" }}
      </button>
      <button @click="showDeleteConfirmation" class="text-blue-500 mr-2">
        Delete
      </button>
      <button @click="archiveStudent" class="text-blue-500 mr-2">
        Archive
      </button>
    </div>
    <DeleteConfirmation
      v-if="showDeleteConfirmationDialog"
      @cancel="cancelDelete"
      @delete="deleteStudent"
      :id="student.id"
    />
    <EditConfirmation
      v-if="showEditConfirmationDialog"
      @cancel="cancelEdit"
      @update="updateStudent"
      :id="student.id"
      :Name="form.Name"
      :DoB="form.DoB"
      :Municipality="form.Municipality"
      :ArchiveDate="form.ArchiveDate"
    />
  </li>
</template>

<script>
import DeleteConfirmation from "./DeleteConfirmation.vue";
import EditConfirmation from "./EditConfirmation.vue";

export default {
  components: {
    DeleteConfirmation,
    EditConfirmation,
  },
  props: {
    student: {
      type: Object,
      default: null, 
    },
  },
  data() {
    return {
      showDeleteConfirmationDialog: false,
      showEditConfirmationDialog: false,
      form: {
        Name: "",
        DoB: "",
        Municipality: "",
        ArchiveDate: "",
      },
      editedName: "",
      editedDoB: "",
      editedMunicipality: "",
      editedArchiveDate: "",
    };
  },

  computed: {
    studentName() {
      return this.student ? this.student.Name : "";
    },
    studentDoB() {
      return this.student ? this.student.DoB : "";
    },
    studentMunicipality() {
      return this.student ? this.student.Municipality : "";
    },
    studentArchiveDate() {
      return this.student ? this.student.ArchiveDate : "";
    },
  },
  methods: {
    showDeleteConfirmation() {
      this.showDeleteConfirmationDialog = true;
    },
    showEditConfirmation() {
      if (this.showEditConfirmationDialog) {
        this.showEditConfirmationDialog = false;
      } else {
        this.showEditConfirmationDialog = true;
        this.form.Name = this.studentName;
        this.form.DoB = this.studentDoB;
        this.form.Municipality = this.studentMunicipality;
        this.form.ArchiveDate = this.studentArchiveDate;
      }
    },
    cancelDelete() {
      this.showDeleteConfirmationDialog = false;
    },
    cancelEdit() {
      this.showEditConfirmationDialog = false;
    },
    deleteStudent() {
      this.$store.dispatch("students/deleteStudent", this.student.id);
    },
    updateStudent(updatedData) {
      this.$store
        .dispatch("students/updateStudent", {
          id: this.student.id,
          ...updatedData,
        })
        .then(() => {
          console.log("Student updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating student:", error);
        });
    },
     archiveStudent() {
      this.$store.dispatch("students/archiveStudent", this.student.id);
    },
  },
};
</script>

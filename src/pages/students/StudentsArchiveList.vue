<template>
  <section>
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
          >
            Refresh
          </base-button>
        </div>
      </div>
      <ul v-if="hasArchivedStudents" class="list-none m-0 p-0">
       
        <student-archive-item
          v-for="archivedStudent in paginatedArchivedStudents"
          :key="archivedStudent.id"
          :student="archivedStudent"
          @restore="restoreStudent"
        ></student-archive-item>
      </ul>
      <h3 v-else>No archived students found</h3>
      <div v-if="hasArchivedStudents">
        <nav class="mt-4 flex justify-center">
          <ul class="flex items-center space-x-2">
            <li v-for="page in pageCount" :key="page">
              <button
                @click="changePage(page)"
                :class="{
                  'px-2 py-1 rounded bg-blue-500 text-white':
                    page === currentPage,
                  'px-2 py-1 rounded bg-gray-200': page !== currentPage,
                }"
              >
                {{ page }}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </base-card>
  </section>
</template>

<script>
import StudentArchiveItem from "@/components/students/StudentArchiveItem.vue";

export default {
  components: {
    StudentArchiveItem,
  },
  data() {
    return {
      searchQuery: "",
      currentPage: 1,
      pageSize: 10,
    };
  },

  computed: {
    archivedStudents() {
      return this.$store.getters["students/getArchivedStudents"] || [];
    },
    filteredArchivedStudents() {
      const query = this.searchQuery.toLowerCase();
      return this.archivedStudents.filter((archivedStudent) => {
        const archiveDateMatch = archivedStudent.archiveDate
          ?.toString()
          .toLowerCase()
          .includes(query);
        return archiveDateMatch;
      });
    },
    paginatedArchivedStudents() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredArchivedStudents.slice(startIndex, endIndex);
    },
    hasArchivedStudents() {
      return this.filteredArchivedStudents.length > 0;
    },
    pageCount() {
      return Math.ceil(this.filteredArchivedStudents.length / this.pageSize);
    },
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
    restoreStudent(studentId, originalValues) {
      this.$store.dispatch("students/restoreStudent", {
        studentId,
        originalValues,
      });
    },
  },
  mounted() {
    this.$store.dispatch("students/loadStudents");
  },
};
</script>

export default {
  registerStudent(state, payload) {
    state.students.push(payload);
    localStorage.setItem("students", JSON.stringify(state.students));
  },
  setStudents(state, students) {
    state.students = students;
  },
  deleteStudent(state, studentId) {
    state.students = state.students.filter(
      (student) => student.id !== studentId
    );
  },

  archiveStudent(state, studentId) {
    const index = state.students.findIndex(
      (student) => student.id === studentId
    );
    if (index !== -1) {
      const archivedStudent = state.students.splice(index, 1)[0];
      state.archivedStudents.push({
        ...archivedStudent,
        archiveDate: new Date().toISOString(),
      });
    }
  },

  restoreStudent(
    { students, archivedStudents },
    { studentId, originalValues }
  ) {
    const index = archivedStudents.findIndex(
      (student) => student.id === studentId
    );
    if (index !== -1) {
      const restoredStudent = archivedStudents.splice(index, 1)[0];
      students.push({
        ...restoredStudent,
        ...originalValues,
      });
    }
  },
  setArchivedStudents(state, archivedStudents) {
    state.archivedStudents = archivedStudents;
  },
};

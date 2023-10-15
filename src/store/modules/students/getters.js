export default {
  students(state) {
    return state.students;
  },
  hasStudents(state) {
    return state.students && state.students > 0;
  },
  isStudent(_, getters, _2, rootGetters) {
    const students = getters.students;
    const studentId = rootGetters.studentId;
    return students.some((student) => student.id == studentId);
  },
  originalStudent: (state) => (studentId) => {
    const originalStudent = state.originalStudents.find(
      (student) => student.id === studentId
    );
    return originalStudent || {};
  },
  getArchivedStudents(state) {
    return state.archivedStudents;
  },
};

import { v4 as uuidv4 } from "uuid";

export default {
  registerStudent(context, data) {
    const studentData = {
      Name: data.Name,
      DoB: data.DoB,
      Municipality: data.Municipality,
      ArchiveDate: data.ArchiveDate || null,
    };

    try {
      const storedStudents = JSON.parse(localStorage.getItem("students")) || [];

      const newStudent = {
        ...studentData,
        id: uuidv4(),
      };

      storedStudents.push(newStudent);
      localStorage.setItem("students", JSON.stringify(storedStudents));

      context.commit("registerStudent", newStudent);
    } catch (error) {
      console.error(error);
    }
  },

  loadStudents(context) {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const storedArchivedStudents =
      JSON.parse(localStorage.getItem("archivedStudents")) || [];

    context.commit("setStudents", storedStudents);
    context.commit("setArchivedStudents", storedArchivedStudents);
  },

  deleteStudent(context, studentId) {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const updatedStudents = storedStudents.filter(
      (student) => student.id !== studentId
    );
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    context.commit("deleteStudent", studentId);
  },

  updateStudent(context, updatedStudent) {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const index = storedStudents.findIndex(
      (student) => student.id === updatedStudent.id
    );

    if (index !== -1) {
      storedStudents[index] = updatedStudent;
      localStorage.setItem("students", JSON.stringify(storedStudents));

      context.commit("setStudents", storedStudents);

      return Promise.resolve();
    } else {
      return Promise.reject("Student not found");
    }
  },
  archiveStudent(context, studentId) {
    console.log("Archiving student:", studentId);
    try {
      const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
      const storedArchivedStudents =
        JSON.parse(localStorage.getItem("archivedStudents")) || [];

      const studentToArchive = storedStudents.find(
        (student) => student.id === studentId
      );

      if (studentToArchive) {
        const updatedStudents = storedStudents.filter(
          (student) => student.id !== studentId
        );
        storedArchivedStudents.push({
          ...studentToArchive,
          archiveDate: new Date().toISOString(),
        });

        localStorage.setItem("students", JSON.stringify(updatedStudents));
        localStorage.setItem(
          "archivedStudents",
          JSON.stringify(storedArchivedStudents)
        );

        context.commit("archiveStudent", studentId);
        context.commit("setArchivedStudents", storedArchivedStudents);
      }
    } catch (error) {
      console.error(error);
    }
  },
  restoreStudent(context, { studentId, originalValues }) {
    try {
      const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
      const storedArchivedStudents =
        JSON.parse(localStorage.getItem("archivedStudents")) || [];

      const studentToRestore = storedArchivedStudents.find(
        (student) => student.id === studentId
      );

      if (studentToRestore) {
        const updatedArchivedStudents = storedArchivedStudents.filter(
          (student) => student.id !== studentId
        );
        storedStudents.push({
          ...studentToRestore,
          ...originalValues,
        });

        localStorage.setItem("students", JSON.stringify(storedStudents));
        localStorage.setItem(
          "archivedStudents",
          JSON.stringify(updatedArchivedStudents)
        );

        context.commit("restoreStudent", { studentId, originalValues });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
